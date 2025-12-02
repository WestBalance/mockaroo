/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { generateData } from "@/utils/generateData";
import { Field } from "@/types/Fields";
import { Button } from "@/components/ui/button";
import { Download, Play } from "lucide-react";

export default function GenerateSection({ fields }: { fields: Field[] }) {
    const [rows, setRows] = useState<number>(10);
    const [data, setData] = useState<any[]>([]);

    const handleGenerate = () => {
        const result = generateData(fields, rows);
        setData(result);

        // Автоскачивание
        if (result.length > 0) {
            const json = JSON.stringify(result, null, 2);
            const blob = new Blob([json], { type: "application/json" });
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "mockaroo_data.json";
            a.click();

            URL.revokeObjectURL(url);
        }
    };


    const handleDownload = () => {
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

    return (
        <div className="space-y-6">
            {/* Количество строк + Кнопка генерации */}
            <div className="flex items-center gap-4">
                <label className="font-medium text-gray-200">Rows:</label>
                <input
                    type="number"
                    min={1}
                    max={10000}
                    value={rows}
                    onChange={(e) => setRows(Number(e.target.value))}
                    className="w-24 rounded-md border border-gray-700 bg-gray-900 px-2 py-1 text-gray-100"
                />
                <Button onClick={handleGenerate} className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
                    <Play size={16} /> Generate
                </Button>

                {data.length > 0 && (
                    <Button
                        onClick={handleDownload}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                    >
                        <Download size={16} /> Download JSON
                    </Button>
                )}
            </div>

            {/* Просмотр результата */}
            {data.length > 0 && (
                <div className="max-h-[500px] overflow-auto rounded-lg bg-gray-950 p-4 text-sm text-green-400 shadow-inner">
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
