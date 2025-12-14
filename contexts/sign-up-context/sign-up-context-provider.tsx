import { signUpApi } from "@/api/api-users";
import { User } from "@/entities/user";
import { createContext, ReactNode, useContext, useState } from "react";
import { SignUpContextType } from "./sign-up-context-type";

const signUpContext = createContext<SignUpContextType | undefined>(undefined);



export function SignUpContextProvider({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signUp = async ({ name, surName, emailAddress, password }: User) => {
        setLoading(true);
        setError(null)
        try {
            const date = await signUpApi({ name, surName, emailAddress, password });
            setError(date.data?.message)
        } catch (err: any) {
            setError(err.response?.data?.message || err.message)
        } finally {
            setLoading(false);
        }
    }
    return (
        <signUpContext.Provider value={{ error, loading, signUp }}>
            {children}
        </signUpContext.Provider>
    )
}

export function useSignUPContext() {
    const context = useContext(signUpContext);
    if (!context) {
        throw new Error('useConnectionContext must be used within a connection context.');
    }
    return context;
}