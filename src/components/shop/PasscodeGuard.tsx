"use client";

import { useState, useEffect } from "react";

const PASSCODE = "marcmax";
const STORAGE_KEY = "bdt_store_unlocked";

export function PasscodeGuard({ children }: { children: React.ReactNode }) {
    const [unlocked, setUnlocked] = useState<boolean | null>(null);
    const [inputCode, setInputCode] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        const isUnlocked = sessionStorage.getItem(STORAGE_KEY) === "true";
        setUnlocked(isUnlocked);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputCode.trim().toLowerCase() === PASSCODE.toLowerCase()) {
            sessionStorage.setItem(STORAGE_KEY, "true");
            setUnlocked(true);
            setError(false);
        } else {
            setError(true);
        }
    };

    if (unlocked === null) return null;

    if (unlocked) {
        return <>{children}</>;
    }

    return (
        <div
            style={{
                minHeight: "60vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 20px",
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    maxWidth: "400px",
                    width: "100%",
                    padding: "36px 28px",
                    borderRadius: "20px",
                    backgroundColor: "rgba(15, 23, 42, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    textAlign: "center",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    backdropFilter: "blur(12px)",
                }}
            >
                <h2
                    style={{
                        marginBottom: "8px",
                        fontSize: "1.5rem",
                        fontWeight: "800",
                        color: "#ffffff",
                        letterSpacing: "-0.01em",
                    }}
                >
                    Store Access
                </h2>
                <p
                    style={{
                        marginBottom: "24px",
                        color: "rgba(255, 255, 255, 0.7)",
                        fontSize: "0.925rem",
                        lineHeight: "1.5",
                    }}
                >
                    This area is currently restricted. Please enter the access code to continue.
                </p>

                <input
                    type="password"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Enter access code"
                    style={{
                        width: "100%",
                        padding: "14px 16px",
                        borderRadius: "10px",
                        backgroundColor: "#090d1a",
                        border: error ? "2px solid #ef4444" : "1px solid rgba(255, 255, 255, 0.15)",
                        color: "#ffffff",
                        fontSize: "1rem",
                        marginBottom: "12px",
                        outline: "none",
                        boxSizing: "border-box",
                    }}
                />

                {error && (
                    <p style={{ color: "#ef4444", fontSize: "0.875rem", marginBottom: "12px", fontWeight: "600" }}>
                        Incorrect code. Please try again.
                    </p>
                )}

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "10px",
                        backgroundColor: "#2563eb",
                        color: "#ffffff",
                        fontWeight: "700",
                        fontSize: "0.95rem",
                        border: "none",
                        cursor: "pointer",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                    }}
                >
                    Enter Store
                </button>
            </form>
        </div>
    );
}