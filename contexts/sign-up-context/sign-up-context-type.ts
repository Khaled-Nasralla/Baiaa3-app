import { User } from "@/entities/user";

export interface SignUpContextType{
signUp: ({ name, surName, emailAddress, password }: User) => Promise <void>
error : string | null
loading : boolean
}