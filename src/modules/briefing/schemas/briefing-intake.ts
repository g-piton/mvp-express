import { z } from "zod";

export const briefingIntakeSchema = z.object({
  companyName: z.string().min(2, "Informe o nome da empresa."),
  contactName: z.string().min(2, "Informe o nome do contato."),
  email: z.string().email("Informe um e-mail válido."),
  phone: z.string().min(8, "Informe um telefone para contato."),
  role: z.string().min(2, "Informe seu cargo."),
  website: z.string().optional(),
  segment: z.string().min(2, "Informe o segmento da empresa."),
  challenge: z.string().min(20, "Descreva melhor o problema ou oportunidade."),
  goal: z.string().min(20, "Explique o objetivo do MVP."),
  budget: z.string().min(2, "Selecione uma faixa de investimento."),
  timeline: z.string().min(2, "Selecione uma expectativa de prazo."),
  needsNda: z.boolean(),
  consent: z.boolean().refine((value) => value, {
    message: "Você precisa autorizar o contato para prosseguir.",
  }),
});

export type BriefingIntakeInput = z.infer<typeof briefingIntakeSchema>;
