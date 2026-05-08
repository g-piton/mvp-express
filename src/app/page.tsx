import Link from "next/link";
import { redirectIfAuthenticated } from "@/modules/auth/session";
import { LoginForm } from "@/components/login-form";

import styles from "./page.module.css";

const processSteps = [
  {
    title: "1. Contexto estruturado",
    description:
      "O cliente envia empresa, contato e o material mais completo possível sobre o MVP.",
  },
  {
    title: "2. Triagem operacional",
    description:
      "Nosso time analisa aderência, maturidade da ideia, urgência e informações faltantes.",
  },
  {
    title: "3. Proposta orientada a valor",
    description:
      "A oportunidade sai com responsável, recomendação e base para proposta comercial rápida.",
  },
];

const highlights = [
  "Fluxo público de captação com briefing e upload",
  "Backoffice interno para triagem, prioridade e proposta",
  "Arquitetura monolítica enxuta para lançar com baixo custo",
];

const teamRoles = [
  "PM",
  "PO",
  "SM",
  "Arquiteto de Soluções",
  "Arquiteto de Software",
  "DevOps",
  "UX/UI",
  "QA",
  "Devs",
];

export default async function Home() {
  await redirectIfAuthenticated();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.kicker}>Signal Ops for MVP Delivery</div>
          <h1>Capte projetos de MVP com mais contexto, mais velocidade e menos ruído.</h1>
          <p className={styles.heroCopy}>
            Uma plataforma para receber briefings completos, organizar a análise interna e
            acelerar a proposta comercial do seu time.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primaryAction} href="#acesso">
              Entrar e começar
            </Link>
            <Link className={styles.secondaryAction} href="#como-funciona">
              Ver como funciona
            </Link>
          </div>
          <ul className={styles.highlightList}>
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>

        <aside className={styles.heroPanel} id="acesso">
          <div className={styles.panelGlow} />
          <div className={styles.loginHeading}>
            <span>Acesso inicial</span>
            <strong>Entradas separadas por perfil para proteger o que cada pessoa vê.</strong>
            <small>
              Cliente acompanha briefing e status. Operador acessa a fila interna e a análise comercial.
            </small>
          </div>
          <LoginForm />
        </aside>
      </section>

      <section className={styles.section} id="como-funciona">
        <div className={styles.sectionHeading}>
          <span>Como funciona</span>
          <h2>O produto nasce para validar o funil ponta a ponta na V1.</h2>
        </div>
        <div className={styles.cardGrid}>
          {processSteps.map((step) => (
            <article className={styles.card} key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <span>Times e papéis</span>
          <h2>Agentes com responsabilidade clara desde produto até entrega.</h2>
        </div>
        <div className={styles.roleGrid}>
          {teamRoles.map((role) => (
            <div className={styles.roleChip} key={role}>
              {role}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <span>Arquitetura inicial</span>
          <h2>Monólito modular em Next.js + React + Postgres para lançar com baixo custo.</h2>
        </div>
        <div className={styles.archGrid}>
          <article className={styles.archCard}>
            <h3>Camadas</h3>
            <p>UI, Application, Domain e Infrastructure separadas por módulos.</p>
          </article>
          <article className={styles.archCard}>
            <h3>Módulos</h3>
            <p>Captação, Briefings, Leads, Dashboard, Auth, Users e Auditoria.</p>
          </article>
          <article className={styles.archCard}>
            <h3>Stack</h3>
            <p>Next.js 16, React 19, Prisma, Postgres, Zod e React Hook Form.</p>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <span>Experiências distintas</span>
          <h2>O mesmo produto, mas com visão certa para cliente e operação.</h2>
        </div>
        <div className={styles.cardGrid}>
          <article className={styles.card}>
            <h3>Visão do cliente</h3>
            <p>
              Envio do briefing, acompanhamento do status da análise, próximos passos e
              checklist do que ainda precisa ser enviado.
            </p>
          </article>
          <article className={styles.card}>
            <h3>Visão do operador</h3>
            <p>
              Triagem, prioridade, responsável, leitura do briefing, notas internas e
              preparação da proposta.
            </p>
          </article>
          <article className={styles.card}>
            <h3>Segurança funcional</h3>
            <p>
              Cada perfil entra em uma área diferente e vê apenas o fluxo que precisa para
              avançar sem ruído.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
