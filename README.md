<div align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google Gemini API" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel Deployment" />
</div>

<br />

<div align="center">
  <h1 align="center">Lookism - AI Body Analyzer</h1>
  <p align="center">
    <strong>A stunning, privacy-first AI platform for body shape, skin tone, and styling analysis.</strong>
  </p>
</div>

## ✨ Overview

**Lookism** is a premium, full-stack Next.js web application that uses advanced AI vision models (Google Gemini API) to perform comprehensive body and styling analysis. With a strong emphasis on user privacy, Lookism employs military-grade client-side encryption and in-memory server processing to ensure your data is never saved, logged, or compromised.

### What it analyzes:
- 🧍 **Body Shape**: Identifies your body type (e.g., Triangle, Hourglass, Inverted Triangle) with a positive, descriptive summary.
- 🎨 **Skin Tone & Undertone**: Determines fair/medium/deep complexions alongside warm/cool/neutral undertones.
- 🧵 **Texture**: Analyzes skin and clothing textures for a better understanding of material compatibility.
- 📏 **Figure Profile**: Summarizes overall body proportions and symmetry.
- ⭐ **Personality & Vibe Rating**: Rates your overall visual "vibe" out of 10 with a fun, accurate descriptor.
- 👔 **Dressing Sense**: Critiques and analyzes your current style and clothing choices.

---

## 🔒 Extreme Privacy & Security

Your photos are yours. Lookism was built from the ground up to guarantee absolute privacy:
1. **Client-Side Encryption**: Before your image ever leaves your browser, it is encrypted using the Web Crypto API (`AES-256-GCM`). 
2. **In-Memory Decryption**: The server receives the encrypted data and decrypts it purely into volatile RAM. 
3. **Zero Disk Storage**: The image buffer is streamed securely to the Gemini API for analysis, after which the memory buffer is instantly destroyed (`buffer.fill(0)`). **No data is ever saved to disk or logged.**

---

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Premium Vanilla CSS (CSS Modules, Glassmorphism, Dark Mode)
- **Icons**: Lucide React
- **Backend**: Next.js API Routes (Node.js)
- **AI Integration**: Google Gen AI SDK (`gemini-2.5-flash`)
- **Cryptography**: Web Crypto API & Node.js `crypto` module

---

## 💻 Local Development Setup

To run Lookism locally on your machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/piyush-of/Lookism.git
   cd Lookism
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root of your project and add your Google Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

---

## ☁️ Deployment

Lookism is optimized for zero-configuration deployment on **Vercel**. 

1. Push your code to a GitHub repository.
2. Sign in to [Vercel](https://vercel.com/) with your GitHub account.
3. Click **Add New Project** and select the `Lookism` repository.
4. Under **Environment Variables**, add:
   - `GEMINI_API_KEY`: (Your Google Gemini API Key)
5. Click **Deploy**. Vercel will automatically build and host your Next.js application globally.

---

<div align="center">
  <i>Designed and developed with extreme care for privacy and beautiful aesthetics.</i>
</div>
