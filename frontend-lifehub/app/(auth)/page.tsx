"use client";

import Image from "next/image";
import imgLogin from "@/assets/images/imgLogin.png";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, LoginFormData } from "@/schemas/auth.schema";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  async function onSubmit(data: LoginFormData) {
    setServerError("");

    try {
      await login(data.email, data.password);
      router.push("/dashboard");
    } catch {
      setServerError("Usuário ou senha incorretos!");
    }
  }

  return (
    <div className="flex justify-center items-center bg-primary h-screen">
      <div className="flex h-9/10 w-9/12 bg-white rounded-s-2xl rounded-e-3xl">
        <div className="flex justify-center items-center w-1/2">
          <Image src={imgLogin} alt="" width={700} height={700} priority />
        </div>

        <div className="flex flex-col justify-center items-center bg-secondary w-1/2 h-full rounded-e-2xl text-white px-16">
          <div className="flex flex-col gap-2 items-center mb-10">
            <h1 className="text-3xl">Life Hub</h1>
            <p className="text-[14px] text-center">
              Um sistema feito para gerenciar as principais atividades do dia a
              dia
            </p>
          </div>

          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              icon="email"
              type="email"
              placeholder="E-mail"
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              icon="password"
              type="password"
              placeholder="Senha"
              error={errors.password?.message}
              {...register("password")}
            />

            {serverError && (
              <p className="text-red-600 text-sm">{serverError}</p>
            )}

            <Button variant="primary" disabled={isSubmitting}>
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <p className="text-[14px] mt-4">
            Não tem uma conta?
            <strong
              className="cursor-pointer"
              onClick={() => router.push("/register")}
            >
              {" "}
              Criar conta
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}
