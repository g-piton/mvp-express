"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

import { loginAction } from "@/modules/auth/actions";
import type { UserRole } from "@/modules/auth/types";

import styles from "./login-form.module.css";

const demoUsers = {
  client: {
    email: "",
    password: "",
    label: "Cliente",
    subtitle: "Acompanha o briefing, status e proximos passos.",
  },
  operator: {
    email: "operador@demo.com",
    password: "demo123",
    label: "Operador",
    subtitle: "Gerencia triagem, pipeline e proposta comercial.",
  },
} as const;

export function LoginForm() {
  const [role, setRole] = useState<UserRole>("client");
  const [state, formAction] = useActionState(loginAction, {});

  const activeDemoUser = demoUsers[role];

  return (
    <form key={role} className={styles.form} action={formAction}>
      <div className={styles.roleSwitch}>
        {(["client", "operator"] as const).map((item) => {
          const active = role === item;

          return (
            <button
              key={item}
              className={active ? styles.roleButtonActive : styles.roleButton}
              onClick={() => setRole(item)}
              type="button"
            >
              <strong>{demoUsers[item].label}</strong>
              <span>{demoUsers[item].subtitle}</span>
            </button>
          );
        })}
      </div>

      <input name="role" type="hidden" value={role} />

      <div className={styles.field}>
        <label htmlFor="email">E-mail</label>
        <input defaultValue={activeDemoUser.email} id="email" name="email" type="email" />
      </div>

      <div className={styles.field}>
        <label htmlFor="password">Senha</label>
        <input
          defaultValue={activeDemoUser.password}
          id="password"
          name="password"
          type="password"
        />
      </div>

      <div className={styles.demoCard}>
        <span>Acesso de demonstracao</span>
        <strong>
          {role === "operator"
            ? `${activeDemoUser.email} / ${activeDemoUser.password}`
            : "Use o e-mail e a senha da conta criada"}
        </strong>
      </div>

      {state.error ? <p className={styles.error}>{state.error}</p> : null}

      <SubmitButton role={role} />
    </form>
  );
}

function SubmitButton({ role }: { role: UserRole }) {
  const { pending } = useFormStatus();

  return (
    <button className={styles.submit} disabled={pending} type="submit">
      {pending
        ? "Entrando..."
        : role === "operator"
          ? "Entrar como operador"
          : "Entrar como cliente"}
    </button>
  );
}
