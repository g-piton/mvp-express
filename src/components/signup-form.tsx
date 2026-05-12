"use client";

import type { ReactNode } from "react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  type SignupInput,
  signupSchema,
} from "@/modules/auth/schemas/signup";

import styles from "./signup-form.module.css";

export function SignupForm() {
  const router = useRouter();
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupInput) => {
    setServerMessage(null);

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const payload = (await response.json()) as { error?: string };

    if (!response.ok) {
      setServerMessage(payload.error ?? "Nao foi possivel criar a conta.");
      return;
    }

    router.push("/workspace");
    router.refresh();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.grid}>
        <Field error={errors.fullName?.message} label="Nome completo">
          <input placeholder="Seu nome" {...register("fullName")} />
        </Field>
        <Field error={errors.companyName?.message} label="Empresa">
          <input placeholder="Nome da empresa" {...register("companyName")} />
        </Field>
        <Field error={errors.email?.message} label="E-mail">
          <input placeholder="voce@empresa.com" {...register("email")} />
        </Field>
        <Field error={errors.phone?.message} label="Telefone">
          <input placeholder="+55 11 99999-9999" {...register("phone")} />
        </Field>
      </div>

      <Field error={errors.password?.message} label="Senha">
        <input placeholder="Crie uma senha" type="password" {...register("password")} />
      </Field>

      <div className={styles.footer}>
        <p>Crie sua conta para organizar seus dados e liberar o envio do briefing completo.</p>
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Criando..." : "Criar conta"}
        </button>
      </div>

      {serverMessage ? <div className={styles.success}>{serverMessage}</div> : null}
    </form>
  );
}

type FieldProps = {
  children: ReactNode;
  error?: string;
  label: string;
};

function Field({ children, error, label }: FieldProps) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      {children}
      {error ? <small>{error}</small> : null}
    </label>
  );
}
