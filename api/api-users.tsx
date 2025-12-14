import { User } from "@/entities/user";
import { api } from "./api";

export async function signUpApi({ name, surName, emailAddress, password }: User) {
  return api.post("/users/signup", {
    name,
    surName,
    emailAddress,
    password,
  });
}

export async function signInApi( emailAddress:string | null, password : string|null) {
  return api.post("/users/signin", {
    emailAddress: emailAddress,
    password: password,
  });
}

