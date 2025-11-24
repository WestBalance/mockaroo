import "./globals.css";
import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import { type Metadata } from "next";
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
import { Toaster } from 'react-hot-toast';
export const metadata: Metadata = {
    title: "Mocker",
    description: "Generate fake data schemas",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className="min-h-screen bg-gray-950 font-sans">
                    <Navbar />
                        <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
                            {/* Название */}
                            <h1 className="text-3xl font-bold">Mocker</h1>
                        </div>
                    <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
                    <Toaster position="top-center" reverseOrder={false} />
                </body>
            </html>
        </ClerkProvider>
    );
}
