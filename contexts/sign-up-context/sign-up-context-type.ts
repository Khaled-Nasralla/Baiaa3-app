import { User } from "@/entities/user";

export interface SignUpContextType{
signUp: ({ id,name, surName, emailAddress, password }: User) => Promise <{success: boolean; message?: string }>
error : string | null
loading : boolean
}