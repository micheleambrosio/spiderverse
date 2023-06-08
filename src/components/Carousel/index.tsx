"use client";

import HeroPicture from "@/components/HeroPicture";
import { IHeroData } from "@/interfaces/heroes";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HeroDetails from "../HeroDetails";
import styles from "./carousel.module.scss";

interface IVariantsProps {
  direction: any;
  position: any;
}

interface IProps {
  heroes: IHeroData[];
  activeId: string;
}

export default function Carousel({ heroes, activeId }: IProps) {
  const [[activeIndex, direction], setActiveIndex] = useState([
    heroes.findIndex((hero) => hero.id === activeId) - 1,
    0,
  ]);

  const router = useRouter();

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

  // altera state de activeIndex (item à esquerda)
  // altera state de direction (direção do carrossel, direita +1 e esquerda -1)
  const handleClick = (newDirection: number) => {
    setActiveIndex((prevIndex) => [prevIndex[0] + newDirection, newDirection]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
        <div className={styles.wrapper} onClick={() => handleClick(1)}>
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item) => (
              <motion.div
                className={styles.hero}
                key={item.id}
                layout
                variants={variants}
                initial="enter"
                animate="visibleItems"
                exit="exit"
                transition={{ duration: 1 }}
                custom={{
                  direction,
                  position: () => {
                    if (item.id === visibleItems[0].id) {
                      return "left";
                    } else if (item.id === visibleItems[1].id) {
                      return "center";
                    } else {
                      return "right";
                    }
                  },
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
  // position === "left" (herói da frente)
  if (position === "left") {
    return {
      filter: "blur(10px)",
      scale: 1.2,
      zIndex: 3,
    };
  }

  // position === "center" (herói do meio)
  if (position === "center") {
    return {
      left: 300,
      scale: 0.8,
      top: "-10%",
      zIndex: 2,
    };
  }

  // position === "right" (herói de trás)
  return {
    filter: "blur(10px)",
    left: 160,
    opacity: 0.8,
    scale: 0.6,
    top: "-20%",
    zIndex: 1,
  };
};
