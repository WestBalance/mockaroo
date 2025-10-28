"use client";
import { FC } from "react";
import { Field, FieldType } from "@/types";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Sigma } from "lucide-react";

interface FieldRowProps {
    field: Field;
    onUpdate: (field: Field) => void;
    onDelete: (id: string) => void;
}

const types: FieldType[] = ["Row Number", "First Name", "Last Name", "Email Address", "Gender", "IP Address v4"];

const FieldRow: FC<FieldRowProps> = ({ field, onUpdate, onDelete }) => {
    return (
        <div className="flex items-center gap-2 rounded bg-gray-950 p-2">
            <Input
                value={field.name}
                onChange={(e) => onUpdate({ ...field, name: e.target.value })}
                className="flex-1 bg-gray-950 text-yellow-500"
            />
            <Select
                value={field.type}
                onValueChange={(value: FieldType) => onUpdate({ ...field, type: value })}
            >
                <SelectTrigger className="w-40 text-yellow-500">
                    <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                    {types.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Input
                type="number"
                value={field.blankPercent}
                onChange={(e) => onUpdate({ ...field, blankPercent: Number(e.target.value) })}
                className="w-16 bg-gray-950 text-yellow-500"
            />
            <button onClick={() => onUpdate({ ...field, sum: !field.sum })} className="p-2">
                <Sigma className={`text-white ${field.sum ? "text-yellow-500" : ""}`} />
            </button>
            <button onClick={() => onDelete(field.id)} className="p-2">
                <X className="text-red-500" />
            </button>
        </div>
    );
};

export default FieldRow;
