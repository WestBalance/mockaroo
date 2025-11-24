"use client";

import { useState } from "react";
import FieldTable from "@/app/components/FieldTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../components/ui/button";
import { generateData } from "@/utils/generateData";
import { Copy } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useSchemaStore } from "@/store/schemaStore";
import toast from 'react-hot-toast';
export default function Home() {
    const { isSignedIn } = useUser();

    const [rowCount, setRowCount] = useState<number>(100);
    type GeneratedRow = Record<string, unknown>;

    const [data, setData] = useState<GeneratedRow[]>([]);

    const [copySuccess, setCopySuccess] = useState(false);
    const [isNaming, setIsNaming] = useState(false);
    const [tempName, setTempName] = useState("");

    // Zustand store
    const schemaName = useSchemaStore((s) => s.schemaName);
    const fields = useSchemaStore((s) => s.fields);
    const setSchemaName = useSchemaStore((s) => s.setSchemaName);
    const setFields = useSchemaStore((s) => s.setFields);

    // --- Helpers ---
    const safeGenerate = () => {
        try {
            if (!fields || !Array.isArray(fields)) {
                console.error("fields is not an array", fields);
                return alert("Fields are not ready. Check console.");
            }
            if (!fields.length) return alert("Add some fields first!");
            // call generator
            const result = generateData(fields, rowCount);
            setData(result);
            console.log("Generated rows:", result.length);
        } catch (err) {
            console.error("Error in generate:", err);
            alert("Generation failed — check console.");
        }
    };

    const handleGenerateAPI = async () => {
        try {
            if (!fields || !fields.length) return alert("Add some fields first!");
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fields, rowCount }),
            });
            const json = await res.json();
            if (!res.ok) {
                console.error("API generate error", json);
                return alert(json.error || "API error");
            }
            setData(json.data || []);
        } catch (err) {
            console.error("Network/API error:", err);
            alert("API error — check console.");
        }
    };

    // Save schema flow (naming inline)
    const askSchemaName = () => {
        if (!isSignedIn) return alert("Sign in to save schemas!");
        if (!fields.length) return alert("Schema must have fields!");
        setIsNaming(true);
    };

    const saveSchema = async () => {
        if (!tempName.trim()) return toast.error("Enter schema name!");

        try {
            const res = await fetch("/api/schemas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: tempName.trim(), fields }),
            });
            const json = await res.json();

            if (!res.ok) return toast.error(json.error || "Save failed");

            setSchemaName(tempName.trim());
            setTempName("");
            setIsNaming(false);
            toast.success(`Schema "${json.name}" saved!`);
        } catch (err) {
            console.error(err);
            toast.error("Save failed — check console.");
        }
    };

    // downloads / copy
    const downloadJSON = () => {
        if (!data.length) return alert("Nothing to download");
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "mockaroo_data.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    const downloadCSV = () => {
        if (!data.length) return alert("Nothing to download");
        const csvRows = [Object.keys(data[0]).join(",")];
        for (const row of data) {
            csvRows.push(Object.values(row).map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","));
        }
        const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "mockaroo_data.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    const copyToClipboard = async () => {
        if (!data.length) return alert("Nothing to copy");
        await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    // render
    return (
        <main className="flex min-h-screen flex-col items-center bg-gray-950 p-4 text-white">
            <h1 className="mb-5 text-center text-3xl font-bold text-yellow-500">Mock your data</h1>

            <div className="flex w-full max-w-3xl flex-col gap-2">
                <FieldTable />
            </div>

            {!isNaming ? (
                <Button onClick={askSchemaName} className="mt-4 w-full max-w-md bg-yellow-500 text-black hover:bg-orange-500" type="button">
                    Save Current Schema
                </Button>
            ) : (
                <div className="mt-4 w-full max-w-md rounded-lg border border-yellow-500 bg-gray-800 p-4">
                    <Label className="font-bold text-yellow-400">Enter Schema Name</Label>
                    <Input value={tempName} onChange={(e) => setTempName(e.target.value)} className="mt-2 bg-white text-black" />
                    <div className="mt-3 flex gap-2">
                        <Button onClick={saveSchema} className="flex-1 bg-green-500" type="button">Save</Button>
                        <Button onClick={() => { setIsNaming(false); setTempName(""); }} className="flex-1 bg-red-500" type="button">Cancel</Button>
                    </div>
                </div>
            )}

            <div className="mt-5 w-full max-w-md bg-gray-950">
                <Label htmlFor="rowCount" className="font-bold text-yellow-500">Number of rows</Label>
                <Input id="rowCount" type="number" min={1} value={rowCount} onChange={(e) => setRowCount(Number(e.target.value))} className="mt-2 w-full bg-white text-black font-bold border border-yellow-500 rounded-md" />
            </div>

            <div className="mt-4 flex w-full max-w-md flex-col gap-2">
                <Button onClick={safeGenerate} className="w-full bg-orange-400 text-black hover:bg-yellow-700" type="button">Generate Locally</Button>
                <Button onClick={handleGenerateAPI} className="w-full bg-green-600 text-white hover:bg-green-700" type="button">Generate via API</Button>

                {data.length > 0 && (
                    <>
                        <Button onClick={downloadJSON} className="mt-5 w-full bg-blue-600 hover:bg-blue-700" type="button">Download JSON</Button>
                        <Button onClick={downloadCSV} className="w-full bg-purple-600 hover:bg-purple-700" type="button">Download CSV</Button>
                    </>
                )}
            </div>

            {data.length > 0 && (
                <div className="relative mt-4 max-h-[500px] w-full max-w-3xl overflow-auto rounded-lg bg-gray-100 p-4 text-sm text-gray-800 shadow-lg">
                    <button onClick={copyToClipboard} className="absolute top-2 right-2 rounded-md p-1 text-gray-600" title="Copy to clipboard" type="button">
                        <Copy size={18} />
                    </button>
                    <pre className="mt-6 whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}

            {copySuccess && <div className="animate-fade-in-out fixed top-4 left-1/2 -translate-x-1/2 rounded-md bg-green-500 px-4 py-2 text-white shadow-lg">Copied to clipboard!</div>}
        </main>
    );
}