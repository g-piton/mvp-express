import Link from "next/link";

import { LogoutButton } from "@/components/logout-button";
import { requireRole } from "@/modules/auth/session";
import { getClientWorkspace } from "@/modules/leads/server";

import styles from "./page.module.css";

const statusLabels: Record<string, string> = {
  RECEIVED: "Recebido",
  IN_REVIEW: "Em analise",
  WAITING_FOR_CLIENT: "Aguardando cliente",
  READY_FOR_PROPOSAL: "Pronto para proposta",
  PROPOSAL_SENT: "Proposta enviada",
  WON: "Ganho",
  LOST: "Perdido",
};

export default async function WorkspacePage() {
  const session = await requireRole("client");
  const { latestLead, leadsCount, user } = await getClientWorkspace(session.id);

  const checklist = [
    latestLead ? "Briefing principal recebido" : "Cadastro da conta concluido",
    latestLead?.mvpGoal ? "Objetivo do MVP registrado" : "Objetivo do MVP aguardando envio",
    latestLead?.deadlineExpectation ? "Prazo inicial alinhado" : "Prazo inicial aguardando definicao",
    latestLead?.briefings.length ? "Material complementar anexado" : "Sem anexo complementar ate o momento",
  ];

  const timeline = [
    {
      title: "Conta ativa",
      detail: "Seu acesso foi criado e sua empresa ja pode enviar dados e briefings.",
      date: new Intl.DateTimeFormat("pt-BR").format(user?.createdAt ?? new Date()),
    },
    {
      title: latestLead ? "Ultimo envio registrado" : "Aguardando briefing",
      detail: latestLead
        ? latestLead.summary
        : "Quando voce enviar o briefing completo, ele aparecera aqui com o status da analise.",
      date: latestLead
        ? new Intl.DateTimeFormat("pt-BR").format(latestLead.createdAt)
        : "Sem envio",
    },
    {
      title: "Proximo passo",
      detail: "Nossa equipe entra em contato apos a triagem inicial do material enviado.",
      date: "Em ate 1 dia util",
    },
  ];

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <span>Area do cliente</span>
          <h1>
            Ola, {session.name}.{" "}
            {latestLead
              ? "Seu briefing ja entrou na fila de analise."
              : "Sua conta esta pronta para iniciar o briefing."}
          </h1>
          <p>
            Aqui o cliente ve progresso, proximos passos e o que ainda pode complementar,
            sem acesso a operacao interna.
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
          <strong>{latestLead ? statusLabels[latestLead.status] : "Conta criada"}</strong>
          <p>
            {latestLead
              ? "Seu material foi recebido e ja esta sendo avaliado pelo nosso time."
              : "Envie seu briefing completo para iniciar a analise comercial e tecnica."}
          </p>
        </article>
        <article className={styles.card}>
          <span>Contato principal</span>
          <strong>{session.email}</strong>
          <p>Usaremos este e-mail para retorno, alinhamentos e envio da proposta.</p>
        </article>
        <article className={styles.card}>
          <span>Envios registrados</span>
          <strong>{leadsCount}</strong>
          <p>Quantidade total de registros de captacao e briefing associados a sua empresa.</p>
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
