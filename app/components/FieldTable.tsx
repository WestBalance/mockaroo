"use client";

import { FC } from "react";
import FieldRow from "./FieldRow";
import { Field } from "@/types/Fields";
import { useSchemaStore } from "@/store/schemaStore";
import { v4 as uuid } from "uuid";
import { FieldType } from "@/types/FieldTypes";

const FieldTable: FC = () => {
    // всё берем из Zustand
    const fields = useSchemaStore((s) => s.fields);
    const addField = useSchemaStore((s) => s.addField);
    const updateField = useSchemaStore((s) => s.updateField);
    const deleteField = useSchemaStore((s) => s.deleteField);

    // обновление одного поля
    const handleUpdate = (updated: Field) => {
        updateField(updated.id, {
            name: updated.name,
            type: updated.type,
            blankPercent: updated.blankPercent,
            sum: updated.sum,
        });
    };

    // удаление
    const handleDelete = (id: string) => {
        deleteField(id);
    };

    // добавление нового поля
    const handleAdd = () => {
        const defaultType: FieldType = "First Name";

        const newField: Field = {
            id: uuid(),
            name: defaultType,
            type: defaultType,
            blankPercent: 0,
            sum: false,
        };

        addField(newField);
    };

    return (
        <div className="flex w-auto flex-col gap-2">
            <div className="mb-2 ml-55 flex gap-2 font-bold text-yellow-500">
                <span className="w-40">Field Name</span>
                <span className="w-32">Field Type</span>
                <span className="w-20">Blank %</span>
                <span className="w-12">SUMM</span>
            </div>

            {fields.map((field) => (
                <FieldRow
                    key={field.id}
                    field={field}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />
            ))}

            <button
                onClick={handleAdd}
                className="mt-2 ml-30 w-full max-w-[530px] justify-center truncate rounded bg-yellow-500 p-2 px-3 text-black hover:bg-orange-400"
            >
                + Add Another Field
            </button>
        </div>
    );
};

export default FieldTable;
