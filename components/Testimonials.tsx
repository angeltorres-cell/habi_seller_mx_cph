import styles from "./Testimonials.module.css";

const testimonials = [
  {
    avatar: "👩",
    name: "María González",
    loc: "Vendió su departamento en CDMX",
    quote:
      '"El proceso con TuHabi fue muy transparente. Me dieron una oferta justa y todo se resolvió rápido, sin complicaciones."',
  },
  {
    avatar: "👨",
    name: "Roberto Hernández",
    loc: "Vendió su casa en Guadalajara",
    quote:
      '"TuHabi me acompañó en todo el proceso. Fue sencillo y recibí mi dinero sin contratiempos."',
  },
  {
    avatar: "👩",
    name: "Ana Martínez",
    loc: "Vendió su propiedad en Monterrey",
    quote:
      '"Excelente experiencia con TuHabi. Me explicaron cada paso y cumplieron con todo lo acordado."',
  },
];

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <h2>
        Procesos efectivos, <strong>pagos seguros</strong>
      </h2>
      <p className={styles.sub}>
        En TuHabi, preferimos que nuestros clientes hablen por nosotros.
        ¡Gracias por su confianza!
      </p>
      <div className={styles.grid}>
        {testimonials.map((t) => (
          <div key={t.name} className={styles.card}>
            <div className={styles.avatar}>{t.avatar}</div>
            <div className={styles.name}>{t.name}</div>
            <div className={styles.loc}>{t.loc}</div>
            <div className={styles.quote}>{t.quote}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
