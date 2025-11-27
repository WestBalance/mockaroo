"use client";

import { useState } from "react";
import FieldTable from "@/app/components/FieldTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { generateData } from "@/utils/generateData";
import { Copy } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useSchemaStore } from "@/store/schemaStore";
import toast from "react-hot-toast";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Home() {
    const { isSignedIn } = useUser();
    const [prompt, setPrompt] = useState("");
    const [aiLoading, setAiLoading] = useState(false);
    const [rowCount, setRowCount] = useState<number>(100);
    const [data, setData] = useState<Record<string, unknown>[]>([]);
    const [copySuccess, setCopySuccess] = useState(false);
    const [isNaming, setIsNaming] = useState(false);
    const [tempName, setTempName] = useState("");

    const fields = useSchemaStore((s) => s.fields);
    const setFields = useSchemaStore((s) => s.setFields);
    const setSchemaName = useSchemaStore((s) => s.setSchemaName);

    const cardAnimation = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.36 } } };
    const buttonHover = { scale: 1.03, transition: { duration: 0.14 } };

    const baseBtn = "font-semibold rounded-lg h-11 transition-shadow flex items-center justify-center gap-2 text-sm";
    const primaryBtn = `${baseBtn} bg-[#7c3aed] hover:bg-[#6b21d8] text-white shadow-[0_6px_18px_rgba(124,58,237,0.12)]`;
    // Accent (Manual Generate)
    const accentBtn = `${baseBtn} bg-[#06b6d4] text-white hover:bg-[#0891b2]`;

    // Save (Save Schema)
    const saveBtn = `${baseBtn} bg-[#10b981] text-white hover:bg-[#059669]`;
    const ghostBtn = `${baseBtn} bg-transparent border border-[#233046] text-[#cbd5e1] hover:border-[#7c3aed]`;
    const inputStyle = "bg-[#071226] border border-[#172033] text-[#cbd5e1] rounded-lg h-11 px-3 placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-offset-0";

    // --- Handlers (logic unchanged) ---
    const generateWithAI = async () => {
        if (!prompt.trim()) return toast.error("Введите описание схемы");
        setAiLoading(true);
        try {
            const res = await fetch("/api/ai-generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: prompt.trim() }),
            });
            const json = await res.json();
            if (!res.ok) return toast.error(json.error || "AI generation failed");
            setFields(json.fields);
            toast.success("Схема успешно создана ИИ!");
        } catch (err) {
            console.error(err);
            toast.error("Ошибка при запросе к ИИ");
        } finally {
            setAiLoading(false);
        }
    };

    const safeGenerate = () => {
        if (!fields || !Array.isArray(fields)) return toast.error("Fields are not ready. Check console.");
        if (!fields.length) return toast.error("Add some fields first!");
        const result = generateData(fields, rowCount);
        setData(result);
    };

    const askSchemaName = () => {
        if (!isSignedIn) return toast.error("Sign in to save schemas!");
        if (!fields.length) return toast.error("Schema must have fields!");
        setIsNaming(true);
    };

    const saveSchema = async () => {
        if (!tempName.trim()) return toast.error("Enter schema name!");
        try {
            const res = await fetch("/api/schemas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: tempName.trim(), fields }),
            });
            const json = await res.json();
            if (!res.ok) return toast.error(json.error || "Save failed");
            setSchemaName(tempName.trim());
            setTempName("");
            setIsNaming(false);
            toast.success(`Schema "${json.name}" saved!`);
        } catch (err) {
            console.error(err);
            toast.error("Save failed — check console.");
        }
    };

    const downloadJSON = () => {
        if (!data.length) return toast.error("Nothing to download");
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "mockaroo_data.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    const downloadCSV = () => {
        if (!data.length) return toast.error("Nothing to download");
        const csvRows = [Object.keys(data[0]).join(",")];
        for (const row of data) {
            csvRows.push(
                Object.values(row)
                    .map((v) => `"${String(v).replace(/"/g, '""')}"`)
                    .join(","),
            );
        }
        const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "mockaroo_data.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    const copyToClipboard = async () => {
        if (!data.length) return toast.error("Nothing to copy");
        try {
            await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error("Copy failed", err);
            toast.error("Copy failed");
        }
    };

    // --- UI ---
    return (
        <main className="relative min-h-screen w-full overflow-hidden text-[#cbd5e1]">
            {/* FULLSCREEN NEON BACKGROUND */}
            <div className="fixed inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-[#071226]" />
                <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-gradient-to-br from-[#7c3aed]/40 to-transparent blur-3xl" />
                <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-[#06b6d4]/40 to-transparent blur-3xl" />
                <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 pointer-events-none" />
            </div>

            {/* PAGE CONTENT */}
            <div className="relative z-10 w-full max-w-2xl mx-auto p-6 flex flex-col gap-6">
                {/* HEADER */}
                <motion.header initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-[#e6eef8]">Mock Your Data</h1>
                            <p className="mt-1 text-sm text-[#94a3b8]">
                                Generate realistic mock data & schemas — now with corporate high-tech visual polish.
                            </p>
                        </div>
                    </div>
                </motion.header>

                {/* AI Generator Card */}
                <motion.section variants={cardAnimation} initial="hidden" animate="visible">
                    <Card className="bg-[#081328] border border-[#112232] rounded-xl shadow-[0_20px_40px_rgba(2,6,23,0.6)] overflow-visible">
                        <CardHeader className="!px-6 !pt-6">
                            <CardTitle className="text-lg font-semibold text-[#e6eef8]">AI Schema Builder</CardTitle>
                        </CardHeader>
                        <CardContent className="px-6 pb-6 pt-2 flex flex-col gap-4">
                            <Input
                                placeholder="Опишите схему: 'магазин, товары, цена, категория...'"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className={`${inputStyle} flex-1`}
                            />
                            <motion.div whileHover={buttonHover} className="self-start">
                                <Button onClick={generateWithAI} disabled={aiLoading} className={primaryBtn + " px-4"}>
                                    {aiLoading ? "AI is thinking..." : "Generate Schema (AI)"}
                                </Button>
                            </motion.div>
                        </CardContent>
                    </Card>
                </motion.section>

                {/* MANUAL GENERATION + FIELD TABLE */}
                <motion.section variants={cardAnimation} initial="hidden" animate="visible">
                    <Card className="bg-[#081328] border border-[#122235] rounded-xl shadow-[0_18px_36px_rgba(2,6,23,0.55)]">
                        <CardHeader className="!px-6 !pt-6">
                            <CardTitle className=" ml-57 text-lg font-bold text-[#e6eef8]">Manual Generation</CardTitle>
                        </CardHeader>
                        <CardContent className="px-6 pb-6 pt-2 space-y-4">
                            <FieldTable />
                            <span className="text-white font-bold ml-30"> # of rows</span>
                            <div className="  flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                          
                                <Input type="number" min={1} value={rowCount} onChange={(e) => setRowCount(Number(e.target.value))} className={`${inputStyle} md:w-44 border-white ml-20 bg-white text-black`} />
                                <div className="flex gap-3">
                                    <motion.div whileHover={buttonHover}>
                                        <Button onClick={safeGenerate} className={accentBtn}>Generate</Button>
                                    </motion.div>

                                    <motion.div whileHover={buttonHover}>
                                        <Button onClick={askSchemaName} className={saveBtn}>Save Schema</Button>
                                    </motion.div>

                                </div>
                            </div>

                            {isNaming && (
                                <div className="mt-2">
                                    <Card className="bg-[#071226] border border-[#0f3a2f] p-4 rounded-lg">
                                        <Label className="text-sm font-medium text-[#d1fae5]">Enter Schema Name</Label>
                                        <div className="mt-2 flex flex-col md:flex-row gap-3">
                                            <Input value={tempName} onChange={(e) => setTempName(e.target.value)} className={`${inputStyle} w-full md:w-72 bg-white`} placeholder="My schema name" />
                                            <div className="flex gap-2 w-full md:w-auto">
                                                <motion.div whileHover={buttonHover} className="flex-1">
                                                    <Button className={saveBtn + "w-full"} onClick={saveSchema}> Save</Button>
                                                </motion.div>
                                                <motion.div whileHover={buttonHover} className="flex-1">
                                                    <Button className="bg-red-600 hover:bg-[#3a3a3a] text-[#e6eef8] w-full h-11" onClick={() => { setIsNaming(false); setTempName(""); }}>Cancel</Button>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.section>

                {/* GENERATED DATA PREVIEW */}
                {data.length > 0 && (
                    <motion.section variants={cardAnimation} initial="hidden" animate="visible">
                        <Card className="bg-[#e6eef8] text-[#071226] rounded-xl shadow-[0_22px_40px_rgba(2,6,23,0.08)] overflow-hidden">
                            <div className="p-4 relative">
                                <button onClick={copyToClipboard} title="Copy to clipboard" className="absolute right-4 top-4 p-1 rounded-md text-[#071226] hover:text-[#0b1726] bg-[#dbeafe] border border-[#c7e4ff] transition">
                                    <Copy size={18} />
                                </button>
                                <pre className="whitespace-pre-wrap max-h-[420px] overflow-auto text-sm bg-transparent p-2 rounded">{JSON.stringify(data, null, 2)}</pre>
                            </div>
                        </Card>
                    </motion.section>
                )}

                {/* DOWNLOADS */}
                {data.length > 0 && (
                    <motion.div variants={cardAnimation} initial="hidden" animate="visible" className="flex gap-3">
                        <motion.div whileHover={buttonHover} className="flex-1">
                            <Button onClick={downloadJSON} className={primaryBtn + " w-full"}>Download JSON</Button>
                        </motion.div>
                        <motion.div whileHover={buttonHover} className="flex-1">
                            <Button onClick={downloadCSV} className={ghostBtn + " w-full border-[#2b2f3a] border-cyan-300 text-white bg-cyan-600"}>Download CSV</Button>
                        </motion.div>
                    </motion.div>
                )}

                {copySuccess && (
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed top-6 left-1/2 -translate-x-1/2 rounded-md bg-[#10b981] px-4 py-2 text-black shadow-lg">
                        Copied to clipboard!
                    </motion.div>
                )}
            </div>
        </main>
    );
}
