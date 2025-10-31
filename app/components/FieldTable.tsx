
import { FC, useState } from "react";
import FieldRow from "./FieldRow";
import { Field } from "@/types";
import { v4 as uuid } from "uuid";

interface FieldTableProps {
    onFieldsChange?: (fields: Field[]) => void;
}

const FieldTable: FC<FieldTableProps> = ({ onFieldsChange }) => {
    const [fields, setFields] = useState<Field[]>([
        { id: uuid(), name: "id", type: "Row Number", blankPercent: 0, sum: false },
        { id: uuid(), name: "Name", type: "First Name", blankPercent: 0, sum: false },
        { id: uuid(), name: "Gender", type: "Gender", blankPercent: 0, sum: false },
        { id: uuid(), name: "E-mail", type: "Email Address", blankPercent: 0, sum: false },
    ]);

    const updateField = (updated: Field) => {
        const newFields = fields.map((f) => (f.id === updated.id ? updated : f));
        setFields(newFields);
        onFieldsChange?.(newFields);
    };

    const deleteField = (id: string) => {
        const newFields = fields.filter((f) => f.id !== id);
        setFields(newFields);
        onFieldsChange?.(newFields);
    };

    const addField = () => {
        const defaultType = "First Name";
        const newField: Field = {
            id: uuid(),
            name: defaultType, 
            type: defaultType,
            blankPercent: 0,
            sum: false,
        };
        const newFields = [...fields, newField];
        setFields(newFields);
        onFieldsChange?.(newFields);
    };


    return (
        <div className="flex flex-col gap-2">
            {fields.map((field) => (
                <FieldRow key={field.id} field={field} onUpdate={updateField} onDelete={deleteField} />
            ))}
            <button onClick={addField} className="mt-2 rounded bg-yellow-500 p-2 text-black hover:bg-orange-400">
                + Add Another Field
            </button>
        </div>
    );
};

export default FieldTable;
