import { useState, FC } from "react";
import { Field } from "@/types";
import { allFieldTypesWithCategories, FieldType } from "@/types/FieldTypes";
import FieldTypeSelectorModal from "./FieldTypeSelectorModal";

interface FieldRowProps {
    field: Field;
    onUpdate: (field: Field) => void;
    onDelete: (id: string) => void;
}

const isNumericType = (type: string) => {
    const numericTypes = [
        "Age",
        "Discount %",
        "Quantity",
        "Price",
        "Salary",
        "Random Number",
        "Random Float",
        "Account Balance",
        "Timestamp (ms)"
    ];
    return numericTypes.includes(type);
};

const FieldRow: FC<FieldRowProps> = ({ field, onUpdate, onDelete }) => {
    const [showTypeModal, setShowTypeModal] = useState(false);
    const [showAiModal, setShowAiModal] = useState(false);
    const [aiInput, setAiInput] = useState("");

    return (
        <div className="ml-40 flex items-center gap-2">

            {/* Название поля */}
            <input
                value={field.name}
                onChange={(e) => onUpdate({ ...field, name: e.target.value })}
                className="border rounded p-1 bg-white text-black hover:bg-yellow-400"
            />

            {/* Кнопка открытия модального выбора типа */}
            <button
                onClick={() => setShowTypeModal(true)}
                className="border rounded w-full max-w-40 p-1 bg-white text-black hover:bg-yellow-400 text-left justify-between"
            >
                {field.type}
            </button>

            {/* Модальное окно выбора типа */}
            {showTypeModal && (
                <FieldTypeSelectorModal
                    types={allFieldTypesWithCategories}
                    selected={field.type}
                    onSelect={(newType) => {
                        const sameAsType = field.name === field.type;
                        onUpdate({
                            ...field,
                            type: newType as FieldType,
                            name: sameAsType ? (newType as FieldType) : field.name
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
                onChange={(e) => onUpdate({ ...field, blankPercent: Number(e.target.value) })}
                className="border rounded p-1 w-16 bg-white text-black hover:bg-yellow-400 text-center"
            />

            {/* Delete */}
            <button
                onClick={() => onDelete(field.id)}
                className="text-red-500 font-bold px-2 hover:bg-orange-800"
            >
                X
            </button>

            {/* Кнопка ИИ */}
            <button
                onClick={() => setShowAiModal(true)}
                className="border rounded w-8 h-8 bg-gray-200 hover:bg-yellow-400 flex items-center justify-center"
            >
                🤖
            </button>

            {/* Модальное окно ИИ */}
            {showAiModal && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
                    <div className="w-96 rounded bg-black p-6 shadow-lg">
                        <h2 className="mb-4 text-lg font-bold">Опишите необходимые значения или само поле</h2>
                        <textarea
                            value={aiInput}
                            onChange={(e) => setAiInput(e.target.value)}
                            className="w-full border rounded p-2 mb-4"
                            rows={4}
                            placeholder="Введите описание..."
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowAiModal(false)}
                                className="px-4 py-2 bg-red-500 rounded hover:bg-red-400"
                            >
                                Закрыть
                            </button>
                            <button
                                onClick={() => {
                                    console.log("AI input:", aiInput);
                                    setShowAiModal(false);
                                }}
                                className="px-4 py-2 bg-green-500 rounded hover:bg-green-400"
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
