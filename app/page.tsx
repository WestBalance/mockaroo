"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import FieldTable from "@/app/components/FieldTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../components/ui/button";
import { generateData } from "@/utils/generateData";
import { Field } from "@/types";
import { Copy } from "lucide-react";

export default function Home() {
    const [rowCount, setRowCount] = useState<number>(100);
    const [fields, setFields] = useState<Field[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [copySuccess, setCopySuccess] = useState(false);

    const handleFieldsUpdate = (updatedFields: Field[]) => setFields(updatedFields);

    // Локальная генерация данных
    const handleGenerate = () => {
        if (!fields.length) return alert("Add some fields first!");
        const result = generateData(fields, rowCount);
        setData(result);
    };

    // Генерация данных через API
    const handleGenerateAPI = async () => {
        if (!fields.length) return alert("Add some fields first!");
        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fields, rowCount }),
            });
            const result = await response.json();
            if (response.ok) {
                setData(result.data);
            } else {
                alert(result.error || "Error fetching data from API");
            }
        } catch (error) {
            alert("Error connecting to API");
            console.error(error);
        }
    };

    // JSON download
    const downloadJSON = () => {
        if (!data.length) return;
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "mockaroo_data.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    // CSV download
    const downloadCSV = () => {
        if (!data.length) return;
        const csvRows: string[] = [];
        csvRows.push(Object.keys(data[0]).join(","));
        for (const row of data) {
            csvRows.push(Object.values(row).map((v) => `"${v}"`).join(","));
        }
        const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "mockaroo_data.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    // Copy to clipboard
    const copyToClipboard = async () => {
        if (!data.length) return;
        await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    return (
        <main className="flex min-h-screen flex-col items-center bg-gray-950 p-4 text-white">
            <h1 className="mb-5 text-center text-3xl font-bold text-yellow-500">Mock your data</h1>

            {/* Таблица полей */}
            <div className="flex w-full max-w-3xl flex-col gap-2">
                <FieldTable onFieldsChange={handleFieldsUpdate} />
            </div>

            {/* Количество строк */}
            <div className="mt-5 w-full max-w-md bg-gray-950">
                <Label htmlFor="rowCount" className="justify-center text-xl font-bold text-yellow-500">
                    Number of rows
                </Label>
                <Input
                    id="rowCount"
                    type="number"
                    min={1}
                    value={rowCount}
                    onChange={(e) => setRowCount(Number(e.target.value))}
                    className="mt-2 w-full bg-white text-black font-bold border border-yellow-500 rounded-md placeholder-gray-400 focus:border-yellow-600"
                />
            </div>

            {/* Кнопки */}
            <div className="mt-4 flex w-full max-w-md flex-col gap-2">
                <Button
                    onClick={handleGenerate}
                    className="w-full bg-orange-400 font-bold text-black hover:bg-yellow-700"
                >
                    Generate Locally
                </Button>
                <Button
                    onClick={handleGenerateAPI}
                    className="w-full bg-green-600 font-bold text-white hover:bg-green-700"
                >
                    Generate via API
                </Button>
                {data.length > 0 && (
                    <>
                        <Button onClick={downloadJSON} className="mt-5 w-full bg-blue-600 hover:bg-blue-700">
                            Download JSON
                        </Button>
                        <Button onClick={downloadCSV} className="w-full bg-purple-600 hover:bg-purple-700">
                            Download CSV
                        </Button>
                    </>
                )}
            </div>

            {/* Просмотр данных с иконкой копирования */}
            {data.length > 0 && (
                <div className="relative mt-4 max-h-[500px] w-full max-w-3xl overflow-auto rounded-lg bg-gray-100 p-4 text-sm text-gray-800 shadow-lg">
                    <button
                        onClick={copyToClipboard}
                        className="absolute top-2 right-2 rounded-md p-1 text-gray-600 transition hover:bg-gray-200 hover:text-black"
                        title="Copy to clipboard"
                    >
                        <Copy size={18} />
                    </button>
                    <pre className="mt-6 whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}

            {/* Уведомление об успешном копировании */}
            {copySuccess && (
                <div className="animate-fade-in-out fixed top-4 left-1/2 z-50 -translate-x-1/2 transform rounded-md bg-green-500 px-4 py-2 text-white shadow-lg">
                    Copied to clipboard!
                </div>
            )}
        </main>
    );
}
