"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    {
        question: "What is Mocker?",
        answer:
            "Mocker is a futuristic data generator for testing and development, designed with a modern aesthetic.",
    },
    {
        question: "How do I create a schema?",
        answer:
            "Click '+ Add Field', define types, examples, and constraints, then save. Your schema is ready to generate data instantly!",
    },
    {
        question: "Can I export my generated data?",
        answer:
            "Yes! Export your data in CSV or JSON formats easily, ready for integration with your projects.",
    },
    {
        question: "Is my data saved permanently?",
        answer:
            "Schemas are saved in your account. Generated mock data is temporary unless explicitly saved.",
    },
    {
        question: "Do I need to sign in to use Mocker?",
        answer:
            "Signing in unlocks schema saving and cloud features. You can still generate data locally without an account.",
    },
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#0c0c1a] via-[#14142b] to-[#0c0c1a] p-10 text-white flex flex-col items-center">
            <motion.h1
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-lg"
            >
                FAQ
            </motion.h1>

            <div className="w-full max-w-4xl flex flex-col gap-5">
                {faqData.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="bg-[#1a1a2e] border-l-4 border-purple-500 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                        <button
                            onClick={() => toggle(index)}
                            className="w-full flex justify-between items-center p-5 text-left hover:bg-[#2a2a44] transition-colors duration-300 focus:outline-none"
                        >
                            <span className="font-semibold text-blue-300">{item.question}</span>
                            {openIndex === index ? (
                                <ChevronUp size={22} className="text-purple-400" />
                            ) : (
                                <ChevronDown size={22} className="text-purple-400" />
                            )}
                        </button>
                        {openIndex === index && (
                            <div className="p-5 pt-0 text-gray-300 border-t border-gray-700 animate-fadeIn">
                                {item.answer}
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </main>
    );
}
