"use client";

import { useUser, RedirectToSignIn } from "@clerk/nextjs";

export default function SavedSchemasPage() {
    const { user, isSignedIn } = useUser();

    if (!isSignedIn) return <RedirectToSignIn />;

    return (
        <div className="min-h-screen bg-gray-950 p-10 text-white">
            <div className="mx-auto max-w-4xl">
                {/* Приветствие */}
                <h1 className="mb-3 text-3xl font-bold text-yellow-500">
                    Welcome, {user?.username || user?.firstName || "User"}!
                </h1>
               

                {/* Список схем */}
                <h2 className="mb-4 text-2xl font-semibold text-white">
                    Your Saved Schemas
                </h2>

                <div className="rounded-lg border border-yellow-500 bg-gray-900 p-5 shadow-lg">
                    <ul className="space-y-2">
                        <li className="rounded-md bg-yellow-500 p-3 font-bold text-black transition hover:bg-orange-500">
                            Example Schema 1
                        </li>
                        <li className="rounded-md bg-yellow-500 p-3 font-bold text-black transition hover:bg-orange-500">
                            Example Schema 2
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
}
