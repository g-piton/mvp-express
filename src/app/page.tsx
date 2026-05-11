import Link from "next/link";

import { QuickIntakeForm } from "@/components/quick-intake-form";
import { redirectIfAuthenticated } from "@/modules/auth/session";

import styles from "./page.module.css";

const navItems = [
  { href: "#inicio", label: "Inicio" },
  { href: "#solucoes", label: "Solucoes" },
  { href: "#como-funciona", label: "Como funciona" },
];

const benefits = [
  "Recebemos desde um cadastro basico ate um briefing completo, sem travar o inicio da conversa.",
  "Organizamos melhor a avaliacao para chegar no primeiro contato com muito mais clareza de cenario.",
  "Damos mais previsibilidade para transformar uma ideia em proposta, escopo inicial e proximos passos.",
];

const processSteps = [
  {
    title: "1. Cadastro rapido",
    description:
      "A empresa informa os dados principais do negocio e do responsavel para iniciar o atendimento.",
  },
  {
    title: "2. Material completo",
    description:
      "Quem quiser pode complementar com um briefing mais robusto para chegarmos na primeira conversa com mais contexto.",
  },
  {
    title: "3. Analise e contato",
    description:
      "A 4DevBrasil revisa a oportunidade e retorna com alinhamento, proximos passos e proposta.",
  },
];

const solutions = [
  {
    title: "Cadastrar empresa com dados basicos",
    description:
      "Ideal para quem quer um contato rapido e prefere detalhar a necessidade na conversa com nosso time.",
    cta: "Entrada simples e sem friccao",
  },
  {
    title: "Criar conta e enviar material completo",
    description:
      "Ideal para quem ja tem documentos, premissas e quer receber uma primeira abordagem com mais profundidade.",
    cta: "Conta rapida para liberar o briefing",
  },
];

const trustPillars = [
  "Visao clara para o cliente",
  "Triagem mais preparada para o operador",
  "Primeira abordagem com mais contexto",
];

export default async function Home() {
  await redirectIfAuthenticated();

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <Link className={styles.brand} href="#inicio">
          <span className={styles.brandMark}>4D</span>
          <span className={styles.brandText}>
            <strong>4DevBrasil</strong>
            <small>Produtos digitais com mais clareza desde a entrada</small>
          </span>
        </Link>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.topbarActions}>
          <Link className={styles.linkAction} href="/criar-conta">
            Criar conta
          </Link>
          <Link className={styles.primaryMiniAction} href="/entrar">
            Entrar
          </Link>
        </div>
      </header>

      <section className={styles.hero} id="inicio">
        <div className={styles.heroContent}>
          <div className={styles.kicker}>4DevBrasil</div>
          <h1>Construir um novo produto nao precisa comecar no escuro.</h1>
          <p className={styles.heroCopy}>
            A 4DevBrasil ajuda sua empresa a sair da intencao para uma avaliacao mais
            objetiva do produto. Voce pode iniciar com um cadastro basico e deixar nosso
            time conduzir o primeiro contato, ou compartilhar um material mais completo para
            que a conversa comece com contexto, viabilidade e direcao.
          </p>
          <ul className={styles.highlightList}>
            {benefits.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>

        <aside className={styles.heroPanel}>
          <div className={styles.panelGlow} />
          <div className={styles.heroStatement}>
            <span>Entrada mais inteligente</span>
            <strong>Comece simples quando ainda estiver estruturando a ideia. Aprofunde quando ja quiser acelerar a proposta.</strong>
            <p>
              O fluxo foi desenhado para respeitar o momento da empresa: menos friccao para
              iniciar, mais profundidade quando o contexto estiver pronto.
            </p>
          </div>
          <div className={styles.heroSideGrid}>
            <article className={styles.sideCard}>
              <h3>Cadastro basico</h3>
              <p>Para empresas que querem apenas deixar os dados principais e receber contato rapido.</p>
            </article>
            <article className={styles.sideCard}>
              <h3>Briefing completo</h3>
              <p>Para quem ja quer entrar com material, premissas e uma primeira abordagem mais preparada.</p>
            </article>
          </div>
        </aside>
      </section>

      <section className={styles.section} id="solucoes">
        <div className={styles.sectionHeading}>
          <span>Duas entradas</span>
          <h2>A empresa escolhe o nivel de profundidade ideal para iniciar a conversa.</h2>
        </div>
        <div className={styles.solutionGrid}>
          {solutions.map((solution) => (
            <article className={styles.solutionCard} key={solution.title}>
              <h3>{solution.title}</h3>
              <p>{solution.description}</p>
              <span>{solution.cta}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="cadastro-rapido">
        <div className={styles.sectionHeading}>
          <span>Cadastro rapido</span>
          <h2>Se quiser apenas deixar os dados basicos da empresa, fazemos o restante no primeiro contato.</h2>
        </div>
        <div className={styles.formPanel}>
          <QuickIntakeForm />
        </div>
      </section>

      <section className={styles.section} id="briefing-completo">
        <div className={styles.sectionHeading}>
          <span>Briefing completo</span>
          <h2>Para enviar um material mais completo, pedimos antes um cadastro rapido com os dados basicos.</h2>
        </div>
        <div className={styles.calloutPanel}>
          <div>
            <h3>Conta rapida para liberar o envio</h3>
            <p>
              Essa etapa protege os dados, organiza o atendimento e garante que nossa equipe
              faca a analise do briefing com o contato certo e com contexto desde o inicio.
            </p>
          </div>
          <div className={styles.calloutActions}>
            <Link className={styles.primaryAction} href="/criar-conta">
              Criar conta
            </Link>
            <Link className={styles.secondaryAction} href="/entrar">
              Entrar para enviar briefing
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.section} id="como-funciona">
        <div className={styles.sectionHeading}>
          <span>Como funciona</span>
          <h2>Um fluxo direto para transformar interesse em uma conversa mais objetiva sobre o produto.</h2>
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
          <span>Resultado esperado</span>
          <h2>Mais clareza para o cliente e mais contexto para a operacao desde a primeira entrada.</h2>
        </div>
        <div className={styles.roleGrid}>
          {trustPillars.map((item) => (
            <div className={styles.roleChip} key={item}>
              {item}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
