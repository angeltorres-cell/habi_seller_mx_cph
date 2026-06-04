import styles from "./FormSection.module.css";
import MultiStepForm from "./MultiStepForm";

export default function FormSection() {
  return (
    <section className={styles.section} id="formulario">
      <div className={styles.wrap}>
        <div className={styles.header}>
          <h2>Cuéntanos tu situación</h2>
          <p>Así podemos prepararte una asesoría a tu medida</p>
        </div>
        <MultiStepForm />
      </div>
    </section>
  );
}
