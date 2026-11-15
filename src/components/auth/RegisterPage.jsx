import { Lock, Mail, User, Link as LinkIcon, LogIn } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthError, AuthLink, OrDivider, SubmitButton } from "@/components/auth/parts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { safeReturnTo } from "@/lib/authReturnTo";
import { auth, googleProvider, db } from "../../lib/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile, setPersistence, browserLocalPersistence } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export function RegisterPage() {
  const navigate = useNavigate();
  const rawReturnTo = safeReturnTo();
  const targetRoute = (rawReturnTo && rawReturnTo !== "/" && rawReturnTo !== "/login" && rawReturnTo !== "/register") ? rawReturnTo : "/dashboard";
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [channel, setChannel] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    
    if (password !== confirmPassword) {
      return setError("Las contraseñas no coinciden.");
    }
    if (password.length < 6) {
      return setError("La contraseña debe tener al menos 6 caracteres.");
    }

    setBusy(true);
    try {
      // FORZAMOS LA PERSISTENCIA LOCAL AL CREAR LA CUENTA
      await setPersistence(auth, browserLocalPersistence);
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Actualizamos el nombre en Firebase Auth
      await updateProfile(user, { displayName: name });

      // Guardamos los datos iniciales en Firestore
      await setDoc(doc(db, "users", user.uid), {
        displayName: name,
        email: email,
        channelLink: channel,
        level: 1,
        verified: false,
        role: "user",
        createdAt: serverTimestamp()
      });

      setTimeout(() => {
        navigate({ to: targetRoute });
      }, 500);
      
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError("Ya existe una cuenta con este correo.");
      } else if (err.code === 'auth/weak-password') {
        setError("La contraseña es muy débil.");
      } else {
        setError("Error al crear la cuenta. Inténtalo de nuevo.");
      }
      setBusy(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setBusy(true);
    try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, googleProvider);
      
      // Si es la primera vez que entra con Google, creamos su perfil en Firestore
      if (result.user) {
        await setDoc(doc(db, "users", result.user.uid), {
          displayName: result.user.displayName || "Creador",
          email: result.user.email,
          level: 1,
          verified: false,
          role: "user",
          createdAt: serverTimestamp()
        }, { merge: true }); // merge: true para no borrar datos si ya existía
      }

      setTimeout(() => {
        navigate({ to: targetRoute });
      }, 500);
      
    } catch (err) {
      console.error(err);
      setError(err.message || "Error al conectar con Google.");
      setBusy(false);
    }
  }

  return (
    <AuthLayout icon={LogIn} title="Crea tu cuenta" subtitle="Empieza a monetizar tus enlaces con NASETLINK">
      
      <button
        type="button" onClick={handleGoogleLogin} disabled={busy}
        className="flex w-full items-center justify-center gap-3 rounded-lg bg-white py-3 text-sm font-medium text-black transition-colors hover:bg-gray-100 disabled:opacity-50 mb-6"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Continuar con Google
      </button>

      <OrDivider text="O REGÍSTRATE CON TU EMAIL" />
      <AuthError>{error}</AuthError>

      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="register-name">Nombre completo</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input id="register-name" type="text" placeholder="Tu nombre y apellido" value={name} onChange={(e) => setName(e.target.value)} className="pl-10" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input id="register-email" type="email" autoComplete="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-password">Contraseña</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input id="register-password" type="password" placeholder="Mínimo 6 caracteres" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-confirm">Confirmar contraseña</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input id="register-confirm" type="password" placeholder="Repite tu contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-10" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="register-channel">Link de tu canal / red principal</Label>
          <div className="relative">
            <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input id="register-channel" type="url" placeholder="https://youtube.com/@tucanal" value={channel} onChange={(e) => setChannel(e.target.value)} className="pl-10" />
          </div>
          <p className="text-[10px] text-slate-500">YouTube, TikTok u otra red donde publicas.</p>
        </div>

        <SubmitButton busy={busy} busyLabel="Creando cuenta...">
          Crear mi cuenta
        </SubmitButton>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        ¿Ya tienes una cuenta?{" "}
        <AuthLink to="/login" returnTo={targetRoute}>
          Inicia sesión
        </AuthLink>
      </p>
    </AuthLayout>
  );
}
