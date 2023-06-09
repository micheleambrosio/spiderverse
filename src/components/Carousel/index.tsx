"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";

import HeroDetails from "../HeroDetails";

import styles from "./carousel.module.scss";

import { IHeroData } from "@/interfaces/heroes";
import HeroPicture from "@/components/HeroPicture";

enum enPosition {
  FRONT = "front",
  MIDDLE = "middle",
  BACK = "back",
}

interface IProps {
  heroes: IHeroData[];
  activeId: string;
}

export default function Carousel({ heroes, activeId }: IProps) {
  // som de transição
  const transitionAudio = useMemo(() => new Audio("/songs/transition.mp3"), []);

  // voz de cada personagem
  const voicesAudio: Record<string, HTMLAudioElement> = useMemo(
    () => ({
      "spider-man-616": new Audio("/songs/spider-man-616.mp3"),
      "mulher-aranha-65": new Audio("/songs/mulher-aranha-65.mp3"),
      "spider-man-1610": new Audio("/songs/spider-man-1610.mp3"),
      "sp-dr-14512": new Audio("/songs/sp-dr-14512.mp3"),
      "spider-ham-8311": new Audio("/songs/spider-ham-8311.mp3"),
      "spider-man-90214": new Audio("/songs/spider-man-90214.mp3"),
      "spider-man-928": new Audio("/songs/spider-man-928.mp3"),
    }),
    []
  );

  // state: item ativo do carrossel
  const [activeIndex, setActiveIndex] = useState(
    heroes.findIndex((hero) => hero.id === activeId) - 1
  );

  // state: posição inicial no evento onDragStart
  const [startDragPosition, setStartDragPosition] = useState<number | null>(
    null
  );

  // itens que serão mostrados ao longo do carrossel
  const items = [...heroes];

  // calcula o índice do array de acordo com o item ativo
  // de forma que o número nunca saia do escopo do array
  const indexInArrayScope =
    ((activeIndex % items.length) + items.length) % items.length;

  // itens que estão visíveis neste momento para o usuário
  // duplicamos o array para dar a impressão de um carrossel infinito (360deg)
  const visibleItems = [...items, ...items].slice(
    indexInArrayScope,
    indexInArrayScope + 3
  );

  // useEffect: alterar a imagem de fundo para cada herói
  useEffect(() => {
    const htmlEl = document.querySelector("html");

    if (!htmlEl) {
      return;
    }

    const currentHeroId = visibleItems[1].id;
    htmlEl.classList.add("hero-page");
    htmlEl.style.background = `url("/spiders/${currentHeroId}-background.png")`;

    return () => {
      htmlEl.classList.remove("hero-page");
    };
  }, [visibleItems]);

  // useEffect: reproduzir voz do personagem do meio
  useEffect(() => {
    transitionAudio.play();
    const voiceAudio = voicesAudio[visibleItems[1].id];

    if (voiceAudio) {
      voiceAudio.volume = 0.5;
      voiceAudio?.play();
    }
  }, [visibleItems, transitionAudio, voicesAudio]);

  // onClick: altera herói ativo no carrossel
  const handleClick = (newDirection: number) => {
    setActiveIndex((prevActiveIndex) => prevActiveIndex + newDirection);
  };

  // onDragStart (mouse): armazena a posição inicial da interação
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setStartDragPosition(e.clientX);
  };

  // onTouchStart (touch): armazena a posição inicial da interação
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartDragPosition(e.touches[0].clientX);
  };

  // onDragEnd (mouse): armazena a posição final da interação
  // mexe o carrossel na direção que o usuário fez o evento de interação
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    if (!startDragPosition) {
      return null;
    }

    const endDragPosition = e.clientX;
    const diffPosition = endDragPosition - startDragPosition;

    const newPosition = diffPosition > 0 ? -1 : 1;
    handleClick(newPosition);
  };

  // onDragEnd (touch): armazena a posição final da interação
  // mexe o carrossel na direção que o usuário fez o evento de interação
  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!startDragPosition) {
      return null;
    }

    const endDragPosition = e.changedTouches[0].clientX;
    const diffPosition = endDragPosition - startDragPosition;

    const newPosition = diffPosition > 0 ? -1 : 1;
    handleClick(newPosition);
  };

  // mapeia a posição do item/herói no carrossel
  const getPosition = (item: IHeroData) => {
    if (item.id === visibleItems[0].id) {
      return enPosition.FRONT;
    }

    if (item.id === visibleItems[1].id) {
      return enPosition.MIDDLE;
    }

    return enPosition.BACK;
  };

  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
        <div
          className={styles.wrapper}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item) => (
              <motion.div
                className={styles.hero}
                key={item.id}
                transition={{ duration: 0.8 }}
                initial={{
                  x: -1500,
                  scale: 0.75,
                }}
                animate={{
                  x: 0,
                  ...getItemStyles(getPosition(item)),
                }}
                exit={{
                  x: 0,
                  left: "-20%",
                  opacity: 0,
                  scale: 1,
                }}
              >
                <HeroPicture hero={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        className={styles.details}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
      >
        <HeroDetails data={visibleItems[1]} />
      </motion.div>
    </div>
  );
}

// estilos para o item que está visível na animação
// dependendo da posição do herói no carrossel
const getItemStyles = (position: string) => {
  if (position === enPosition.FRONT) {
    return {
      filter: "blur(10px)",
      scale: 1.2,
      zIndex: 3,
    };
  }

  if (position === enPosition.MIDDLE) {
    return {
      left: 300,
      scale: 0.8,
      top: "-10%",
      zIndex: 2,
    };
  }

  return {
    filter: "blur(10px)",
    left: 160,
    opacity: 0.8,
    scale: 0.6,
    top: "-20%",
    zIndex: 1,
  };
};
