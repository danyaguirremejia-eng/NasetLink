import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs, updateDoc, doc, increment, serverTimestamp } from "firebase/firestore";

// Configuración de Firebase (la misma que usamos en el login)
const firebaseConfig = {
  apiKey: "AIzaSyCSBxC7y0rZ9dj_F2M5xMk7PS7wLUOLJfY",
  authDomain: "dany-protect-app.firebaseapp.com",
  projectId: "dany-protect-app",
  storageBucket: "dany-protect-app.appspot.com",
  messagingSenderId: "800991664439",
  appId: "1:80099166439:web:a3425b63c1fc45c1d5ba42"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ALPHABET = "abcdefghijkmnpqrstuvwxyz23456789";

const codeSchema = z.object({
  code: z.string().min(4).max(24).regex(/^[a-zA-Z0-9]+$/),
});

function makeCode(length = 7) {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  let out = "";
  for (let i = 0; i < length; i += 1) out += ALPHABET[bytes[i] % ALPHABET.length];
  return out;
}

// Crear un enlace corto en Firestore
export const createShortLink = createServerFn({ method: "POST" })
  .validator(z.object({ url: z.string().min(3).max(2048), userId: z.string() }))
  .handler(async ({ data }) => {
    const code = makeCode();
    
    const docRef = await addDoc(collection(db, "links"), {
      original_url: data.url,
      short_code: code,
      clicks: 0,
      earnings: 0,
      userId: data.userId,
      createdAt: serverTimestamp()
    });

    return {
      id: docRef.id,
      short_code: code,
      original_url: data.url,
      clicks: 0,
      earnings: 0,
    };
  });

// Obtener los datos del Dashboard
export const getDashboard = createServerFn({ method: "GET" })
  .validator(z.object({ userId: z.string() }))
  .handler(async ({ data }) => {
    const q = query(collection(db, "links"), where("userId", "==", data.userId));
    const querySnapshot = await getDocs(q);
    
    const links = [];
    let totalClicks = 0;
    let totalEarnings = 0;

    querySnapshot.forEach((docSnap) => {
      const linkData = docSnap.data();
      links.push({ id: docSnap.id, ...linkData });
      totalClicks += linkData.clicks || 0;
      totalEarnings += linkData.earnings || 0;
    });

    return { 
      links: links.reverse(), // Los más nuevos primero
      balance: totalEarnings, 
      totalClicks, 
      totalEarnings 
    };
  });

// Registrar un clic (cuando alguien abre tu enlace)
export const registerClick = createServerFn({ method: "POST" })
  .validator(codeSchema)
  .handler(async ({ data }) => {
    const q = query(collection(db, "links"), where("short_code", "==", data.code));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) return { ok: false, original_url: null };

    const linkDoc = querySnapshot.docs[0];
    const linkData = linkDoc.data();

    await updateDoc(doc(db, "links", linkDoc.id), {
      clicks: increment(1),
      earnings: increment(0.01) // Aquí defines cuánto gana el usuario por clic
    });

    return { ok: true, original_url: linkData.original_url };
  });

// Obtener el enlace por código
export const getLinkByCode = createServerFn({ method: "GET" })
  .validator(codeSchema)
  .handler(async ({ data }) => {
    const q = query(collection(db, "links"), where("short_code", "==", data.code));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    const link = querySnapshot.docs[0].data();
    return { short_code: link.short_code, original_url: link.original_url, clicks: link.clicks };
  });

export const requestPayout = createServerFn({ method: "POST" })
  .validator(z.object({ paypal_email: z.string().email() }))
  .handler(async () => {
    return { success: true, message: "Retiro solicitado" };
  });
