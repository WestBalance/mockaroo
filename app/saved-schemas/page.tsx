"use client";
import { useUser, RedirectToSignIn } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useSchemaStore } from "@/store/schemaStore";
import { Field } from "@/types/Fields";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

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

        // Переадресация на главную
        router.push("/");
    };

    const deleteSchema = async (id: string) => {
        const res = await fetch(`/api/schemas/${id}`, {
            method: "DELETE",
        });

        if (!res.ok) {
            toast.error("Failed to delete schema");
            return;
        }

        setSchemas((prev) => prev.filter((s) => s.id !== id));
        toast.success("Schema deleted");
    };

    return (
        <div className="min-h-screen bg-gray-950 p-10 text-white">
            <div className="mx-auto max-w-xl">
                <h1 className="mb-5 text-3xl font-bold text-yellow-500">
                    Your Saved Schemas
                </h1>

                <div className="rounded-lg border border-yellow-500 bg-gray-900 p-5">
                    <ul className="space-y-2">
                        {schemas.map((s) => (
                            <li
                                key={s.id}
                                onClick={() => loadSchema(s)}
                                className="flex items-center justify-between rounded-md bg-yellow-500 p-3 text-black 
                                           cursor-pointer hover:bg-yellow-400 transition"
                            >
                                <span className="font-bold">{s.name}</span>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteSchema(s.id);
                                    }}
                                    className="rounded-full bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                                >
                                    X
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
