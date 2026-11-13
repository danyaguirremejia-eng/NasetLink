import { useState } from "react";
import { toast } from "sonner";
import { base44 } from "@/api/base44Client";
import { MfaFlow } from "@/components/auth/MfaFlow";
import { MfaScreen } from "@/components/auth/MfaParts";
import { AuthError, AuthLink, SubmitButton } from "@/components/auth/parts";
import { RegisterForm } from "@/components/auth/register/RegisterForm";
import { RegisterShell } from "@/components/auth/register/RegisterShell";
import { countryByCode } from "@/components/auth/register/options";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { signInWithProvider } from "@/lib/authMfaFlow";
import { safeReturnTo } from "@/lib/authReturnTo";

const isAlreadyVerified = (err) => err?.status === 400 && /already verified/i.test(err?.message ?? "");

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
  if (!isHttpUrl(v.channelUrl.trim())) return "Escribe el link completo de tu canal (https://...).";
  if (!v.country) return "Selecciona tu país.";
  if (!v.referralSource) return "Cuéntanos cómo nos encontraste.";
  if (v.whatsapp.replace(/\D/g, "").length < 6) return "Escribe un número de WhatsApp válido.";
  if (!v.terms) return "Debes aceptar los Términos y Condiciones y la Política de Privacidad.";
  return "";
}

function toProfile(v) {
  const dial = countryByCode(v.dialCountry)?.dial ?? "";
  return {
    full_name: v.fullName.trim(),
    channel_url: v.channelUrl.trim(),
    country: countryByCode(v.country)?.name ?? v.country,
    referral_source: v.referralSource,
    whatsapp: `${dial} ${v.whatsapp.replace(/\D/g, "")}`.trim(),
    terms_accepted_at: new Date().toISOString(),
  };
}

// The profile is saved once the account is verified and signed in; it never blocks the redirect.
async function saveProfile(profile) {
  try {
    await base44.auth.updateMe(profile);
  } catch {
    const { full_name: _ignored, ...custom } = profile;
    await base44.auth.updateMe(custom).catch(() => {});
  }
}

/**
 * The /register page: register → OTP → verifyOtp → setToken. Registration alone
 * does not sign the user in (the account is unverified), so the code step is never
 * skipped and loginViaEmailPassword is never called right after register.
 */
export function RegisterPage() {
  const returnTo = safeReturnTo();
  const [values, setValues] = useState(INITIAL);
  const [otpCode, setOtpCode] = useState("");
  const [step, setStep] = useState("form");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [mfaChallenge, setMfaChallenge] = useState(null);
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
      await base44.auth.register({ email, password: values.password });
      setStep("otp");
    } catch (err) {
      setError(err.message || "No pudimos crear tu cuenta. Inténtalo de nuevo.");
    } finally {
      setBusy(false);
    }
  }

  async function verify(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const result = await base44.auth.verifyOtp({ email, otpCode });
      if (result?.mfa_required) {
        setMfaChallenge(result);
        return;
      }
      if (result?.access_token) {
        base44.auth.setToken(result.access_token);
        await saveProfile(toProfile(values));
      }
      window.location.href = returnTo;
    } catch (err) {
      // Verified server-side but the answer never arrived: the code is spent and
      // there is no token, so the only way forward is a normal sign-in.
      if (isAlreadyVerified(err)) setStep("already_verified");
      else setError(err.message || "Código de verificación inválido.");
      setBusy(false);
    }
  }

  async function resend() {
    setError("");
    try {
      await base44.auth.resendOtp(email);
      toast("Código enviado", { description: "Revisa tu email para ver el nuevo código." });
    } catch (err) {
      if (isAlreadyVerified(err)) setStep("already_verified");
      else setError(err.message || "No pudimos reenviar el código.");
    }
  }

  function google() {
    setError("");
    signInWithProvider("google", returnTo).catch((err) => setError(err.message || "No pudimos continuar con Google."));
  }

  // The account is verified; the second sign-in step replaces the whole page and finishes signing in.
  if (mfaChallenge) return <MfaScreen><MfaFlow challenge={mfaChallenge} returnTo={returnTo} /></MfaScreen>;

  if (step === "already_verified") {
    return (
      <RegisterShell title="Tu cuenta ya está verificada" subtitle="Inicia sesión para continuar">
        <p className="mb-6 text-sm text-muted-foreground">
          <span className="font-medium text-white">{email}</span> ya está verificado. Inicia sesión para entrar a tu panel.
        </p>
        <AuthLink to="/login" returnTo={returnTo} className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90">
          Iniciar sesión
        </AuthLink>
      </RegisterShell>
    );
  }

  if (step === "otp") {
    return (
      <RegisterShell title="Verifica tu email" subtitle="Último paso para activar tu cuenta">
        <form onSubmit={verify}>
          <p className="mb-6 text-center text-sm text-muted-foreground">
            Enviamos un código de 6 dígitos a <span className="font-medium text-white">{email}</span>.
          </p>
          <AuthError>{error}</AuthError>
          <div className="mb-6 flex justify-center">
            <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode} autoFocus autoComplete="one-time-code">
              <InputOTPGroup>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <InputOTPSlot key={i} index={i} className="h-12 w-11 border-white/10 bg-[#0b1324] text-lg text-white" />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <SubmitButton busy={busy} busyLabel="Verificando..." disabled={busy || otpCode.length < 6} className="h-12 w-full rounded-xl font-semibold">
            Verificar y entrar
          </SubmitButton>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {"¿No te llegó el código? "}
            <button type="button" onClick={resend} className="font-medium text-primary hover:underline">
              Reenviar
            </button>
          </p>
        </form>
      </RegisterShell>
    );
  }

  return (
    <RegisterShell
      title="Crea tu cuenta"
      subtitle="Empieza a monetizar tus enlaces con NASETLINK"
      footer={
        <>
          {"¿Ya tienes una cuenta? "}
          <AuthLink to="/login" returnTo={returnTo}>
            Inicia sesión
          </AuthLink>
        </>
      }
    >
      <RegisterForm values={values} onChange={change} onSubmit={register} onGoogle={google} busy={busy} error={error} />
    </RegisterShell>
  );
}
