import { LogoutButton } from "@/components/logout-button";
import { requireRole } from "@/modules/auth/session";
import { getDashboardData } from "@/modules/leads/server";

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

const priorityLabels: Record<string, string> = {
  LOW: "Baixa",
  MEDIUM: "Media",
  HIGH: "Alta",
  URGENT: "Urgente",
};

export default async function DashboardPage() {
  const session = await requireRole("operator");
  const { summary, leads } = await getDashboardData();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <span>Backoffice interno</span>
          <h1>Triagem de leads, priorizacao e gestao comercial em um so fluxo.</h1>
        </div>
        <div className={styles.headerMeta}>
          <strong>{session.name}</strong>
          <p>{session.email} · Operador com visao interna de pipeline e proposta.</p>
          <LogoutButton />
        </div>
      </header>

      <section className={styles.summaryGrid}>
        {summary.map((item) => (
          <article className={styles.summaryCard} key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </section>

      <section className={styles.board}>
        <div className={styles.boardHeader}>
          <div>
            <h2>Fila de oportunidades</h2>
            <p>Leads reais captados pela plataforma, ordenados pelas atualizacoes mais recentes.</p>
          </div>
          <div className={styles.filters}>
            <span>Status: Todos</span>
            <span>Responsavel: Qualquer</span>
            <span>Prioridade: Todas</span>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Empresa</th>
                <th>Contato</th>
                <th>Segmento</th>
                <th>Status</th>
                <th>Prioridade</th>
                <th>Responsavel</th>
                <th>Atualizacao</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.id.slice(0, 8).toUpperCase()}</td>
                  <td>{lead.company.tradeName ?? lead.company.legalName}</td>
                  <td>{lead.primaryContact.name}</td>
                  <td>{lead.company.segment ?? "-"}</td>
                  <td>
                    <span className={styles.status}>{statusLabels[lead.status]}</span>
                  </td>
                  <td>{priorityLabels[lead.priority]}</td>
                  <td>{lead.assignedTo?.name ?? "Nao atribuido"}</td>
                  <td>{new Intl.DateTimeFormat("pt-BR").format(lead.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
