import Carousel from "@/components/Carousel";
import { IHeroData } from "@/interfaces/heroes";

interface IProps {
  params: {
    slug: string;
  };
}

async function getData(): Promise<{ data: IHeroData[] }> {
  const res = await fetch("http://localhost:3000/api/heroes");

  if (!res.ok) {
    throw new Error("Falha ao buscar heróis");
  }

  return res.json();
}

export default async function Hero({ params: { slug } }: IProps) {
  const res = await getData();
  const activeHero = res.data.find((hero) => hero.id === slug);

  if (!activeHero) {
    return null;
  }

  return <Carousel heroes={res.data} activeId={activeHero.id} />;
}
