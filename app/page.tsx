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
import toast from "react-hot-toast";
import { Separator } from "@/components/ui/separator";

export default function Home() {
    const { isSignedIn } = useUser();

    // AI state
    const [prompt, setPrompt] = useState("");
    const [aiLoading, setAiLoading] = useState(false);

    // your states
    const [rowCount, setRowCount] = useState<number>(100);
    type GeneratedRow = Record<string, unknown>;
    const [data, setData] = useState<GeneratedRow[]>([]);
    const [copySuccess, setCopySuccess] = useState(false);
    const [isNaming, setIsNaming] = useState(false);
    const [tempName, setTempName] = useState("");

    // Zustand
    const fields = useSchemaStore((s) => s.fields);
    const setFields = useSchemaStore((s) => s.setFields);
    const setSchemaName = useSchemaStore((s) => s.setSchemaName);

    // === AI GENERATION ===
    const generateWithAI = async () => {
        if (!prompt.trim()) return toast.error("Введите описание схемы");

        setAiLoading(true);
        try {
            const res = await fetch("/api/ai-generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: prompt.trim() }),
            });
            const json = await res.json();

            if (!res.ok) {
                console.log("AI error:", json);
                return toast.error(json.error || "AI generation failed");
            }

            setFields(json.fields);
            toast.success("Схема успешно создана ИИ!");
        } catch (err) {
            console.error(err);
            toast.error("Ошибка при запросе к ИИ");
        } finally {
            setAiLoading(false);
        }
    };

    // === NORMAL GENERATE ===
    const safeGenerate = () => {
        try {
            if (!fields || !Array.isArray(fields)) {
                console.error("fields is not an array", fields);
                return alert("Fields are not ready. Check console.");
            }
            if (!fields.length) return alert("Add some fields first!");

            const result = generateData(fields, rowCount);
            setData(result);
        } catch (err) {
            console.error("Error in generate:", err);
            alert("Generation failed — check console.");
        }
    };

    // === SAVE SCHEMA ===
    const askSchemaName = () => {
        if (!isSignedIn) return alert("Sign in to save schemas!");
        if (!fields.length) return alert("Schema must have fields!");
        setIsNaming(true);
    };

    const generateFieldWithAI = async (fieldId?: string) => {
        const prompt = window.prompt("Describe the field to generate:"); // простое модальное
        if (!prompt) return;

        try {
            const res = await fetch("/api/ai-generate-field", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });
            const json = await res.json();

            if (!res.ok) {
                toast.error(json.error || "AI generation failed");
                return;
            }

            setFields([...fields, json]); // добавляем новый Field в Zustand
            toast.success(`Field "${json.name}" added!`);
        } catch (err) {
            console.error(err);
            toast.error("AI request failed");
        }
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

    // === DOWNLOADS ===
    const downloadJSON = () => {
        if (!data.length) return alert("Nothing to download");

        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: "application/json",
        });

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
            csvRows.push(
                Object.values(row)
                    .map((v) => `"${String(v).replace(/"/g, '""')}"`)
                    .join(",")
            );
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

    // === UI ===
    return (
        <main className="flex min-h-screen flex-col items-center bg-gray-950 p-4 text-white">
            <h1 className="mb-5 text-center text-3xl font-bold text-yellow-500">
                Mock your data
            </h1>

            {/* AI FIELD GENERATOR */}
            <span className="text-2xl font-bold text-yellow-400">
                Generate your schema with AI!
            </span>
            <div className="mb-4 w-full max-w-xl">
                <Input
                    placeholder="Опишите схему: 'магазин, товары, цена, категория...'"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="bg-white text-black font-bold"
                />
                <Button
                    onClick={generateWithAI}
                    disabled={aiLoading}
                    className="w-max-40 mt-2 w-full bg-yellow-400 font-bold text-white hover:bg-orange-400"
                >
                    {aiLoading ? "AI is thinking..." : "Generate Schema with AI"}
                </Button>
            </div>

            <Separator className="border border-yellow-500" />

            <span className="mt-10 text-2xl font-bold text-yellow-400">
                Or use manual generation.
            </span>

            {/* FIELD TABLE */}
            <div className="mt-10 flex w-full max-w-3xl flex-col gap-2">
                <FieldTable />
            </div>

            {/* SAVE SCHEMA */}
            {!isNaming ? (
                <Button
                    onClick={askSchemaName}
                    className="mt-4 w-full max-w-md bg-yellow-500 text-black hover:bg-orange-500"
                >
                    Save Current Schema
                </Button>
            ) : (
                <div className="mt-4 w-full max-w-md rounded-lg border border-yellow-500 bg-gray-800 p-4">
                    <Label className="font-bold text-yellow-400">Enter Schema Name</Label>
                    <Input
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="mt-2 bg-white text-black"
                    />
                    <div className="mt-3 flex gap-2">
                        <Button className="flex-1 bg-green-500" onClick={saveSchema}>
                            Save
                        </Button>
                        <Button
                            className="flex-1 bg-red-500"
                            onClick={() => {
                                setIsNaming(false);
                                setTempName("");
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}

            {/* NORMAL GENERATION */}
            <div className="mt-5 w-full max-w-md">
                <Label className="font-bold text-yellow-500">Number of rows</Label>
                <Input
                    type="number"
                    min={1}
                    value={rowCount}
                    onChange={(e) => setRowCount(Number(e.target.value))}
                    className="mt-2 w-full bg-white text-black font-bold border border-yellow-500 rounded-md"
                />
            </div>

            {/* ORIGINAL GENERATE BUTTON */}
            <Button
                onClick={safeGenerate}
                className="mt-4 w-full max-w-md bg-orange-500 text-black hover:bg-yellow-600"
            >
                Generate
            </Button>

            {/* DOWNLOADS */}
            {data.length > 0 && (
                <div className="mt-4 flex w-full max-w-md flex-col gap-2">
                    <Button className="bg-blue-600 hover:bg-blue-700" onClick={downloadJSON}>
                        Download JSON
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-700" onClick={downloadCSV}>
                        Download CSV
                    </Button>
                </div>
            )}

            {/* GENERATED DATA PREVIEW */}
            {data.length > 0 && (
                <div className="relative mt-4 max-h-[500px] w-full max-w-3xl overflow-auto rounded-lg bg-gray-100 p-4 text-sm text-gray-800 shadow-lg">
                    <button
                        onClick={copyToClipboard}
                        className="absolute top-2 right-2 rounded-md p-1 text-gray-600"
                        title="Copy to clipboard"
                    >
                        <Copy size={18} />
                    </button>
                    <pre className="mt-6 whitespace-pre-wrap">
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </div>
            )}

            {copySuccess && (
                <div className="animate-fade-in-out fixed top-4 left-1/2 -translate-x-1/2 rounded-md bg-green-500 px-4 py-2 text-white shadow-lg">
                    Copied to clipboard!
                </div>
            )}
        </main>
    );
}
