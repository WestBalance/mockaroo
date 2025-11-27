"use client";

import { FC, useEffect } from "react";
import FieldRow from "./FieldRow";

import { useSchemaStore } from "@/store/schemaStore";
import { v4 as uuid } from "uuid";
import { Field, FieldType } from "@/types/";


const FieldTable: FC = () => {
    const fields = useSchemaStore((s) => s.fields);
    const addField = useSchemaStore((s) => s.addField);
    const updateField = useSchemaStore((s) => s.updateField);
    const deleteField = useSchemaStore((s) => s.deleteField);

    // --- Добавляем две базовые строки при первом рендере ---
    useEffect(() => {
        if (fields.length === 0) {
            const defaultFields: Field[] = [
                {
                    id: uuid(),
                    name: "First Name",
                    type: "First Name",
                    blankPercent: 0,
                    sum: false,
                },
                {
                    id: uuid(),
                    name: "Last Name",
                    type: "Last Name",
                    blankPercent: 0,
                    sum: false,
                },
            ];
            defaultFields.forEach(f => addField(f));
        }
    }, []); // пустой массив зависимостей, чтобы выполнить только один раз

    const handleUpdate = (updated: Field) => {
        updateField(updated.id, {
            name: updated.name,
            type: updated.type,
            blankPercent: updated.blankPercent,
            sum: updated.sum,
        });
    };

    const handleDelete = (id: string) => deleteField(id);

    const handleAdd = () => {
        const defaultType: FieldType = "First Name";
        addField({
            id: uuid(),
            name: defaultType,
            type: defaultType,
            blankPercent: 0,
            sum: false,
        });
    };

    return (
        <div className="flex flex-col gap-3">
            {/* header */}
            <div className="ml-20    mb-2 flex gap-4 font-bold 
                            text-cyan-300 tracking-wide select-none">
                <span className="w-40">Field Name</span>
                <span className="w-33">Field Type</span>
                <span className="w-20">Blank %</span>
            </div>

            {/* Rows */}
            {fields.map((field) => (
                <FieldRow
                    key={field.id}
                    field={field as Field}      
                    onUpdate={(f) => handleUpdate(f as Field)}
                    onDelete={handleDelete}
                />

            ))}

            {/* Add button */}
            <button
                onClick={handleAdd}
                className="mt-3 ml-10 w-[540px] py-2 rounded-xl bg-cyan-600 text-white
                           font-bold tracking-wide
                           hover:bg-cyan-500 hover:shadow-[0_0_12px_cyan]
                           transition"
            >
                + Add Another Field
            </button>
        </div>
    );
};

export default FieldTable;
