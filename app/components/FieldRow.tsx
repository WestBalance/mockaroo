import { allFieldTypes } from "@/types/FieldTypes";
import { Field } from "@/types";
import { FC } from "react";

interface FieldRowProps {
    field: Field;
    onUpdate: (field: Field) => void;
    onDelete: (id: string) => void;
}

// Функция для проверки, является ли тип числовым
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
    return (
        <div className="flex items-center gap-2">
            {/* Имя поля */}
            <input
                value={field.name}
                onChange={(e) => onUpdate({ ...field, name: e.target.value })}
                className="border rounded p-1 bg-white text-black"
            />

            {/* Выбор типа */}
            <select
                value={field.type}
                onChange={(e) => {
                    const newType = e.target.value as typeof field.type;
                    // Если имя не изменялось вручную, синхронизируем с типом
                    const newName = field.name === field.type ? newType : field.name;
                    onUpdate({ ...field, type: newType, name: newName, sum: isNumericType(newType) ? field.sum : false });
                }}
                className="border rounded p-1 bg-white text-black"
            >
                {allFieldTypes.map((type) => (
                    <option key={type} value={type} className="bg-white text-black">
                        {type}
                    </option>
                ))}
            </select>

            {/* Blank % */}
            <input
                type="number"
                min={0}
                max={100}
                value={field.blankPercent}
                onChange={(e) => onUpdate({ ...field, blankPercent: Number(e.target.value) })}
                className="border rounded p-1 w-16 bg-white text-black"
            />

            {/* Кнопка суммирования */}
            <button
                className={`px-2 py-1 rounded
        ${field.sum ? 'bg-green-500 text-white cursor-pointer' :
                        isNumericType(field.type) ? 'bg-gray-300 text-black hover:bg-yellow-500 cursor-pointer' :
                            'bg-gray-300 text-black opacity-50 cursor-not-allowed'
                    }
    `}
                disabled={!isNumericType(field.type)}
                onClick={() => onUpdate({ ...field, sum: !field.sum })}
            >
                Σ
            </button>

    

            {/* Удаление */}
            <button onClick={() => onDelete(field.id)} className="text-red-500 font-bold px-2 hover:bg-orange-800">
                X
            </button>
        </div>
    );
};

export default FieldRow;
