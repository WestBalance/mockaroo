/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import FieldRow from ".//components/FieldRow";
import { FieldType, generateValue } from './lib/dataGenerators';
import { nanoid } from 'nanoid';

type Field = {
    id: string;
    name: string;
    type: FieldType;
};

export default function Page() {
    const [fields, setFields] = useState<Field[]>([
        { id: nanoid(), name: 'id', type: 'Integer' },
        { id: nanoid(), name: 'name', type: 'Name' },
    ]);
    const [rows, setRows] = useState(10);
    const [data, setData] = useState<any[]>([]);

    const addField = () => setFields([...fields, { id: nanoid(), name: `field_${fields.length + 1}`, type: 'Sentence' }]);
    const updateField = (id: string, name: string, type: FieldType) =>
        setFields(fields.map(f => f.id === id ? { ...f, name, type } : f));
    const deleteField = (id: string) => setFields(fields.filter(f => f.id !== id));

    const generateData = () => {
        const result = [];
        for (let i = 0; i < rows; i++) {
            const row: Record<string, any> = {};
            fields.forEach(f => { row[f.name] = generateValue(f.type); });
            result.push(row);
        }
        setData(result);
    };

    const downloadJSON = () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'data.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2 rounded bg-white p-4 shadow">
                <h2 className="text-lg font-semibold">Schema Builder</h2>
                {fields.map(f => (
                    <FieldRow
                        key={f.id}
                        id={f.id}
                        name={f.name}
                        type={f.type}
                        onChange={updateField}
                        onDelete={deleteField}
                    />
                ))}
                <div className="mt-2 flex items-center gap-2">
                    <button onClick={addField} className="rounded bg-blue-600 px-3 py-1 text-white">Add Field</button>
                    <label className="flex items-center gap-2">
                        Rows:
                        <input
                            type="number"
                            value={rows}
                            onChange={(e) => setRows(Number(e.target.value))}
                            className="w-20 border rounded px-2 py-1"
                        />
                    </label>
                </div>
            </div>

            <div className="space-y-2 rounded bg-white p-4 shadow">
                <h2 className="text-lg font-semibold">Generated Data</h2>
                <div className="mb-2 flex gap-2">
                    <button onClick={generateData} className="rounded bg-green-600 px-3 py-1 text-white">Generate</button>
                    <button onClick={downloadJSON} disabled={data.length === 0} className="rounded bg-indigo-600 px-3 py-1 text-white">Download JSON</button>
                </div>
                {data.length > 0 ? (
                    <div className="max-h-64 overflow-auto rounded border p-2 text-xs">
                        <pre>{JSON.stringify(data.slice(0, 50), null, 2)}</pre>
                    </div>
                ) : <p className="text-sm text-slate-500">No data generated yet</p>}
            </div>
        </div>
    );
}
