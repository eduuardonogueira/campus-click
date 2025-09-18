"use client";

import { login } from "@/app/actions";
import { HOME_ROUTE, SIGNUP_ROUTE } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  async function loginAction(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString().trim() || "";
    const password = formData.get("password")?.toString().trim() || "";

    const newErrors: typeof errors = {};
    if (!username) newErrors.username = "O email é obrigatório.";
    if (!password) newErrors.password = "A senha é obrigatória.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    setErrors({});

    const isLogged = await login(username, password);

    if (isLogged) {
      toast.success("Login realizado com sucesso!");
      router.push(HOME_ROUTE);
    } else {
      toast.error("Usuário ou senha incorretos");
    }

    setIsLoading(false);
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
      <div className="bg-white text-gray-900 p-10 rounded-lg shadow-lg w-full max-w-[500px] border border-gray-800 text-center">
        <h1 className="text-2xl font-bold mb-2">Campus Click</h1>
        <p className="text-gray-500 mb-8">
          Acesse o sistema com suas credenciais
        </p>

        <form onSubmit={loginAction} className="flex flex-col gap-4">
          <div className="text-left">
            <label htmlFor="email" className="block font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="username"
              placeholder="Digite seu email"
              className={`w-full px-4 py-3 border rounded-md bg-gray-100 text-gray-900 text-base ${
                errors.username ? "border-red-500" : "border-gray-600"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          <div className="text-left">
            <label htmlFor="password" className="block font-bold mb-2">
              Senha:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Digite sua senha"
              className={`w-full px-4 py-3 border rounded-md bg-gray-100 text-gray-900 text-base ${
                errors.password ? "border-red-500" : "border-gray-600"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            className="w-full mt-4 py-3 bg-gray-900 text-white font-bold rounded-md text-center hover:cursor-pointer hover:opacity-80 transition disabled:opacity-50"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Carregando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-6 text-gray-500">
          Não tem uma conta?{" "}
          <Link
            href={SIGNUP_ROUTE}
            className="text-blue-600 font-bold hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
