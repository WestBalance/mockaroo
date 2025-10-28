"use client";
import { FC, useState } from "react";
import FieldRow from "./FieldRow";
import { Field } from "@/types";
import { v4 as uuid } from "uuid";

const FieldTable: FC = () => {
    const [fields, setFields] = useState<Field[]>([
        { id: uuid(), name: "id", type: "Row Number", blankPercent: 0, sum: false },
    ]);

    const addField = () => setFields([...fields, { id: uuid(), name: "", type: "First Name", blankPercent: 0, sum: false }]);
    const updateField = (updated: Field) => setFields(fields.map(f => f.id === updated.id ? updated : f));
    const deleteField = (id: string) => setFields(fields.filter(f => f.id !== id));

    return (
        <div className="flex flex-col gap-2">
            {fields.map(field => (
                <FieldRow key={field.id} field={field} onUpdate={updateField} onDelete={deleteField} />
            ))}
            <button onClick={addField} className="mt-2 rounded bg-white p-2 text-black">+ Add Another Field</button>
        </div>
    );
};

export default FieldTable;
