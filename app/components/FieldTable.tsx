
import { FC, useState } from "react";
import FieldRow from "./FieldRow";
import { Field } from "@/types";
import { v4 as uuid } from "uuid";

interface FieldTableProps {
    onFieldsChange?: (fields: Field[]) => void;
}

const FieldTable: FC<FieldTableProps> = ({ onFieldsChange }) => {
    const [fields, setFields] = useState<Field[]>([
             { id: uuid(), name: "Name", type: "First Name", blankPercent: 0, sum: false }
 
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
        <div className="flex w-auto flex-col gap-2">
            <div className="mb-2 ml-55 flex gap-2 font-bold text-yellow-500">
                <span className="w-40">Field Name</span>
                <span className="w-32">Field Type</span>
                <span className="w-20">Blank %</span>
                <span className=" w-12">SUMM</span>
            </div>
            {fields.map((field) => (
                <FieldRow key={field.id} field={field} onUpdate={updateField} onDelete={deleteField} />
            ))}
            <button onClick={addField} className="mt-2 ml-30 w-full max-w-[530px]
 justify-center truncate rounded bg-yellow-500 p-2 px-3 text-black hover:bg-orange-400">
                + Add Another Field
            </button>
        </div>
    );
};

export default FieldTable;
