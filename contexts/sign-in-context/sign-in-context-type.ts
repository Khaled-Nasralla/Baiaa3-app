import { User } from "@/entities/user";

export interface SignInContextType {
    user:User | undefined ;
    loading:boolean;
    signIn: (emailAddress:string,password: string) => Promise<void>;
    signOut: () => void;
    error: string | null;
}