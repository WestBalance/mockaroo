"use client";

import { FC, useState, useMemo } from "react";
import { Search } from "lucide-react";
import { FieldTypeWithCategory } from "@/types/FieldTypes";

// ------------------ Статические примеры для всех типов ------------------
export const staticExamples: Record<string, string[]> = {
    // --- System ---
    "Row Number": ["1", "2", "3"],
    "UUID": [
        "123e4567-e89b-12d3-a456-426614174000",
        "987e6543-e21b-34d3-a456-426614174111",
        "456e7890-e12b-45d3-a456-426614174222"
    ],
    "Increment ID": ["1001", "1002", "1003"],

    // --- Personal ---
    "First Name": ["Liam", "Emma", "Noah"],
    "Last Name": ["Smith", "Johnson", "Williams"],
    "Full Name": ["Liam Smith", "Emma Johnson", "Noah Williams"],
    "Gender": ["Male", "Female", "Non-binary"],
    "Age": ["25", "32", "40"],
    "Date of Birth": ["1998-02-15", "1985-07-30", "2000-12-01"],
    "Phone Number": ["+1 555123456", "+44 7700123456", "+373 60 123456"],
    "Email Address": ["liam.smith@gmail.com", "emma.johnson@yahoo.com", "noah.williams@outlook.com"],
    "Username": ["liam123", "emma.john", "noah_w"],
    "Password": ["Pa$$w0rd1", "MySecret12", "TopSecret!3"],
    "Avatar URL": ["https://i.pravatar.cc/150?img=1", "https://i.pravatar.cc/150?img=2", "https://i.pravatar.cc/150?img=3"],
    "Profile Bio": ["Hello world!", "I love coding.", "Mockaroo clone user."],

    // --- Internet ---
    "Domain": ["example.com", "testsite.org", "mywebsite.net"],
    "URL": ["https://example.com", "https://testsite.org", "https://mywebsite.net"],
    "IP Address v4": ["192.168.0.1", "10.0.0.2", "172.16.5.3"],
    "IP Address v6": ["2001:0db8:85a3::8a2e:0370:7334", "fe80::1ff:fe23:4567:890a", "2001:0db8::1"],
    "MAC Address": ["00:1B:44:11:3A:B7", "00:1B:44:11:3A:B8", "00:1B:44:11:3A:B9"],
    "User Agent": ["Chrome", "Firefox", "Safari"],
    "Browser": ["Chrome", "Firefox", "Edge"],
    "Operating System": ["Windows", "macOS", "Linux"],

    // --- Location ---
    "Country": ["USA", "Canada", "Germany"],
    "Country Code": ["US", "CA", "DE"],
    "City": ["New York", "Toronto", "Berlin"],
    "Street Address": ["123 Main St", "456 Maple Ave", "789 Oak St"],
    "Zip Code": ["10001", "M5V 2T6", "10115"],
    "Latitude": ["40.71278", "43.6532", "52.5200"],
    "Longitude": ["-74.00597", "-79.3832", "13.4050"],
    "Time Zone": ["UTC-5", "UTC-5", "UTC+1"],

    // --- Company / Business ---
    "Company Name": ["Google", "Apple", "Microsoft"],
    "Job Title": ["Software Engineer", "Product Manager", "UX Designer"],
    "Department": ["Engineering", "Marketing", "HR"],
    "Industry": ["Tech", "Finance", "Healthcare"],
    "Currency Code": ["USD", "EUR", "GBP"],
    "IBAN": ["MD123456789012345678", "MD987654321098765432", "MD111122223333444455"],
    "Credit Card Number": ["4000-1234-5678-9010", "4000-2345-6789-0123", "4000-3456-7890-1234"],
    "Credit Card Type": ["Visa", "MasterCard", "Amex"],

    // --- Product / Commerce ---
    "Product Name": ["Laptop", "Phone", "Book"],
    "Product Category": ["Electronics", "Clothing", "Books"],
    "Price": ["499.99", "29.99", "15.00"],
    "Discount %": ["10", "20", "5"],
    "Quantity": ["1", "2", "3"],
    "SKU": ["ABC123", "DEF456", "GHI789"],
    "Barcode": ["123456789012", "987654321098", "456789123012"],
    "Color": ["Red", "Blue", "Green"],
    "Material": ["Cotton", "Plastic", "Metal"],
    "Size": ["S", "M", "L"],

    // --- Dates & Time ---
    "Date": ["2025-01-01", "2024-12-31", "2023-06-15"],
    "Time": ["08:30:00", "14:45:00", "22:15:00"],
    "DateTime": ["2025-01-01T08:30:00Z", "2024-12-31T14:45:00Z", "2023-06-15T22:15:00Z"],
    "Month": ["1", "6", "12"],
    "Year": ["2025", "2023", "1998"],
    "Weekday": ["Monday", "Wednesday", "Friday"],
    "Timestamp (ms)": ["1672531200000", "1688169600000", "1704067200000"],

    // --- Text / Content ---
    "Sentence": ["Hello world.", "This is a test.", "Sample sentence."],
    "Paragraph": ["Lorem ipsum dolor sit amet.", "Consectetur adipiscing elit.", "Sed do eiusmod tempor."],
    "Word": ["Apple", "Orange", "Banana"],
    "Hashtag": ["#fun", "#coding", "#mockdata"],
    "Emoji": ["😀", "😂", "👍"],
    "Tagline": ["Best product ever", "Quality guaranteed", "Your choice!"],
    "Quote": ["To be or not to be", "Knowledge is power", "I think, therefore I am."],
    "Language": ["English", "French", "German"],

    // --- Finance ---
    "Bank Name": ["BCR", "MoldovaBank", "ING"],
    "SWIFT Code": ["BCRUMD33", "MOLDMD2X", "INGMMD33"],
    "Account Balance": ["1000.00", "2500.50", "9999.99"],
    "Tax ID": ["MD1234567", "MD2345678", "MD3456789"],
    "VAT Number": ["MD12345678", "MD87654321", "MD56781234"],
    "Salary": ["1000", "5000", "12000"],
    "Bitcoin Address": ["bc1abc123...", "bc1def456...", "bc1ghi789..."],
    "Ethereum Address": ["0xabc123...", "0xdef456...", "0xghi789..."],

    // --- Education ---
    "University": ["Harvard", "MIT", "Stanford"],
    "Degree": ["BSc", "MSc", "PhD"],
    "Course Name": ["Math 101", "Physics 201", "CS 301"],
    "Grade": ["A", "B", "C"],

    // --- Technology ---
    "Programming Language": ["JavaScript", "Python", "TypeScript"],
    "Framework": ["React", "Next.js", "Angular"],
    "Database": ["PostgreSQL", "MySQL", "MongoDB"],
    "File Extension": [".txt", ".csv", ".json"],
    "Version": ["1.0.0", "2.5.3", "3.1.2"],
    "Device Type": ["Desktop", "Laptop", "Phone"],
    "UUID Token": ["123e4567-e89b-12d3-a456-426614174000", "987e6543-e21b-34d3-a456-426614174111", "456e7890-e12b-45d3-a456-426614174222"],

    // --- Misc ---
    "Boolean": ["true", "false", "true"],
    "Random Number": ["42", "7", "123"],
    "Random Float": ["3.14", "7.77", "42.42"],
    "Custom String": ["abcdef", "qwerty", "zxcvbn"],
    "Null Value": ["null", "null", "null"],
    "Yes/No": ["Yes", "No", "Yes"],
    "True/False": ["True", "False", "True"],
    "Binary Flag": ["0", "1", "0"],
    "Animal": ["Cat", "Dog", "Elephant"],
    "Fruit": ["Apple", "Banana", "Orange"],
    "Vehicle": ["BMW", "Tesla", "Ford"],
    "Planet": ["Earth", "Mars", "Venus"],
    "Continent": ["Europe", "Asia", "America"],
    "Currency Symbol": ["$", "€", "£"],
    "Weather Condition": ["Sunny", "Rainy", "Cloudy"],
    "Temperature °C": ["22", "18", "30"],
    "Temperature °F": ["72", "64", "86"],
    "Blood Type": ["A+", "O-", "B+"]
};


// ------------------ Модальное окно ------------------
interface Props {
    types: FieldTypeWithCategory[];
    selected: string;
    onSelect: (type: string) => void;
    onClose: () => void;
}

const FieldTypeSelectorModal: FC<Props> = ({ types, selected, onSelect, onClose }) => {
    const [search, setSearch] = useState("");

    const filtered = types.filter(
        (t) =>
            t.name.toLowerCase().includes(search.toLowerCase()) ||
            t.category.toLowerCase().includes(search.toLowerCase())
    );

    // Группировка по категориям + добавление статических примеров
    const groupedWithExamples = useMemo(() => {
        const grouped: Record<string, { type: FieldTypeWithCategory; examples: string[] }[]> = {};
        filtered.forEach((t) => {
            if (!grouped[t.category]) grouped[t.category] = [];
            grouped[t.category].push({
                type: t,
                examples: staticExamples[t.name] || ["—", "—", "—"],
            });
        });
        return grouped;
    }, [filtered]);

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4">
            <div className="relative h-[80vh] w-full max-w-5xl overflow-y-auto rounded-lg bg-gray-900 p-6 text-white shadow-lg">
                {/* Закрыть */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-2xl font-bold text-white hover:text-yellow-400"
                >
                    ×
                </button>

                <h2 className="mb-4 text-2xl font-bold text-cyan-300">Choose a Field Type</h2>

                {/* Поиск */}
                <div className="mb-6 flex items-center gap-2">
                    <Search size={20} />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search types..."
                        className="w-full rounded bg-gray-800 p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                </div>

                {/* Секции по категориям */}
                {Object.keys(groupedWithExamples).map((category) => (
                    <div key={category} className="mb-6">
                        <h3 className="mb-2 text-lg font-semibold text-yellow-500">{category}</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {groupedWithExamples[category].map(({ type, examples }) => (
                                <div
                                    key={type.name}
                                    onClick={() => {
                                        onSelect(type.name);
                                        onClose();
                                    }}
                                    className={`cursor-pointer rounded-lg p-3 text-sm font-medium transition
                    hover:bg-cyan-500 hover:text-black
                    ${type.name === selected ? "bg-cyan-600 text-black shadow-lg" : "bg-gray-800 text-white"}`}
                                >
                                    <div className="font-semibold">{type.name}</div>
                                    <div className="mt-1 flex flex-col gap-1 text-xs text-gray-300">
                                        {examples.map((ex, i) => (
                                            <span key={i} className="truncate">{ex}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FieldTypeSelectorModal;
