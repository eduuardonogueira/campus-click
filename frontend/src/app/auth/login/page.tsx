"use client";

import { login } from "@/app/actions";
import { HOME_ROUTE } from "@/constants/routes";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  async function loginAction(formData: FormData) {
    const username = formData.get("username")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    console.log(username, password);

    const success = await login(username, password);

    console.log(success);

    if (success) {
      router.push(HOME_ROUTE);
    } else {
      alert("Usuário ou senha inválidos");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
      <div className="bg-white text-gray-900 p-10 rounded-lg shadow-lg w-full max-w-sm border border-gray-800 text-center">
        <h1 className="text-2xl font-bold mb-2">Campus Click</h1>
        <p className="text-gray-500 mb-8">
          Acesse o sistema com suas credenciais
        </p>

        <form action={loginAction} className="flex flex-col gap-4">
          <div className="text-left">
            <label htmlFor="email" className="block font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="username"
              placeholder="Digite seu email"
              className="w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-100 text-gray-900 text-base"
            />
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
              className="w-full px-4 py-3 border border-gray-600 rounded-md bg-gray-100 text-gray-900 text-base"
            />
          </div>

          <button
            className="w-full mt-4 py-3 bg-gray-900 text-white font-bold rounded-md text-center hover:opacity-80 transition"
            type="submit"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-gray-500">
          Não tem uma conta?{" "}
          <Link
            href="/cadastro"
            className="text-blue-600 font-bold hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}

