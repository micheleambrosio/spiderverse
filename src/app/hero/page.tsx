"use client";

import HeroImage from "@/components/Hero";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";
import styles from "./page.module.scss";

interface IVariantsProps {
  direction: any;
  position: any;
}

const heroes = [
  "spider-man-616",
  "mulher-aranha-65",
  "spider-man-1610",
  "sp-dr-14512",
  "porco-aranha-8311",
  "spider-man-90214",
  "spider-man-928",
];

export default function Hero() {
  const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);

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

  // altera state de activeIndex (item à esquerda)
  // altera state de direction (direção do carrossel, direita +1 e esquerda -1)
  const handleClick = (newDirection: number) => {
    setActiveIndex((prevIndex) => [prevIndex[0] + newDirection, newDirection]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper} onClick={() => handleClick(1)}>
        <AnimatePresence mode="popLayout">
          {visibleItems.map((item) => (
            <motion.div
              className={styles.hero}
              key={item}
              layout
              variants={variants}
              initial="enter"
              animate="visibleItems"
              exit="exit"
              transition={{ duration: 1 }}
              custom={{
                direction,
                position: () => {
                  if (item === visibleItems[0]) {
                    return "left";
                  } else if (item === visibleItems[1]) {
                    return "center";
                  } else {
                    return "right";
                  }
                },
              }}
            >
              <HeroImage heroId={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

const variants: Variants = {
  enter: (params: IVariantsProps) => {
    return {
      x: -1500,
      scale: 0.75,
    };
  },
  visibleItems: (params: IVariantsProps) => {
    return {
      x: 0,
      ...getItemStyles(params?.position()),
    };
  },
  exit: (params: IVariantsProps) => {
    return {
      x: 0,
      left: "-20%",
      opacity: 0,
      scale: 1,
    };
  },
};

const getItemStyles = (position: string) => {
  if (position === "left") {
    return {
      scale: 1,
      zIndex: 3,
      filter: "blur(10px)",
    };
  }

  if (position === "center") {
    return {
      left: "-10%",
      scale: 0.8,
      zIndex: 2,
    };
  }

  // position === "right"
  return {
    scale: 0.8,
    left: "-55%",
    zIndex: 1,
    filter: "blur(10px)",
    opacity: 0.8,
  };
};
