"use client";

import HeroImage from "../Hero";
import { motion } from "framer-motion";
import { spidermanFont } from "@/fonts";
import styles from "./heroes.module.scss";
import { IHeroData } from "@/interfaces/heroes";

interface IProps {
  heroes: IHeroData[];
}

export default function Heroes({ heroes }: IProps) {
  return (
    <>
      <motion.h1
        className={`${spidermanFont.className} ${styles.title}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 2 }}
      >
        Personagens
      </motion.h1>
      <motion.section
        className={styles.heroes}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {heroes.map((hero) => (
          <motion.div
            className={styles.imageContainer}
            key={hero.id}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.8 }}
            transition={{ duration: 0.8 }}
          >
            <HeroImage hero={hero} />
          </motion.div>
        ))}
      </motion.section>
    </>
  );
}
