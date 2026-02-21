import { api } from "./api";
import { LoginPayload, LoginResponse } from "@/types/auth";

export async function loginRequest(
  data: LoginPayload
): Promise<LoginResponse> {
  const response = await api.post("/auth/login", data);
  console.log("LOGIN RESPONSE:", response);
  return response.data;
}
