import { User } from "@/entities/user";

export interface SignInContextType {
    user:User | undefined ;
    loading:boolean;
    signIn: (emailAddress:string,password: string) => Promise<{success: boolean; message?: string }>;
    signOut: () => void;
}