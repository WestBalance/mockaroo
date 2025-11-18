import { useState, FC } from "react";
import { Field } from "@/types";
import { allFieldTypesWithCategories, FieldTypeWithCategory } from "@/types/FieldTypes";
import FieldTypeSelectorModal from "./FieldTypeSelectorModal";
import { FieldType } from "@/types/FieldTypes";


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
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="ml-40 flex items-center gap-2">

            {/* Название поля */}

            <input
                value={field.name}
                onChange={(e) => onUpdate({ ...field, name: e.target.value })}
                className="border rounded p-1 bg-white text-black hover:bg-yellow-400"
            />

            {/* Кнопка открытия модального */}
            <button
                onClick={() => setShowModal(true)}
                className="border rounded w-full max-w-40 p-1 bg-white text-black hover:bg-yellow-400 text-left justify-between"
            >
                {field.type}
            </button>

            {/* Модальное окно выбора типа */}
            {showModal && (
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
                    }}
                    onClose={() => setShowModal(false)}
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

            {/* Σ button */}
            <button
                className={`px-2 py-1 rounded ml-6
                    ${field.sum
                        ? "bg-green-500 text-white"
                        : isNumericType(field.type)
                            ? "bg-gray-300 hover:bg-yellow-500 cursor-pointer"
                            : "bg-gray-300 opacity-50 cursor-not-allowed"
                    }
                `}
                disabled={!isNumericType(field.type)}
                onClick={() => onUpdate({ ...field, sum: !field.sum })}
            >
                Σ
            </button>

            {/* Delete */}
            <button
                onClick={() => onDelete(field.id)}
                className="text-red-500 font-bold px-2 hover:bg-orange-800"
            >
                X
            </button>
        </div>
    );
};

export default FieldRow;
