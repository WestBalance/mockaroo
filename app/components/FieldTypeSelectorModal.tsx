import { FC, useState } from "react";
import { Search } from "lucide-react";
import { FieldTypeWithCategory } from "@/types/FieldTypes";

interface Props {
    types: FieldTypeWithCategory[];
    selected: string;
    onSelect: (type: string) => void;
    onClose: () => void;
}

const FieldTypeSelectorModal: FC<Props> = ({ types, selected, onSelect, onClose }) => {
    const [search, setSearch] = useState("");

    const filtered = types.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4">
            <div className="relative h-[80vh] w-full max-w-5xl overflow-auto rounded-lg bg-gray-900 p-4 text-white">

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-xl font-bold text-white"
                >
                    ×
                </button>

                <h2 className="mb-2 text-xl font-bold">Choose a Type</h2>

                {/* Search */}
                <div className="mb-4 flex items-center gap-2">
                    <Search size={18} />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Find Type..."
                        className="w-full rounded bg-gray-800 p-2 text-white"
                    />
                </div>

                {/* Type grid */}
                <div className="grid grid-cols-3 gap-4">
                    {filtered.map((t) => (
                        <div
                            key={t.name}
                            onClick={() => {
                                onSelect(t.name);
                                onClose();
                            }}
                            className={`p-2 rounded cursor-pointer hover:bg-yellow-500 ${t.name === selected ? "bg-yellow-600" : ""
                                }`}
                        >
                            <div className="font-bold">{t.name}</div>
                            <div className="text-sm text-gray-300">{t.category}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FieldTypeSelectorModal;
