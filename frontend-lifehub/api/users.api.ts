import { User } from "@/types/User";
import { api } from "./api";
import { RegisterData } from "@/types/RegisterData";

export async function registerRequest(data: RegisterData) {
  const response = await api.post("/users", data);
  return response.data;
}

export async function getMe(): Promise<User> {
  const response = await api.get("/users/me");
  return response.data;
}