"use client";


import { useState } from "react";
import FieldTable from "@/app/components/FieldTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../components/ui/button";
import { generateData } from "@/utils/generateData";
import { Field } from "@/types";
export default function Home() {
    const [rowCount, setRowCount] = useState<number>(100); // default 100 rows
    const [fields, setFields] = useState<Field[]>([]);

    const handleFieldsUpdate = (updatedFields: Field[]) => {
        setFields(updatedFields);
    };
    const handleGenerate = () => {
        if (!fields.length) return alert("Add some fields first!");

        const result = generateData(fields, rowCount);

        // Автоскачивание JSON
        const json = JSON.stringify(result, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "mockaroo_data.json";
        a.click();

        URL.revokeObjectURL(url);
    };
    return (
        <main className="flex min-h-screen flex-col items-center bg-gray-950 p-4 text-white">
            <h1 className="mb-5 text-center text-3xl font-bold text-yellow-500">Mock your data</h1>
            {/* Заголовки колонок */}
            <div className="flex w-200 px-4 py-2 font-semibold text-yellow-500">
                <div className="ml-45">Name</div>
                <div className=" ml-40">Type</div>
                <div className=" ml-28">Blank %</div>
            </div>
            <FieldTable onFieldsChange={handleFieldsUpdate} />

            {/* Поле для количества строк */}
            <div className=" mt-5 w-full max-w-md bg-gray-950">
                <Label htmlFor="rowCount" className=" justify-center font-bold text-yellow-500">
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

                {/* Кнопка Generate */}
                <Button
                    onClick={handleGenerate}
                    className="mt-4 w-full bg-orange-500 text-black hover:bg-yellow-600"
                >
                    Generate!
                </Button>
            </div>
        </main>
    );
}
