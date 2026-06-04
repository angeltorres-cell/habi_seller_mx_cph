"use client";

import { useState } from "react";
import styles from "./MultiStepForm.module.css";

const SHEET_URL = process.env.NEXT_PUBLIC_SHEET_URL ?? "";
const LANDING_ID = "4-Confianza";
const AUTO_ADVANCE_DELAY = 500;

const questions = [
  {
    id: "q1",
    label: "¿Cómo financias tu propiedad actual?",
    options: [
      "Crédito Infonavit",
      "Crédito bancario u otra institución",
      "Ya está totalmente pagada",
    ],
  },
  {
    id: "q2",
    label: "¿Cuál es la situación de la propiedad que quieres vender?",
    options: [
      "Vivimos en ella actualmente",
      "Está rentada a terceros",
      "Está deshabitada",
    ],
  },
  {
    id: "q3",
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
    label: "¿En qué etapa va el pago de tu crédito actual?",
    options: [
      "Falta más de la mitad (+50%)",
      "Falta menos de la mitad (-50%)",
      "Recta final (últimos pagos)",
    ],
  },
];

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const isLastStep = step === questions.length;
  const currentQ = questions[step - 1];
  const currentAnswer = answers[currentQ.id];

  function selectOption(value: string) {
    const newAnswers = { ...answers, [currentQ.id]: value };
    setAnswers(newAnswers);

    if (!isLastStep) {
      setTimeout(() => setStep((s) => s + 1), AUTO_ADVANCE_DELAY);
    }
  }

  async function handleSubmit() {
    const payload = {
      landing: LANDING_ID,
      q1: answers.q1 ?? "",
      q2: answers.q2 ?? "",
      q3: answers.q3 ?? "",
      q4: answers.q4 ?? "",
      userAgent: navigator.userAgent,
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
