"use client";

import { useState, useEffect } from "react";
import { colors } from "@/constants/colors";

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
                minHeight: "65vh",
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
                    backgroundColor: colors.bgOff || "#f8fafc",
                    border: `1px solid ${colors.borderLight || "#e2e8f0"}`,
                    textAlign: "center",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
                }}
            >
                <h2 style={{ marginBottom: "8px", fontSize: "1.5rem", fontWeight: "700" }}>
                    Store Access
                </h2>
                <p style={{ marginBottom: "24px", color: "#64748b", fontSize: "0.95rem" }}>
                    This area is currently restricted. Please enter the access code to continue.
                </p>

                <input
                    type="password"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Enter access code"
                    style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "10px",
                        border: error ? "2px solid #ef4444" : "1px solid #cbd5e1",
                        fontSize: "1rem",
                        marginBottom: "12px",
                        outline: "none",
                        boxSizing: "border-box",
                    }}
                />

                {error && (
                    <p style={{ color: "#ef4444", fontSize: "0.875rem", marginBottom: "12px" }}>
                        Incorrect code. Please try again.
                    </p>
                )}

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "12px",
                        borderRadius: "10px",
                        backgroundColor: colors.textMain || "#0f172a",
                        color: colors.bgPure || "#ffffff",
                        fontWeight: "600",
                        fontSize: "1rem",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Enter Store
                </button>
            </form>
        </div>
    );
}