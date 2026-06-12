import styles from "./FormSection.module.css";
import MultiStepForm from "./MultiStepForm";

export default function FormSection({ uuid, version }: { uuid?: string; version?: string }) {
  return (
    <section className={styles.section} id="formulario">
      <div className={styles.wrap}>
        <div className={styles.header}>
          <h2>Cuéntanos tu situación</h2>
          <p>Así podemos prepararte una asesoría a tu medida</p>
        </div>
        <MultiStepForm uuid={uuid} version={version} />
      </div>
    </section>
  );
}
