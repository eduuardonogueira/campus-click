"use client";

import { useState } from "react";
import Link from "next/link";
import { signup } from "@/api";
import { UserType } from "@/types/user";
import { useRouter } from "next/navigation";
import { LOGIN_ROUTE } from "@/constants/routes";
import { toast } from "react-toastify";

interface IFormData {
  fullName: string;
  email: string;
  password: string;
  confirmedPassword: string;
  type: UserType;
}

export default function CadastroPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<IFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmedPassword: "",
    type: "discente",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName) newErrors.fullName = "Nome completo é obrigatório";
    if (!formData.email) newErrors.email = "Email é obrigatório";
    if (!formData.password) newErrors.password = "Senha é obrigatória";
    if (!formData.confirmedPassword)
      newErrors.confirmedPassword = "Digite sua senha novamente";
    if (
      formData.password &&
      formData.confirmedPassword &&
      formData.password !== formData.confirmedPassword
    ) {
      newErrors.confirmedPassword = "As senhas não conferem";
    }
    if (!formData.type) newErrors.type = "Selecione um perfil";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    if (validate()) {
      const data = await signup(formData);

      if (!data || data.id) {
        toast.success("Cadastro realizado com sucesso!");
        router.push(LOGIN_ROUTE);
        return;
      }

      toast.error("Erro ao criar cadastro!");
      return;
    }

    toast.error("Você deve preencher todos os campos obrigatórios!");
    setIsLoading(false);
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="bg-background text-foreground p-10 rounded-lg shadow-lg w-full max-w-[600px] text-center border border-neutral-800">
        <h1 className="text-3xl font-bold mb-2">Campus Click</h1>
        <p className="mb-8 text-gray-600">
          Cadastre suas credenciais para acessar o sistema
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="text-left">
            <label htmlFor="fullName" className="block mb-2">
              Nome Completo:
            </label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Digite seu Nome Completo"
              className="w-full p-3 border border-gray-400 rounded-md bg-gray-100 text-gray-900 placeholder-gray-600"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}
          </div>

          <div className="text-left">
            <label htmlFor="email" className="block mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu email"
              className="w-full p-3 border border-gray-400 rounded-md bg-gray-100 text-gray-900 placeholder-gray-600"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="text-left">
            <label htmlFor="password" className="block mb-2">
              Senha:
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Digite sua senha"
              className="w-full p-3 border border-gray-400 rounded-md bg-gray-100 text-gray-900 placeholder-gray-600"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="text-left">
            <label htmlFor="confirmedPassword" className="block mb-2">
              Confirmar Senha:
            </label>
            <input
              type="password"
              id="confirmedPassword"
              value={formData.confirmedPassword}
              onChange={handleChange}
              placeholder="Confirme sua senha"
              className="w-full p-3 border border-gray-400 rounded-md bg-gray-100 text-gray-900 placeholder-gray-600"
            />
            {errors.confirmedPassword && (
              <p className="text-red-500 text-sm">{errors.confirmedPassword}</p>
            )}
          </div>

          <div className="text-left">
            <label htmlFor="perfil" className="block mb-2">
              Selecione Seu Perfil:
            </label>
            <select
              id="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 rounded-md bg-gray-100 text-gray-900"
            >
              <option value="discente">Discente</option>
              <option value="docente">Docente</option>
              <option value="tecnico">Técnico</option>
              <option value="externo">Externo</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-gray-900 text-white rounded-md font-bold text-base mt-4 cursor-pointer transition-opacity hover:opacity-80"
            disabled={isLoading}
          >
            {isLoading ? "Carregando..." : "Cadastrar"}
          </button>
        </form>

        <p className="mt-6 text-gray-500">
          Já tem uma conta?{" "}
          <Link href="/" className="text-blue-600 font-bold hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}

