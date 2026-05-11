"use client";

import type { ReactNode } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import styles from "./signup-form.module.css";

const signupSchema = z.object({
  fullName: z.string().min(2, "Informe seu nome completo."),
  companyName: z.string().min(2, "Informe o nome da empresa."),
  email: z.string().email("Informe um e-mail valido."),
  phone: z.string().min(8, "Informe um telefone para contato."),
  password: z.string().min(6, "A senha precisa ter ao menos 6 caracteres."),
});

type SignupInput = z.infer<typeof signupSchema>;

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
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

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
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

      {isSubmitSuccessful ? (
        <div className={styles.success}>
          Conta validada. O proximo passo e ligar este cadastro ao banco e iniciar a sessao
          automaticamente.
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
