"use client";

import { useState } from "react";
import styles from "./MultiStepForm.module.css";
import { toNum } from "@/lib/oferta";

const SHEET_URL =
  process.env.NEXT_PUBLIC_SHEET_URL ??
  "https://script.google.com/macros/s/AKfycbw6btcMsIvFgz0-gCT6Nlh7qExBg3E41FItxfSKqWshN4Fp21Fmg5kLyVo2n9N05C7ueg/exec";
const LANDING_ID = "4-Confianza";
const AUTO_ADVANCE_DELAY = 500;

const questions = [
  {
    id: "q1",
    type: "options" as const,
    label: "¿Cómo financias tu propiedad actual?",
    options: [
      "Crédito Infonavit",
      "Crédito bancario u otra institución",
      "Ya está totalmente pagada",
    ],
  },
  {
    id: "q2",
    type: "options" as const,
    label: "¿Cuál es la situación de la propiedad que quieres vender?",
    options: [
      "Vivimos en ella actualmente",
      "Está rentada a terceros",
      "Está deshabitada",
    ],
  },
  {
    id: "q3",
    type: "options" as const,
    label: "¿Qué pasos has dado para tu próxima mudanza?",
    options: [
      "Ya di anticipo o firmé contrato",
      "Tengo casa decidida pero no apartada",
      "Apenas empiezo a ver opciones",
      "Aún no empiezo a buscar",
    ],
  },
  {
    id: "q4",
    type: "currency" as const,
    label: "¿A cuánto asciende el saldo que debes de tu hipoteca al día de hoy?",
    placeholder: "Ej. 850,000",
  },
];

function formatCurrency(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("es-MX");
}

export default function MultiStepForm({ uuid, version }: { uuid?: string; version?: string }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const isLastStep = step === questions.length;
  const currentQ = questions[step - 1];
  const currentAnswer = answers[currentQ.id] ?? "";

  function selectOption(value: string) {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: value }));
    if (!isLastStep) {
      setTimeout(() => setStep((s) => s + 1), AUTO_ADVANCE_DELAY);
    }
  }

  function handleCurrencyChange(raw: string) {
    const formatted = formatCurrency(raw);
    setAnswers((prev) => ({ ...prev, [currentQ.id]: formatted }));
  }

  async function handleSubmit() {
    let askPriceRounded: number | "" = "";
    if (uuid) {
      try {
        const res = await fetch(`/api/lead/${uuid}`);
        if (res.ok) {
          const data = await res.json();
          const val = toNum(data?.properties?.ask_price_comite_mx_hesh);
          if (val !== null) askPriceRounded = Math.ceil(val);
        }
      } catch {}
    }

    const payload = {
      logType: "encuesta",
      landing: LANDING_ID,
      q1: answers.q1 ?? "",
      q2: answers.q2 ?? "",
      q3: answers.q3 ?? "",
      q4: answers.q4 ? answers.q4.replace(/[^\d]/g, "") : "",
      uuid: uuid ?? "",
      version: version ?? "",
      userAgent: navigator.userAgent,
      ask_price_comite_mx_hesh: askPriceRounded,
    };

    console.log(`Respuestas ${LANDING_ID}:`, payload);

    if (SHEET_URL) {
      try {
        await fetch(SHEET_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.warn("Error enviando datos:", err);
      }
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className={styles.thankYou}>
        <div className={styles.thankIcon}>🤝</div>
        <h2>¡Gracias por confiar en nosotros!</h2>
        <p>
          Un asesor se pondrá en contacto contigo en las próximas horas para
          darte una asesoría personalizada, sin compromiso.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.formBody}>
      <div className={styles.progressBar}>
        {questions.map((_, i) => (
          <div
            key={i}
            className={`${styles.seg} ${i < step ? styles.active : ""}`}
          />
        ))}
      </div>

      <div className={styles.question}>
        <label>{currentQ.label}</label>

        {currentQ.type === "options" && (
          <div className={styles.options}>
            {currentQ.options.map((opt) => (
              <button
                key={opt}
                className={`${styles.option} ${currentAnswer === opt ? styles.selected : ""}`}
                onClick={() => selectOption(opt)}
              >
                <span className={styles.radio} />
                {opt}
              </button>
            ))}
          </div>
        )}

        {currentQ.type === "currency" && (
          <div className={styles.inputCurrencyContainer}>
            <span className={styles.currencySymbol}>$</span>
            <input
              id="hipotecaInput"
              type="text"
              inputMode="numeric"
              className={styles.currencyInput}
              placeholder={currentQ.placeholder}
              value={currentAnswer}
              onChange={(e) => handleCurrencyChange(e.target.value)}
            />
            <span className={styles.currencyBadge}>MXN</span>
          </div>
        )}
      </div>

      <div className={styles.formActions}>
        {step > 1 && (
          <button
            className={styles.btnBack}
            onClick={() => setStep((s) => s - 1)}
          >
            ← Atrás
          </button>
        )}
        {isLastStep && (
          <button
            className={styles.btnNext}
            disabled={!currentAnswer}
            onClick={handleSubmit}
          >
            Enviar
          </button>
        )}
      </div>
    </div>
  );
}
