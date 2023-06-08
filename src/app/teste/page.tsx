"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";

import styles from "./page.module.scss";

interface IVariantsProps {
  direction: any;
  position: any;
}

export default function Teste() {
  const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);

  // itens que serão mostrados ao longo do carrossel
  const items = ["🍔", "🍕", "🌭", "🍗"];

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

  const handleClick = (newDirection: number) => {
    setActiveIndex((prevIndex) => [prevIndex[0] + newDirection, newDirection]);
  };

  return (
    <div className={styles.container}>
      {activeIndex} - {indexInArrayScope}
      <div className={styles.wrapper}>
        <AnimatePresence initial={false} mode="popLayout">
          {visibleItems.map((item) => (
            <motion.div
              className={styles.teste}
              key={item}
              layout
              variants={variants}
              initial="enter"
              animate="center"
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
              {item}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className={styles.buttons}>
        <button onClick={() => handleClick(-1)}>◀︎</button>
        <button onClick={() => handleClick(1)}>▶︎</button>
      </div>
    </div>
  );
}

const variants: Variants = {
  enter: (params: IVariantsProps) => {
    return {
      scale: 0.2,
      x: params?.direction < 1 ? 50 : -50,
      opacity: 0,
    };
  },
  center: (params: IVariantsProps) => {
    return {
      scale: params?.position() === "center" ? 1 : 0.7,
      x: 0,
      opacity: 1,
    };
  },
  exit: (params: IVariantsProps) => {
    return {
      scale: 0.2,
      x: params?.direction < 1 ? 50 : -50,
      opacity: 0,
    };
  },
};
