"use client";

import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import Image from "next/image";
import imgLogin from "@/assets/images/imgLogin.png";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRegister } from "@/hooks/users/useRegister";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { register, loading, error: errorUser } = useRegister();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("Todos os campos devem ser preenchidos");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais");
      return;
    }

    const user = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    await register(user);

    setError("");
    console.log(user);
    router.push("/");
  }

  return (
    <div>
      <div className="flex justify-center items-center bg-primary h-screen">
        <div className="flex h-9/10 w-9/12 bg-white rounded-2xl shadow-lg shadow-blue-900">
          <div className="flex justify-center items-center w-1/2">
            <Image src={imgLogin} alt="" width={300} height={300} priority />
          </div>
          <div className="flex flex-col justify-center items-center bg-secondary w-1/2 h-full rounded-e-2xl text-white px-16">
            <div className="flex flex-col gap-2 items-center mb-10">
              <h1 className="text-3xl">Life Hub</h1>
              <p className="text-[14px] text-center">
                Um sistema feito para gerenciar as principais atividade do dia a
                dia
              </p>
            </div>
            <form
              className="flex flex-col gap-4 w-full"
              onSubmit={handleSubmit}
            >
              <Input
                icon="user"
                type="text"
                placeholder="Nome"
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                icon="email"
                type="email"
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                icon="password"
                type="password"
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                icon="password"
                type="password"
                placeholder="Confirmar senha"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error && <p className="text-red-600">{error}</p>}
              {errorUser && <p className="text-red-600">{errorUser}</p>}
              <Button variant="primary" disabled={loading}>
                {loading ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </form>
            <p
              className="text-[14px] mt-4 cursor-pointer"
              onClick={() => router.push("/")}
            >
              Voltar para a tela de login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
