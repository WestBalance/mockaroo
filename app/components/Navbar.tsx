"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser, SignInButton, UserButton, SignUpButton } from "@clerk/nextjs";

export default function Navbar() {
    const { user, isSignedIn } = useUser();

    return (
        <header className="w-full bg-yellow-500 text-black shadow-md">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
                {/* Логотип + кнопки сразу после него */}
                <div className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-2xl font-extrabold tracking-wide hover:text-orange-600"
                    >
                        <Image
                            src="/logo.jpg"
                            alt="Logo"
                            width={32}
                            height={32}
                        />
                        <span>Mocker</span>
                    </Link>

                 

                    <Link
                        href="/saved-schemas"
                        className="text-xl font-bold transition-colors hover:text-orange-600"
                    >
                        Saved Schemas
                    </Link>
                </div>

                {/* Право: авторизация */}
                <div className="flex items-center gap-3">
                    {isSignedIn ? (
                        <div className="flex items-center gap-2">
                            <span className="font-medium">
                                {user.username || user.emailAddresses[0].emailAddress}
                            </span>
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <SignInButton>
                                <Button
                                    variant="secondary"
                                    className="bg-black text-yellow-400 hover:bg-gray-800"
                                >
                                    Sign In
                                </Button>
                            </SignInButton>
                            <SignUpButton>
                                <Button
                                    variant="secondary"
                                    className="border border-gray-950 bg-yellow-500 text-black hover:bg-orange-400"
                                >
                                    Sign Up
                                </Button>
                            </SignUpButton>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
