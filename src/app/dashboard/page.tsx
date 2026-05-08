import { mockLeads } from "@/modules/dashboard/data/mock-leads";
import { requireRole } from "@/modules/auth/session";
import { LogoutButton } from "@/components/logout-button";

import styles from "./page.module.css";

const summary = [
  { label: "Recebidos hoje", value: "12" },
  { label: "Em análise", value: "28" },
  { label: "Prontos para proposta", value: "9" },
  { label: "SLA crítico", value: "3" },
];

export default async function DashboardPage() {
  const session = await requireRole("operator");

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <span>Backoffice interno</span>
          <h1>Triagem de leads, priorização e gestão comercial em um só fluxo.</h1>
        </div>
        <div className={styles.headerMeta}>
          <strong>{session.name}</strong>
          <p>{session.email} · Operador com visão interna de pipeline e proposta.</p>
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
            <p>Mock inicial para orientar a implementação da área autenticada.</p>
          </div>
          <div className={styles.filters}>
            <span>Status: Todos</span>
            <span>Responsável: Qualquer</span>
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
                <th>Responsável</th>
                <th>Atualização</th>
              </tr>
            </thead>
            <tbody>
              {mockLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.id}</td>
                  <td>{lead.company}</td>
                  <td>{lead.contact}</td>
                  <td>{lead.segment}</td>
                  <td>
                    <span className={styles.status}>{lead.status}</span>
                  </td>
                  <td>{lead.priority}</td>
                  <td>{lead.owner}</td>
                  <td>{lead.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
