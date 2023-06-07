"use client";
import Carousel from "@/components/Carousel";
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

  return <Carousel heroes={res.data} />;
}
