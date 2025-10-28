import "./globals.css";
import { ReactNode } from "react";
import { type Metadata } from "next";
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";

export const metadata: Metadata = {
    title: "Mocker",
    description: "Generate fake data schemas",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className="min-h-screen bg-gray-950 font-sans">
                    <header className="bg-yellow-500 py-4 shadow">
                        <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
                            {/* Название */}
                            <h1 className="text-3xl font-bold">Mocker</h1>

                            {/* Кнопки авторизации / профиль */}
                            <div className="flex items-center gap-2">
                                <SignedOut>
                                    <SignInButton>
                                        <button className="h-10 cursor-pointer rounded-full bg-gray-200 px-4 text-sm font-medium text-black sm:h-12 sm:px-5 sm:text-base">
                                            Sign In
                                        </button>
                                    </SignInButton>
                                    <SignUpButton>
                                        <button className="h-10 cursor-pointer rounded-full bg-gray-950 px-4 text-sm font-medium text-white sm:h-12 sm:px-5 sm:text-base">
                                            Sign Up
                                        </button>
                                    </SignUpButton>
                                </SignedOut>

                                <SignedIn>
                                    <UserButton />
                                </SignedIn>
                            </div>
                        </div>
                    </header>

                    <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
                </body>
            </html>
        </ClerkProvider>
    );
}
