import styles from "./ComoFunciona.module.css";
import MeInteresaButton from "./MeInteresaButton";

const steps = [
  {
    num: "1. Nos encargamos de tu hipoteca",
    title: "Tú descansas, nosotros gestionamos",
    desc: "Liquidamos y cancelamos tu crédito actual para que no tengas que lidiar con trámites ni preocupaciones.",
  },
  {
    num: "2. Cuidamos tu patrimonio",
    title: "Tu dinero en buenas manos",
    desc: "Mientras Infonavit actualiza tu perfil (4 meses), resguardamos tu capital con total transparencia. Sabrás dónde está en todo momento.",
  },
  {
    num: "3. Coordinamos tu nueva compra",
    title: "Juntos hasta la entrega de llaves",
    desc: "Recibes los recursos directamente para destinarlos a tu siguiente casa. Te asesoramos en todo el proceso para que estrenes hogar sin complicaciones.",
  },
];

export default function ComoFunciona() {
  return (
    <section className={styles.section}>
      <h2>¿Cómo funciona?</h2>
      <p className={styles.subtitle}>
        En 3 simples pasos, te acompañamos de principio a fin:
      </p>
      <div className={styles.grid}>
        {steps.map((s) => (
          <div key={s.num} className={styles.card}>
            <div className={styles.stepNum}>{s.num}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
      <MeInteresaButton />
    </section>
  );
}
