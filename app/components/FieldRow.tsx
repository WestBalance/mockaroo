import { useState, FC } from "react";
import { Field } from "@/types/Fields";
import { allFieldTypesWithCategories, FieldType } from "@/types/FieldTypes";
import FieldTypeSelectorModal from "./FieldTypeSelectorModal";

interface FieldRowProps {
    field: Field;
    onUpdate: (field: Field) => void;
    onDelete: (id: string) => void;
}

const FieldRow: FC<FieldRowProps> = ({ field, onUpdate, onDelete }) => {
    const [showTypeModal, setShowTypeModal] = useState(false);
    const [showAiModal, setShowAiModal] = useState(false);
    const [aiInput, setAiInput] = useState("");

    return (
        <div className="ml-10 flex items-center gap-3 py-2 px-3 rounded-xl 
                        bg-[#0d1220] border border-[#1b2338]
                        shadow-[0_0_10px_rgba(0,255,255,0.15)]
                        hover:shadow-[0_0_16px_rgba(0,255,255,0.35)] 
                        transition">

            {/* Field Name */}
            <input
                value={field.name}
                onChange={(e) => onUpdate({ ...field, name: e.target.value })}
                className="w-40 rounded-lg px-2 py-1 text-black bg-white
                           border border-cyan-300
                           focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300 
                           transition font-semibold"
            />

            {/* Type Button */}
            <button
                onClick={() => setShowTypeModal(true)}
                className="w-40 rounded-lg px-2 py-1 text-black bg-white 
                           border border-pink-300 text-left
                           hover:bg-pink-100 transition font-semibold"
            >
                {field.type}
            </button>

            {showTypeModal && (
                <FieldTypeSelectorModal
                    types={allFieldTypesWithCategories}
                    selected={field.type}
                    onSelect={(newType) => {
                        const same = field.name === field.type;
                        onUpdate({
                            ...field,
                            type: newType as FieldType,
                            name: same ? (newType as FieldType) : field.name
                        });
                        setShowTypeModal(false);
                    }}
                    onClose={() => setShowTypeModal(false)}
                />
            )}

            {/* Blank % */}
            <input
                type="number"
                min={0}
                max={100}
                value={field.blankPercent}
                onChange={(e) =>
                    onUpdate({ ...field, blankPercent: Number(e.target.value) })
                }
                className="w-20 rounded-lg px-2 py-1 text-black bg-white
                           border border-yellow-300 text-center 
                           hover:bg-yellow-100 font-semibold transition"
            />

            {/* Delete */}
            <button
                onClick={() => onDelete(field.id)}
                className="text-red-400 font-bold px-2 py-1 rounded
                           hover:bg-red-900 hover:text-red-300
                           transition"
            >
                ✖
            </button>

            {/* AI Button */}
            <button
                onClick={() => setShowAiModal(true)}
                className="w-9 h-9 rounded-lg bg-[#162032]
                           border border-cyan-400 text-cyan-300
                           hover:bg-[#1f2d45] hover:border-cyan-300 
                           hover:shadow-[0_0_10px_cyan]
                           transition text-xl"
            >
                🤖
            </button>

            {showAiModal && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
                    <div className="w-96 rounded-xl bg-[#111827] p-6 shadow-[0_0_20px_cyan]">
                        <h2 className="mb-4 text-lg font-bold text-cyan-300">
                            AI Field Assistant
                        </h2>

                        <textarea
                            value={aiInput}
                            onChange={(e) => setAiInput(e.target.value)}
                            className="w-full rounded-lg bg-black border border-cyan-400 text-cyan-200 p-2"
                            rows={4}
                            placeholder="Введите описание…"
                        />

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                onClick={() => setShowAiModal(false)}
                                className="px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-500 transition"
                            >
                                Закрыть
                            </button>

                            <button
                                onClick={() => {
                                    console.log("AI input:", aiInput);
                                    setShowAiModal(false);
                                }}
                                className="px-4 py-2 bg-cyan-600 rounded-lg text-white hover:bg-cyan-500 transition"
                            >
                                Отправить
                            </button>
                        </div>  
                    </div>
                </div>
            )}
        </div>
    );
};

export default FieldRow;
