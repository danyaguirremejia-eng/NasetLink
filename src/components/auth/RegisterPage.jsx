import { useState } from "react";
import { toast } from "sonner";
import { AuthError, AuthLink, SubmitButton } from "@/components/auth/parts";
import { RegisterForm } from "@/components/auth/register/RegisterForm";
import { RegisterShell } from "@/components/auth/register/RegisterShell";
import { countryByCode } from "@/components/auth/register/options";
import { auth, googleProvider } from "../../lib/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";

const INITIAL = {
  fullName: "",
  email: "",
  password: "",
  confirm: "",
  channelUrl: "",
  country: "",
  referralSource: "",
  dialCountry: "MX",
  whatsapp: "",
  terms: false,
};

function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function validate(v) {
  if (v.fullName.trim().length < 2) return "Escribe tu nombre completo.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) return "Escribe un email válido.";
  if (v.password.length < 8) return "La contraseña debe tener al menos 8 caracteres.";
  if (v.password !== v.confirm) return "Las contraseñas no coinciden.";
  if (!isHttpUrl(v.channelUrl.trim())) return "Escribe el link completo de tu canal.";
  if (!v.country) return "Selecciona tu país.";
  if (!v.referralSource) return "Cuéntanos cómo nos encontraste.";
  if (v.whatsapp.replace(/\D/g, "").length < 6) return "Escribe un número de WhatsApp válido.";
  if (!v.terms) return "Debes aceptar los Términos y Condiciones.";
  return "";
}

export function RegisterPage() {
  const [values, setValues] = useState(INITIAL);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  
  const email = values.email.trim();

  function change(key, value) {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "country" && !prev.whatsapp) next.dialCountry = value;
      return next;
    });
  }

  async function register(e) {
    e.preventDefault();
    const problem = validate(values);
    setError(problem);
    if (problem) return;
    
    setBusy(true);
    try {
      // 1. Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, values.password);
      
      // 2. Guardar el nombre en el perfil de Firebase
      await updateProfile(userCredential.user, {
        displayName: values.fullName.trim()
      });

      // (Opcional) Aquí podrías guardar los datos extra como WhatsApp o canal en Firestore
      
      toast.success("¡Cuenta creada con éxito!");
      window.location.href = "/dashboard"; // Redirigir al panel principal
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError("Este correo ya está registrado. Intenta iniciar sesión.");
      } else {
        setError(err.message || "No pudimos crear tu cuenta. Inténtalo de nuevo.");
      }
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    setError("");
    setBusy(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("¡Bienvenido!");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      setError(err.message || "No pudimos iniciar sesión con Google.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <RegisterShell
      title="Crea tu cuenta"
      subtitle="Empieza a monetizar tus enlaces con NASETLINK"
      footer={
        <>
          {"¿Ya tienes una cuenta? "}
          <AuthLink to="/login">Inicia sesión</AuthLink>
        </>
      }
    >
      <AuthError>{error}</AuthError>
      <RegisterForm 
        values={values} 
        onChange={change} 
        onSubmit={register} 
        onGoogle={google} 
        busy={busy} 
        error={error} 
      />
    </RegisterShell>
  );
}
