"use client";

import { useState, useEffect } from "react";
import styles from "./IntroScreen.module.css";

interface IntroScreenProps {
  onComplete: () => void;
}

const TARGET_WORD = "Lookism";
const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [displayText, setDisplayText] = useState("");
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let iteration = 0;
    
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        TARGET_WORD.split("")
          .map((letter, index) => {
            if (index < iteration) {
              return TARGET_WORD[index];
            }
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join("")
      );

      if (iteration >= TARGET_WORD.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(onComplete, 800);
        }, 1200); // Hold final word
      }

      iteration += 1 / 4; // Reveal speed
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`${styles.introContainer} ${isFadingOut ? styles.fadeOut : ""}`}>
      <h1 className={styles.glitchText}>{displayText}</h1>
    </div>
  );
}
