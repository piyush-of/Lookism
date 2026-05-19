// Utility for encrypting and decrypting files using Web Crypto API / Node Crypto

// We use a predefined symmetric key for demonstration, but in a real app
// this could be dynamically negotiated.
const ENCRYPTION_KEY_BASE64 = "V2hhdGV2ZXJZb3VXYW50VGhpc0tleVRvQmU="; // 256-bit key representation

// Utility to convert base64 to Uint8Array
function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Client-side encryption
export async function encryptFileClientSide(file: File): Promise<{ encryptedBlob: Blob; iv: string }> {
  // Read file as ArrayBuffer
  const buffer = await file.arrayBuffer();
  
  // Generate random IV
  const iv = crypto.getRandomValues(new Uint8Array(12));
  
  // Import key
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode("shariram-secure-key-32bytes-long"), // Must be exactly 32 bytes for AES-256
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );

  // Encrypt
  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    keyMaterial,
    buffer
  );

  // Convert IV to string to send along
  const ivString = btoa(String.fromCharCode(...Array.from(iv)));
  
  return {
    encryptedBlob: new Blob([encryptedBuffer], { type: "application/octet-stream" }),
    iv: ivString
  };
}
