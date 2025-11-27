"use client";

import { motion } from "framer-motion";

const steps = [
    {
        title: "Step 1: Create a Schema",
        description:
            "Start by defining the fields you want in your schema. Use the 'Add Field' button to include new fields and configure their types and names.",
    },
    {
        title: "Step 2: Customize Your Data",
        description:
            "After adding fields, you can customize the data generation rules for each field. Choose from different types like text, number, date, or select predefined options.",
    },
    {
        title: "Step 3: Preview Generated Data",
        description:
            "Click 'Generate' to preview your data. Make adjustments to your fields or settings if needed until the generated data meets your requirements.",
    },
    {
        title: "Step 4: Save Your Schema",
        description:
            "Once satisfied, save your schema for future use. You can load, edit, or delete saved schemas anytime from the 'Saved Schemas' page.",
    },
    {
        title: "Step 5: Export Your Data",
        description:
            "Export your generated data in CSV, JSON, or Excel formats using the 'Download' button. Use it in your projects, tests, or applications.",
    },
];

export default function UserGuidePage() {
    return (
        <main className="min-h-screen bg-gray-900 p-10 text-white flex flex-col items-center">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8 text-4xl font-extrabold text-cyan-300 drop-shadow-lg text-center"
            >
                User Guide
            </motion.h1>

            <div className="w-full max-w-4xl flex flex-col gap-6">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.2 }}
                        className="bg-gray-800 rounded-xl border-l-4 border-cyan-500 p-6 shadow-md hover:shadow-lg transition cursor-default"
                    >
                        <h2 className="text-xl font-bold text-cyan-400 mb-2">
                            {step.title}
                        </h2>
                        <p className="text-gray-300">{step.description}</p>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: steps.length * 0.2 }}
                className="mt-10 text-center text-gray-400"
            >
                Follow these steps to generate and manage your mock data efficiently!
            </motion.div>
        </main>
    );
}
