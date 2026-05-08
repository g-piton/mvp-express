"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  type BriefingIntakeInput,
  briefingIntakeSchema,
} from "@/modules/briefing/schemas/briefing-intake";

import styles from "./briefing-intake-form.module.css";

const budgetOptions = [
  "Até US$ 10k",
  "US$ 10k a US$ 25k",
  "US$ 25k a US$ 50k",
  "Acima de US$ 50k",
];

const timelineOptions = [
  "Até 30 dias",
  "30 a 60 dias",
  "60 a 90 dias",
  "Mais de 90 dias",
];

export function BriefingIntakeForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<BriefingIntakeInput>({
    resolver: zodResolver(briefingIntakeSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      role: "",
      website: "",
      segment: "",
      challenge: "",
      goal: "",
      budget: "",
      timeline: "",
      needsNda: false,
      consent: false,
    },
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.grid}>
        <Field label="Empresa" error={errors.companyName?.message}>
          <input placeholder="Ex.: NovaPay Labs" {...register("companyName")} />
        </Field>
        <Field label="Contato principal" error={errors.contactName?.message}>
          <input placeholder="Seu nome completo" {...register("contactName")} />
        </Field>
        <Field label="E-mail" error={errors.email?.message}>
          <input placeholder="voce@empresa.com" {...register("email")} />
        </Field>
        <Field label="Telefone / WhatsApp" error={errors.phone?.message}>
          <input placeholder="+1 555 000 0000" {...register("phone")} />
        </Field>
        <Field label="Cargo" error={errors.role?.message}>
          <input placeholder="Founder, PM, CTO..." {...register("role")} />
        </Field>
        <Field label="Website">
          <input placeholder="https://empresa.com" {...register("website")} />
        </Field>
        <Field label="Segmento" error={errors.segment?.message}>
          <input placeholder="Fintech, HealthTech..." {...register("segment")} />
        </Field>
        <Field label="Faixa de investimento" error={errors.budget?.message}>
          <select defaultValue="" {...register("budget")}>
            <option value="" disabled>
              Selecione
            </option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Prazo esperado" error={errors.timeline?.message}>
          <select defaultValue="" {...register("timeline")}>
            <option value="" disabled>
              Selecione
            </option>
            {timelineOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="Qual problema ou oportunidade esse MVP precisa validar?"
        error={errors.challenge?.message}
      >
        <textarea
          rows={5}
          placeholder="Conte o contexto, quem é o usuário, o que já foi tentado e onde está o gargalo."
          {...register("challenge")}
        />
      </Field>

      <Field label="O que vocês esperam como resultado do MVP?" error={errors.goal?.message}>
        <textarea
          rows={5}
          placeholder="Explique quais hipóteses precisam ser testadas, principais fluxos e indicador de sucesso."
          {...register("goal")}
        />
      </Field>

      <Field label="Anexo principal">
        <label className={styles.upload}>
          <input type="file" />
          <span>Arraste o briefing ou clique para anexar</span>
          <small>PDF, DOCX ou PPTX até 20 MB. Na V1 o upload será integrado ao storage privado.</small>
        </label>
      </Field>

      <div className={styles.checks}>
        <label className={styles.checkbox}>
          <input type="checkbox" {...register("needsNda")} />
          <span>Precisamos de NDA antes do discovery</span>
        </label>
        <label className={styles.checkbox}>
          <input type="checkbox" {...register("consent")} />
          <span>Autorizo o contato da equipe para análise e proposta comercial</span>
        </label>
        {errors.consent?.message ? (
          <p className={styles.errorInline}>{errors.consent.message}</p>
        ) : null}
      </div>

      <div className={styles.footer}>
        <p>
          Leva cerca de 7 minutos. Quanto mais contexto você enviar, mais precisa será
          a nossa análise.
        </p>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar para análise"}
        </button>
      </div>

      {isSubmitSuccessful ? (
        <div className={styles.success}>
          Briefing validado com sucesso. O próximo passo é ligar este formulário a uma
          Server Action + upload seguro no bucket privado.
        </div>
      ) : null}
    </form>
  );
}

type FieldProps = {
  children: React.ReactNode;
  error?: string;
  label: string;
};

function Field({ children, error, label }: FieldProps) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      {children}
      {error ? <small>{error}</small> : null}
    </label>
  );
}
