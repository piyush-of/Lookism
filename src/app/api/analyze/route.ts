import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { GoogleGenAI } from "@google/genai";

// Use same key as frontend for demonstration.
const ENCRYPTION_KEY = Buffer.from("shariram-secure-key-32bytes-long", "utf8");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image") as File;
    const ivBase64 = formData.get("iv") as string;
    const mimeType = (formData.get("mimeType") as string) || "image/jpeg";

    if (!imageFile || !ivBase64) {
      return NextResponse.json({ error: "Missing encrypted image or IV" }, { status: 400 });
    }

    // Decrypt the image in memory
    const encryptedBuffer = Buffer.from(await imageFile.arrayBuffer());
    const iv = Buffer.from(ivBase64, "base64");
    
    // In Web Crypto API, the auth tag is the last 16 bytes of the ciphertext
    const authTag = encryptedBuffer.subarray(encryptedBuffer.length - 16);
    const ciphertext = encryptedBuffer.subarray(0, encryptedBuffer.length - 16);
    
    const decipher = crypto.createDecipheriv("aes-256-gcm", ENCRYPTION_KEY, iv);
    decipher.setAuthTag(authTag);
    
    let decryptedImageBuffer = decipher.update(ciphertext);
    decryptedImageBuffer = Buffer.concat([decryptedImageBuffer, decipher.final()]);

    // Construct the AI SDK call
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("No GEMINI_API_KEY found in environment variables.");
      return NextResponse.json({ error: "API Key not configured. Please add GEMINI_API_KEY to your .env.local file." }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: apiKey });
    const base64Data = decryptedImageBuffer.toString("base64");
    
    // Zero out the buffer immediately for privacy
    decryptedImageBuffer.fill(0);

const prompt = `Analyze this image. 
FIRST, check if the image contains a clear human person. 
If it DOES NOT contain a human person (e.g. it is an object, animal, landscape, or non-living thing), you MUST respond EXACTLY with this JSON:
{ "error": "No human detected in the image. Please upload a photo of a person." }

If it DOES contain a human, provide a structured JSON response containing the following aesthetic analysis:
1. "shape": The body shape (e.g., Triangle, Inverted Triangle, Rectangle, Hourglass).
2. "faceShape": The face shape (e.g., Oval, Diamond, Heart, Square, Round).
3. "colorTone": The skin tone (e.g., Fair, Medium, Deep) and undertone.
4. "colorSeason": The seasonal color palette (e.g., Deep Winter, Light Spring, Soft Autumn).
5. "styleArchetype": A fashion archetype that fits their vibe (e.g., Minimalist, Old Money, Streetwear, Y2K).
6. "texture": A brief analysis of skin/clothing texture and materials that would look good on them.
7. "personalityRating": A vibe rating out of 10 with a short descriptive phrase (e.g., "9/10 - Energetic & Friendly").
8. "stylingTips": Two or three highly specific, actionable styling tips to enhance their look.
9. "cuteCompliment": A very sweet, charming, and personalized compliment about their skin, eyes, or overall aesthetic.

Respond ONLY with raw JSON. No markdown backticks, no code formatting. Format:
{ "shape": "...", "faceShape": "...", "colorTone": "...", "colorSeason": "...", "styleArchetype": "...", "texture": "...", "personalityRating": "...", "stylingTips": "...", "cuteCompliment": "..." }`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        prompt,
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Data
          }
        }
      ]
    });

    let aiText = response.text || "{}";
    
    // Clean up markdown formatting if the model accidentally included it
    aiText = aiText.replace(/^```json/g, "").replace(/^```/g, "").replace(/```$/g, "").trim();
    
    const result = JSON.parse(aiText);

    return NextResponse.json(result);

  } catch (error) {
    console.error("Analysis Error:", error);
    return NextResponse.json({ error: "Failed to securely process the image" }, { status: 500 });
  }
}
