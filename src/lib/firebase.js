import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // <-- Importante para las fotos

const firebaseConfig = {
  apiKey: "AIzaSyCSBxC7y0rZ9dj_F2M5xMk7PS7wLUOLJfY",
  authDomain: "dany-protect-app.firebaseapp.com",
  projectId: "dany-protect-app",
  storageBucket: "dany-protect-app.appspot.com",
  messagingSenderId: "800991664439",
  appId: "1:80099166439:web:a3425b63c1fc45c1d5ba42"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app); // <-- Exportamos storage
