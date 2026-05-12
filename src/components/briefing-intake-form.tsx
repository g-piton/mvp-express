"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  type BriefingIntakeInput,
  briefingIntakeSchema,
} from "@/modules/briefing/schemas/briefing-intake";

import styles from "./briefing-intake-form.module.css";

const budgetOptions = [
  "Ate US$ 10k",
  "US$ 10k a US$ 25k",
  "US$ 25k a US$ 50k",
  "Acima de US$ 50k",
];

const timelineOptions = [
  "Ate 30 dias",
  "30 a 60 dias",
  "60 a 90 dias",
  "Mais de 90 dias",
];

export function BriefingIntakeForm() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
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

  const onSubmit = async (data: BriefingIntakeInput) => {
    setServerMessage(null);

    const payload = new FormData();
    payload.set("companyName", data.companyName);
    payload.set("contactName", data.contactName);
    payload.set("email", data.email);
    payload.set("phone", data.phone);
    payload.set("role", data.role);
    payload.set("website", data.website ?? "");
    payload.set("segment", data.segment);
    payload.set("challenge", data.challenge);
    payload.set("goal", data.goal);
    payload.set("budget", data.budget);
    payload.set("timeline", data.timeline);
    payload.set("needsNda", String(data.needsNda));
    payload.set("consent", String(data.consent));

    const fileInput = document.querySelector<HTMLInputElement>('input[name="briefingFile"]');
    const file = fileInput?.files?.[0];

    if (file) {
      payload.set("briefingFile", file);
    }

    const response = await fetch("/api/briefing", {
      method: "POST",
      body: payload,
    });

    const body = (await response.json()) as { error?: string };

    if (!response.ok) {
      setServerMessage(body.error ?? "Nao foi possivel enviar o briefing.");
      return;
    }

    reset();
    setServerMessage("Briefing enviado com sucesso. Nossa equipe vai analisar o material e retornar com os proximos passos.");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.grid}>
        <Field error={errors.companyName?.message} label="Empresa">
          <input placeholder="Ex.: NovaPay Labs" {...register("companyName")} />
        </Field>
        <Field error={errors.contactName?.message} label="Contato principal">
          <input placeholder="Seu nome completo" {...register("contactName")} />
        </Field>
        <Field error={errors.email?.message} label="E-mail">
          <input placeholder="voce@empresa.com" {...register("email")} />
        </Field>
        <Field error={errors.phone?.message} label="Telefone / WhatsApp">
          <input placeholder="+1 555 000 0000" {...register("phone")} />
        </Field>
        <Field error={errors.role?.message} label="Cargo">
          <input placeholder="Founder, PM, CTO..." {...register("role")} />
        </Field>
        <Field label="Website">
          <input placeholder="https://empresa.com" {...register("website")} />
        </Field>
        <Field error={errors.segment?.message} label="Segmento">
          <input placeholder="Fintech, HealthTech..." {...register("segment")} />
        </Field>
        <Field error={errors.budget?.message} label="Faixa de investimento">
          <select defaultValue="" {...register("budget")}>
            <option disabled value="">
              Selecione
            </option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
        <Field error={errors.timeline?.message} label="Prazo esperado">
          <select defaultValue="" {...register("timeline")}>
            <option disabled value="">
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
        error={errors.challenge?.message}
        label="Qual problema ou oportunidade esse MVP precisa validar?"
      >
        <textarea
          placeholder="Conte o contexto, quem e o usuario, o que ja foi tentado e onde esta o gargalo."
          rows={5}
          {...register("challenge")}
        />
      </Field>

      <Field error={errors.goal?.message} label="O que voces esperam como resultado do MVP?">
        <textarea
          placeholder="Explique quais hipoteses precisam ser testadas, principais fluxos e indicador de sucesso."
          rows={5}
          {...register("goal")}
        />
      </Field>

      <Field label="Anexo principal">
        <label className={styles.upload}>
          <input name="briefingFile" type="file" />
          <span>Arraste o briefing ou clique para anexar</span>
          <small>PDF, DOCX ou PPTX ate 20 MB. Nesta versao gravamos os metadados para evoluir o storage na proxima etapa.</small>
        </label>
      </Field>

      <div className={styles.checks}>
        <label className={styles.checkbox}>
          <input type="checkbox" {...register("needsNda")} />
          <span>Precisamos de NDA antes do discovery</span>
        </label>
        <label className={styles.checkbox}>
          <input type="checkbox" {...register("consent")} />
          <span>Autorizo o contato da equipe para analise e proposta comercial</span>
        </label>
        {errors.consent?.message ? (
          <p className={styles.errorInline}>{errors.consent.message}</p>
        ) : null}
      </div>

      <div className={styles.footer}>
        <p>
          Leva cerca de 7 minutos. Quanto mais contexto voce enviar, mais precisa sera a nossa analise.
        </p>
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Enviando..." : "Enviar para analise"}
        </button>
      </div>

      {serverMessage ? <div className={styles.success}>{serverMessage}</div> : null}
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
