"use client";

import type { ReactNode } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import styles from "./quick-intake-form.module.css";

const quickIntakeSchema = z.object({
  companyName: z.string().min(2, "Informe o nome da empresa."),
  contactName: z.string().min(2, "Informe seu nome."),
  email: z.string().email("Informe um e-mail valido."),
  phone: z.string().min(8, "Informe um telefone para contato."),
});

type QuickIntakeInput = z.infer<typeof quickIntakeSchema>;

export function QuickIntakeForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<QuickIntakeInput>({
    resolver: zodResolver(quickIntakeSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
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

      {isSubmitSuccessful ? (
        <div className={styles.success}>
          Cadastro validado. O proximo passo e conectar este fluxo a uma Server Action para
          criar o lead basico e iniciar o contato comercial.
        </div>
      ) : null}
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
