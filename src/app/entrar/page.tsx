import Link from "next/link";

import { LoginForm } from "@/components/login-form";
import { redirectIfAuthenticated } from "@/modules/auth/session";

import styles from "./page.module.css";

export default async function EntrarPage() {
  await redirectIfAuthenticated();

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <div className={styles.copy}>
          <span>Acesso 4DevBrasil</span>
          <h1>Entre para acompanhar seu briefing ou operar a fila interna com a visao correta.</h1>
          <p>
            Cada perfil recebe uma experiencia diferente. Cliente acompanha status e
            proximos passos. Operador trabalha a triagem e a proposta com mais contexto.
          </p>
          <Link href="/criar-conta">Ainda nao tem conta? Criar conta</Link>
        </div>

        <div className={styles.formPanel}>
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
