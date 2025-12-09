import { User } from "@/Entities/user";
import { api } from "./api";

export async function signUp({ name, surName, emailAddress, password }: User) {
  return api.post("/users/signup", {
    name,
    surName,
    emailAddress,
    password,
  });
}

type SignInDto = {
  emailAddress: string;
  password: string;
};

// Correct function signature
export async function signIn({ emailAddress, password }: SignInDto) {
  return api.post("/users/signin", {
    emailAddress: emailAddress, // matches backend SignInDto
    password: password,
  });
}

