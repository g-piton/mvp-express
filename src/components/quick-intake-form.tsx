"use client";

import type { ReactNode } from "react";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  type QuickIntakeInput,
  quickIntakeSchema,
} from "@/modules/intake/schemas/quick-intake";

import styles from "./quick-intake-form.module.css";

export function QuickIntakeForm() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuickIntakeInput>({
    resolver: zodResolver(quickIntakeSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data: QuickIntakeInput) => {
    setServerMessage(null);

    const response = await fetch("/api/quick-intake", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const payload = (await response.json()) as { error?: string };

    if (!response.ok) {
      setServerMessage(payload.error ?? "Nao foi possivel registrar sua empresa.");
      return;
    }

    reset();
    setServerMessage("Cadastro recebido. Nossa equipe vai entrar em contato com os proximos passos.");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.grid}>
        <Field error={errors.companyName?.message} label="Empresa">
          <input placeholder="Nome da empresa" {...register("companyName")} />
        </Field>
        <Field error={errors.contactName?.message} label="Responsavel">
          <input placeholder="Seu nome" {...register("contactName")} />
        </Field>
        <Field error={errors.email?.message} label="E-mail">
          <input placeholder="voce@empresa.com" {...register("email")} />
        </Field>
        <Field error={errors.phone?.message} label="Telefone">
          <input placeholder="+55 11 99999-9999" {...register("phone")} />
        </Field>
      </div>

      <div className={styles.footer}>
        <p>Nos envie o basico agora e nossa equipe entra em contato com os proximos passos.</p>
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Enviando..." : "Cadastrar empresa"}
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
