"use client";

import { useUser, RedirectToSignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useSchemaStore } from "@/store/schemaStore";
import { Field } from "@/types/Fields";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Trash2, Download } from "lucide-react";

interface Schema {
    id: string;
    name: string;
    fields: Field[];
}

export default function SavedSchemasPage() {
    const { isSignedIn } = useUser();
    const [schemas, setSchemas] = useState<Schema[]>([]);
    const router = useRouter();

    const setSchemaName = useSchemaStore((s) => s.setSchemaName);
    const setFields = useSchemaStore((s) => s.setFields);

    useEffect(() => {
        fetch("/api/schemas")
            .then((res) => res.json())
            .then((data) => setSchemas(data));
    }, []);

    if (!isSignedIn) return <RedirectToSignIn redirectUrl="/schemas" />;

    const loadSchema = (schema: Schema) => {
        setSchemaName(schema.name);
        setFields(schema.fields);
        toast.success(`Schema "${schema.name}" loaded!`);
        router.push("/");
    };

    const deleteSchema = async (id: string) => {
        const res = await fetch(`/api/schemas/${id}`, { method: "DELETE" });
        if (!res.ok) {
            toast.error("Failed to delete schema");
            return;
        }
        setSchemas((prev) => prev.filter((s) => s.id !== id));
        toast.success("Schema deleted");
    };

    return (
        <main className="min-h-screen bg-gray-900 p-10 text-white flex flex-col items-center">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8 text-4xl font-extrabold text-cyan-300 drop-shadow-lg"
            >
                Saved Schemas
            </motion.h1>

            {schemas.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-400 text-lg mt-10"
                >
                    You have no saved schemas yet.
                </motion.div>
            )}

            <div className="w-full max-w-3xl flex flex-col gap-4">
                {schemas.map((s) => (
                    <motion.div
                        key={s.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                        className="flex justify-between items-center bg-gray-800 rounded-xl border-l-4 border-cyan-500 p-4 cursor-pointer hover:bg-gray-700 transition"
                        onClick={() => loadSchema(s)}
                    >
                        <span className="font-bold text-cyan-400 truncate">{s.name}</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteSchema(s.id);
                            }}
                            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full text-white font-bold transition"
                        >
                            <Trash2 size={16} /> Delete
                        </button>
                    </motion.div>
                ))}
            </div>
        </main>
    );
}
