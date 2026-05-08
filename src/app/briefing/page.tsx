import Link from "next/link";

import { BriefingIntakeForm } from "@/components/briefing-intake-form";
import { LogoutButton } from "@/components/logout-button";
import { requireRole } from "@/modules/auth/session";

import styles from "./page.module.css";

const checkpoints = [
  "Dados da empresa e da pessoa de contato",
  "Problema, oportunidade e objetivo do MVP",
  "Prazo, budget e anexos de referência",
  "Consentimento e necessidade de NDA",
];

export default async function BriefingPage() {
  const session = await requireRole("client");

  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <div>
          <span>Briefing guiado</span>
          <h1>Envie o contexto do seu MVP com profundidade suficiente para uma análise séria.</h1>
          <p>
            Este fluxo foi desenhado para reduzir idas e vindas. Nossa equipe usa essas
            informações para qualificar a oportunidade e preparar a proposta.
          </p>
          <div className={styles.profileBadge}>
            <strong>{session.name}</strong>
            <span>{session.email}</span>
          </div>
        </div>
        <div className={styles.sidebar}>
          <h2>O que vamos avaliar</h2>
          <ul>
            {checkpoints.map((checkpoint) => (
              <li key={checkpoint}>{checkpoint}</li>
            ))}
          </ul>
          <Link href="/workspace">Voltar para minha área</Link>
          <LogoutButton />
        </div>
      </section>

      <section className={styles.formShell}>
        <BriefingIntakeForm />
      </section>
    </main>
  );
}
