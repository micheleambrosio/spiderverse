import Heroes from "@/components/Heroes";
import { spidermanFont } from "@/fonts";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={`${spidermanFont.className} ${styles.title}`}>
        Personagens
      </h1>
      <Heroes />
    </main>
  );
}
