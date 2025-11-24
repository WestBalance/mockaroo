"use client";
import { useEffect, useState } from "react";
import { useUser, RedirectToSignIn } from "@clerk/nextjs";
import { useSchemaStore } from "@/store/schemaStore";
import { Field } from "@/types/Fields";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Schema {
    id: string;
    name: string;
    fields: Field[];
}

export default function SavedSchemasPage() {
    const { isSignedIn } = useUser();
    const router = useRouter();
    const [schemas, setSchemas] = useState<Schema[]>([]);

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
        router.push("/"); // возвращаем на главную
    };

    const deleteSchema = async (id: string) => {
        if (!confirm("Are you sure you want to delete this schema?")) return;

        try {
            const res = await fetch(`/api/schemas/${id}`, { method: "DELETE" });
            if (!res.ok) {
                const json = await res.json();
                return toast.error(json.error || "Failed to delete schema");
            }

            setSchemas((prev) => prev.filter((s) => s.id !== id));
            toast.success("Schema deleted!");
        } catch (err) {
            console.error(err);
            toast.error("Error deleting schema — check console");
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 p-10 text-white">
            <div className="mx-auto max-w-4xl">
                <h1 className="mb-5 text-3xl font-bold text-yellow-500">
                    Your Saved Schemas
                </h1>

                <div className="rounded-lg border border-yellow-500 bg-gray-900 p-5">
                    <ul className="space-y-2">
                        {schemas.map((s) => (
                            <li
                                key={s.id}
                                className="flex cursor-pointer items-center justify-between rounded-md bg-yellow-500 p-3 font-bold text-black hover:bg-orange-500"
                            >
                                <span onClick={() => loadSchema(s)}>{s.name}</span>
                                <button
                                    onClick={() => deleteSchema(s.id)}
                                    className="ml-4 text-red-700 font-bold hover:text-red-900"
                                    title="Delete schema"
                                >
                                    ✕
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
