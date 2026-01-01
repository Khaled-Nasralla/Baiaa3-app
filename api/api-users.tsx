import { User } from "@/entities/user";
import { api } from "./api";

export async function signUpApi({ name, surName, emailAddress, password,profileImage,createdAt }: User) {
  return api.post("/users/signup", {
    name,
    surName,
    emailAddress,
    password,
    profileImage,
    createdAt,
  });
}

export async function signInApi( emailAddress:string | null, password : string|null) {
  return api.post("/users/signin", {
    emailAddress: emailAddress,
    password: password,
  });
}


export async function GetUserById(userId:string): Promise<User> {
  const response = await api.get(`/users/${userId}`);
    console.log(response.data.data);
  return response.data.data;
}

export async function UpdateProfileImage({formData} : {formData:FormData}):Promise<string>{
 const response = await api.post("/users/profileImage", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
console.log(response.data);
return response.data.imageUrl;
}
