import { signInApi } from "@/api/api-users";
import { User } from "@/entities/user";
import { createContext, ReactNode, useContext, useState } from "react";
import { SignInContextType } from "./sign-in-context-type";


const signInContext = createContext<SignInContextType | undefined>(undefined);


export function SignInContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    const signIn = async (emailAddress: string | null, password: string | null) => {
        setLoading(true);
        try {
            const response = await signInApi(emailAddress, password);
            setUser(response.data.user);
            return { success: true };
        } catch (err: any) {
            const message = err.response?.data?.message || "فشل تسجيل الدخول";
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };


    const signOut = () => {
        setUser(undefined);
    }
    return (
        <signInContext.Provider value={{ user, loading, signIn, signOut }}  >
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