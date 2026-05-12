import { z } from "zod";

export const signupSchema = z.object({
  fullName: z.string().min(2, "Informe seu nome completo."),
  companyName: z.string().min(2, "Informe o nome da empresa."),
  email: z.string().email("Informe um e-mail valido."),
  phone: z.string().min(8, "Informe um telefone para contato."),
  password: z.string().min(6, "A senha precisa ter ao menos 6 caracteres."),
});

export type SignupInput = z.infer<typeof signupSchema>;
