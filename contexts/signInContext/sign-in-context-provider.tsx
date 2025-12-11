import { signInApi } from "@/api/apiUser";
import { User } from "@/Entities/user";
import { createContext, ReactNode, useContext, useState } from "react";
import { SignInContextType } from "./sign-in-context-type";


const signInContext = createContext<SignInContextType | undefined>(undefined);


export function SignInContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signIn = async (emailAddress: string | null, password: string | null) => {
        setLoading(true);
        setError(null);
        try {
            const data = await signInApi(emailAddress, password);
            setUser(data.data.user);
            console.log(data.data.user)
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const signOut = () => {
        setUser(undefined);
    }
    return (
        <signInContext.Provider value={{ user, loading, error, signIn,signOut }}  >
            {children}
        </signInContext.Provider>
    )
}

export function useSignInContext() {
    const context = useContext(signInContext);
    if (!context) {
        throw new Error('useConnectionContext must be used within a connection context.');
    }
    return context;
}