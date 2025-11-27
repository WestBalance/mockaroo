"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser, SignInButton, UserButton, SignUpButton } from "@clerk/nextjs";
import { Logo } from "../components/logo"; 

export default function Navbar() {
    const { user, isSignedIn } = useUser();

    return (
        <header className="w-full bg-[#0d1220] border-b border-cyan-400 
                           shadow-[0_0_12px_rgba(0,255,255,0.25)]">
            <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

                {/* Logo */}
                <div className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="flex items-center  text-2xl font-extrabold 
                                   text-cyan-300 hover:text-cyan-200 transition"
                    >
                        <Logo className="w-10 h-10" />
                        <span>Mocker</span>
                    </Link>

                    <Link
                        href="/saved-schemas"
                        className="text-xl font-bold text-cyan-300 
                                   hover:text-cyan-200 transition"
                    >
                        Saved Schemas
                    </Link>
                </div>

                {/* Auth */}
                <div className="flex items-center gap-3">
                    {isSignedIn ? (
                        <div className="flex items-center gap-3 text-cyan-200">
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
                                    className="bg-cyan-600 text-black font-bold
                                               hover:bg-cyan-500 transition
                                               rounded-lg"
                                >
                                    Sign In
                                </Button>
                            </SignInButton>

                            <SignUpButton>
                                <Button
                                    variant="secondary"
                                    className="border border-yellow-300 
                                               bg-yellow-400 text-black font-bold
                                               hover:bg-yellow-300 transition
                                               rounded-lg"
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