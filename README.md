# MVP Express

Plataforma para captar clientes interessados em construir um MVP, receber briefing estruturado e separar a experiência entre `cliente` e `operador`.

## Stack

- Next.js 16
- React 19
- TypeScript
- Prisma 7
- PostgreSQL
- React Hook Form
- Zod

## Fluxos atuais

- Landing com proposta comercial e login por perfil
- Área do cliente com visão de briefing e status
- Área do operador com visão interna do pipeline
- Sessão básica com cookie HTTP-only
- Modelo inicial de dados com Prisma

## Acessos de demonstração

- Cliente: `cliente@demo.com` / `demo123`
- Operador: `operador@demo.com` / `demo123`

## Rodando o projeto

1. Instale as dependências:

```bash
npm install
```

2. Configure o ambiente:

```bash
copy .env.example .env
```

3. Inicie o ambiente local:

```bash
npm run dev
```

Abra `http://localhost:3000`.

## Prisma

- Gerar client: `npm run prisma:generate`
- Formatar schema: `npm run prisma:format`

O projeto usa `prisma.config.ts` com fallback local para facilitar o setup inicial.
