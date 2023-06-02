import Heroes from "@/components/Heroes";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <Heroes />
    </main>
  );
}
