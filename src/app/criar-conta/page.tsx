import Link from "next/link";

import { SignupForm } from "@/components/signup-form";
import { redirectIfAuthenticated } from "@/modules/auth/session";

import styles from "./page.module.css";

export default async function CriarContaPage() {
  await redirectIfAuthenticated();

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <div className={styles.copy}>
          <span>Novo cadastro</span>
          <h1>Crie sua conta rapidamente para organizar seus dados e enviar um briefing completo quando quiser.</h1>
          <p>
            Esse cadastro inicial nos ajuda a tratar o atendimento com mais seguranca,
            manter o historico da sua empresa e melhorar a primeira abordagem.
          </p>
          <Link href="/entrar">Ja possui conta? Entrar</Link>
        </div>

        <div className={styles.formPanel}>
          <SignupForm />
        </div>
      </section>
    </main>
  );
}
