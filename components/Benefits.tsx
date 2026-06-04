import styles from "./Benefits.module.css";

const items = [
  {
    icon: "💰",
    title: "Te olvidas del pago mensual de tu hipoteca",
    desc: "Desde el momento en que liquidamos tu crédito, dejas de pagar la mensualidad a Infonavit. Ese dinero se queda contigo.",
  },
  {
    icon: "🏡",
    title: "No necesitas mudarte a un lugar temporal",
    desc: "Mientras se reinicia tu puntaje, coordinamos todo para que vayas directo de tu casa actual a la nueva. Sin escalas.",
  },
  {
    icon: "📦",
    title: "Te ahorras el costo de una mudanza extra",
    desc: "Sin vivienda temporal, te ahorras una mudanza completa: empaque, transporte, depósitos y la carga emocional que implica.",
  },
];

export default function Benefits() {
  return (
    <section className={styles.section}>
      <div className={styles.wrap}>
        <h2>¿Qué ganas con este servicio?</h2>
        <p className={styles.sub}>
          Además de mudarte sin el bache de Infonavit, te ahorras lo que nadie
          te cuenta:
        </p>
        <div className={styles.grid}>
          {items.map((item) => (
            <div key={item.title} className={styles.card}>
              <div className={styles.icon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
