"use client";

import { Activity, Palette, Type, ScanFace, RotateCcw } from "lucide-react";
import styles from "./ResultsDashboard.module.css";

interface AnalysisResult {
  shape: string;
  shapeDescription: string;
  colorTone: string;
  colorUndertone: string;
  texture: string;
  figure: string;
}

interface ResultsDashboardProps {
  result: AnalysisResult;
  onReset: () => void;
}

export default function ResultsDashboard({ result, onReset }: ResultsDashboardProps) {
  return (
    <div className={styles.dashboard}>
      <div className={styles.grid}>
        
        {/* Body Shape Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Activity size={24} />
            <h3 className={styles.cardTitle}>Body Shape</h3>
          </div>
          <div className={styles.cardValue}>{result.shape || "Unknown"}</div>
          <p className={styles.cardDescription}>{result.shapeDescription}</p>
        </div>

        {/* Color Palette Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Palette size={24} />
            <h3 className={styles.cardTitle}>Skin Tone & Undertone</h3>
          </div>
          <div className={styles.cardValue}>{result.colorTone}</div>
          <p className={styles.cardDescription}>Undertone: {result.colorUndertone}</p>
          <div className={styles.colorSwatch}></div>
        </div>

        {/* Texture Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <ScanFace size={24} />
            <h3 className={styles.cardTitle}>Skin Texture</h3>
          </div>
          <div className={styles.cardValue}>{result.texture || "Smooth"}</div>
          <p className={styles.cardDescription}>Analysis indicates a predominantly {result.texture?.toLowerCase()} texture pattern.</p>
        </div>

        {/* Figure Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <Type size={24} />
            <h3 className={styles.cardTitle}>Figure Profile</h3>
          </div>
          <div className={styles.cardValue}>Proportional Analysis</div>
          <p className={styles.cardDescription}>{result.figure}</p>
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
