import { create } from "zustand";
import { Field } from "@/types";

interface SchemaState {
    schemaName: string;
    fields: Field[];

    setSchemaName: (name: string) => void;
    setFields: (fields: Field[]) => void;

    addField: (field: Field) => void;
    updateField: (id: string, updated: Partial<Field>) => void;
    deleteField: (id: string) => void;

    clearAll: () => void;
}

export const useSchemaStore = create<SchemaState>((set) => ({
    schemaName: "",
    fields: [],

    setSchemaName: (name) => set({ schemaName: name }),

    setFields: (fields) => set({ fields: [...fields] }),

    addField: (field) =>
        set((state) => ({
            fields: [...state.fields, { ...field }],
        })),

    updateField: (id, updated) =>
        set((state) => ({
            fields: state.fields.map((f) =>
                f.id === id ? { ...f, ...updated } : f
            ),  
        })),

    deleteField: (id) =>
        set((state) => ({
            fields: state.fields.filter((f) => f.id !== id),
        })),

    clearAll: () => set({ schemaName: "", fields: [] }),
}));
