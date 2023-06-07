import Carousel from "@/components/Carousel";
import HeroDetails from "@/components/HeroDetails";
import { IHeroData } from "@/interfaces/heroes";
import styles from "./page.module.scss";

async function getData(): Promise<{ data: IHeroData[] }> {
  const res = await fetch("http://localhost:3000/api/heroes");

  if (!res.ok) {
    throw new Error("Falha ao buscar heróis");
  }

  return res.json();
}

export default async function Hero() {
  const res = await getData();

  return (
    <div className={styles.container}>
      <Carousel heroes={res.data} />
      <HeroDetails />
    </div>
  );
}
