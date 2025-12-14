import { User } from "@/entities/user";

export interface SignUpContextType{
signUp: ({ id,name, surName, emailAddress, password }: User) => Promise <void>
error : string | null
loading : boolean
}