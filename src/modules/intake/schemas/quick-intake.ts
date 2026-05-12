import { z } from "zod";

export const quickIntakeSchema = z.object({
  companyName: z.string().min(2, "Informe o nome da empresa."),
  contactName: z.string().min(2, "Informe seu nome."),
  email: z.string().email("Informe um e-mail valido."),
  phone: z.string().min(8, "Informe um telefone para contato."),
});

export type QuickIntakeInput = z.infer<typeof quickIntakeSchema>;
