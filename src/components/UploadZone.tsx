"use client";

import { useState, useRef } from "react";
import { UploadCloud, ShieldCheck } from "lucide-react";
import styles from "./UploadZone.module.css";

interface UploadZoneProps {
  onImageSelect: (file: File) => void;
}

export default function UploadZone({ onImageSelect }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        onImageSelect(file);
      } else {
        alert("Please upload an image file.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onImageSelect(e.target.files[0]);
    }
  };

  return (
    <div
      className={`${styles.uploadZone} ${isDragging ? styles.dragActive : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className={styles.input}
      />
      
      <UploadCloud className={styles.icon} />
      <h2 className={styles.title}>Upload a Photo</h2>
      <p className={styles.subtitle}>
        Drag and drop a clear image of yourself or click to browse. For best results, use good lighting and a plain background.
      </p>
      
      <button className={styles.button}>Select Image</button>

      <div className={styles.secureBadge}>
        <ShieldCheck size={18} />
        <span>100% Secure & Encrypted. Photos are not saved.</span>
      </div>
    </div>
  );
}
