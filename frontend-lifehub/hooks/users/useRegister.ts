import { useState } from "react";
import { registerRequest } from "@/api/users.api";
import { RegisterData } from "@/types/RegisterData";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function register(data: RegisterData) {
    try {
      setLoading(true);
      setError(null);

      const response = await registerRequest(data);

      return response;
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Erro ao cadastrar usuário"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    register,
    loading,
    error,
  };
}
