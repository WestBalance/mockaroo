"use client";
import React from 'react';
import { FieldType } from '../lib/dataGenerators';

type FieldRowProps = {
    id: string;
    name: string;
    type: FieldType;
    onChange: (id: string, name: string, type: FieldType) => void;
    onDelete: (id: string) => void;
};

export default function FieldRow({ id, name, type, onChange, onDelete }: FieldRowProps) {
    return (
        <div className="flex items-center gap-2">
            <input
                value={name}
                onChange={(e) => onChange(id, e.target.value, type)}
                className="border rounded px-2 py-1 flex-1"
            />
            <select
                value={type}
                onChange={(e) => onChange(id, name, e.target.value as FieldType)}
                className="border rounded px-2 py-1"
            >
                <option>Name</option>
                <option>Email</option>
                <option>Integer</option>
                <option>Date</option>
                <option>Boolean</option>
                <option>Sentence</option>
            </select>
            <button onClick={() => onDelete(id)} className="text-red-600 font-bold px-2 py-1">Delete</button>
        </div>
    );
}
