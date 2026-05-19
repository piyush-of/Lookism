"use client";

import { Activity, Palette, Sparkles, ScanFace, RotateCcw, Star, Shirt, Heart, Smile } from "lucide-react";
import styles from "./ResultsDashboard.module.css";

interface AnalysisResult {
  shape: string;
  faceShape: string;
  colorTone: string;
  colorSeason: string;
  styleArchetype: string;
  texture: string;
  personalityRating: string;
  stylingTips: string;
  cuteCompliment: string;
}

interface ResultsDashboardProps {
  result: AnalysisResult;
  onReset: () => void;
}

export default function ResultsDashboard({ result, onReset }: ResultsDashboardProps) {
  return (
    <div className={styles.dashboard}>
      
      {/* Highlight/Compliment Section */}
      <div className={`${styles.card} ${styles.highlightCard}`}>
        <div className={styles.cardHeader}>
          <Heart className={styles.pinkIcon} size={24} fill="currentColor" />
          <h3 className={styles.cardTitle}>Lookism Highlight</h3>
        </div>
        <p className={styles.complimentText}>"{result.cuteCompliment}"</p>
      </div>

      <div className={styles.grid}>
        
        {/* Vibe & Archetype */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Star size={24} />
            <h3 className={styles.cardTitle}>Vibe & Archetype</h3>
          </div>
          <div className={styles.cardValue}>{result.styleArchetype}</div>
          <p className={styles.cardDescription}>{result.personalityRating}</p>
        </div>

        {/* Color Season */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Palette size={24} />
            <h3 className={styles.cardTitle}>Color Palette</h3>
          </div>
          <div className={styles.cardValue}>{result.colorSeason}</div>
          <p className={styles.cardDescription}>Tone: {result.colorTone}</p>
          <div className={styles.colorSwatch}></div>
        </div>
        
        {/* Face & Body */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Smile size={24} />
            <h3 className={styles.cardTitle}>Face & Body</h3>
          </div>
          <div className={styles.cardValue}>{result.faceShape} Face</div>
          <p className={styles.cardDescription}>Body Shape: {result.shape}</p>
        </div>

        {/* Styling Tips */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Sparkles size={24} />
            <h3 className={styles.cardTitle}>Styling Tips</h3>
          </div>
          <p className={styles.cardDescription} style={{ color: "var(--foreground)", whiteSpace: "pre-line" }}>
            {result.stylingTips}
          </p>
        </div>

      </div>

      <div className={styles.actions}>
        <button onClick={onReset} className={styles.resetButton}>
          <RotateCcw size={18} />
          Analyze Another Photo
        </button>
      </div>
    </div>
  );
}
