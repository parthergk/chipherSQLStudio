import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    auth: boolean | null,
    setAuth: React.Dispatch<React.SetStateAction<boolean | null>>
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [auth, setAuth] = useState<boolean | null>(null);

    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await fetch("http://localhost:5000/api/me", {
                    credentials: "include",
                    method: "GET",
                });

                const result = await response.json();
                setAuth(result.isAuth);
            } catch {
                setAuth(false);
            }
        }

        checkAuth();
    }, []);
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be use with in AuthProvider");
    }
    return context;
}