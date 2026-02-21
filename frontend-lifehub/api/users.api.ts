import { api } from "./api";
import { RegisterData } from "@/types/RegisterData";

export async function registerRequest(data: RegisterData) {
  const response = await api.post("/users", data);
  return response.data;
}