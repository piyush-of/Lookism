"use client";

import { useState } from "react";
import styles from "./page.module.css";
import UploadZone from "@/components/UploadZone";
import ResultsDashboard from "@/components/ResultsDashboard";
import { encryptFileClientSide } from "@/utils/crypto";

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageSelect = async (file: File) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      // Encrypt the file client-side for complete privacy in transit
      const { encryptedBlob, iv } = await encryptFileClientSide(file);

      const formData = new FormData();
      formData.append("image", encryptedBlob, file.name);
      formData.append("iv", iv);
      formData.append("mimeType", file.type);

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed due to a server error.");
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setAnalysisResult(data);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to analyze image securely. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Lookism</h1>
        <p className={styles.subtitle}>
          AI-Powered, Privacy-First Body Analysis.
          <br />
          Discover your body shape, color palette, and texture securely.
        </p>
      </header>

      <section className={styles.content}>
        {!analysisResult && !isAnalyzing && (
          <UploadZone onImageSelect={handleImageSelect} />
        )}
        
        {isAnalyzing && (
          <div style={{ textAlign: "center", padding: "4rem", color: "#a1a1aa" }}>
            <div className="loader" style={{ 
              width: "48px", height: "48px", border: "4px solid var(--surface-hover)", 
              borderBottomColor: "var(--primary)", borderRadius: "50%", 
              display: "inline-block", animation: "spin 1s linear infinite" 
            }}></div>
            <p style={{ marginTop: "1rem" }}>Securely analyzing your image...</p>
          </div>
        )}

        {analysisResult && !isAnalyzing && (
          <ResultsDashboard result={analysisResult} onReset={handleReset} />
        )}
      </section>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}} />
    </main>
  );
}
