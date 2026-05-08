import Link from "next/link";

import { LogoutButton } from "@/components/logout-button";
import { requireRole } from "@/modules/auth/session";

import styles from "./page.module.css";

const checklist = [
  "Briefing principal recebido",
  "Objetivo do MVP validado",
  "Prazo inicial alinhado",
  "Aguardando arquivo complementar",
];

const timeline = [
  { title: "Cadastro concluído", detail: "Sua empresa entrou na fila de avaliação.", date: "Hoje" },
  {
    title: "Triagem iniciada",
    detail: "Nosso time está revisando clareza de escopo, risco e dependências.",
    date: "Em andamento",
  },
  {
    title: "Próximo passo",
    detail: "Entraremos em contato para alinhar proposta e premissas do MVP.",
    date: "Em até 1 dia útil",
  },
];

export default async function WorkspacePage() {
  const session = await requireRole("client");

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <span>Área do cliente</span>
          <h1>Olá, {session.name}. Seu briefing está em análise.</h1>
          <p>
            Aqui o cliente vê progresso, próximos passos e o que ainda pode complementar,
            sem acesso à operação interna.
          </p>
        </div>
        <div className={styles.actions}>
          <Link className={styles.linkButton} href="/briefing">
            Atualizar briefing
          </Link>
          <LogoutButton />
        </div>
      </header>

      <section className={styles.grid}>
        <article className={styles.card}>
          <span>Status atual</span>
          <strong>Em análise</strong>
          <p>Seu material foi recebido e já está sendo avaliado pelo nosso time.</p>
        </article>
        <article className={styles.card}>
          <span>Contato principal</span>
          <strong>{session.email}</strong>
          <p>Usaremos este e-mail para retorno, alinhamentos e envio da proposta.</p>
        </article>
        <article className={styles.card}>
          <span>Janela estimada</span>
          <strong>1 dia útil</strong>
          <p>Previsão inicial para primeira devolutiva comercial e operacional.</p>
        </article>
      </section>

      <section className={styles.columns}>
        <article className={styles.panel}>
          <h2>Checklist do cliente</h2>
          <ul>
            {checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className={styles.panel}>
          <h2>Timeline</h2>
          <div className={styles.timeline}>
            {timeline.map((item) => (
              <div className={styles.timelineItem} key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
                <span>{item.date}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
