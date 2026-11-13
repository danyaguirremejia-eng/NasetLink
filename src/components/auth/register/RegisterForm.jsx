import { Link } from "@tanstack/react-router";
import { Link2, Lock, Mail, User } from "lucide-react";
import { GoogleIcon } from "@/components/auth/GoogleIcon";
import { AuthError, SubmitButton } from "@/components/auth/parts";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { COUNTRIES, REFERRAL_SOURCES } from "./options";

const inputClass = "h-12 border-white/10 bg-[#0b1324] pl-10 text-sm text-white placeholder:text-slate-500 focus-visible:ring-primary";
const triggerClass = "h-12 border-white/10 bg-[#0b1324] text-sm text-white data-[placeholder]:text-slate-500 focus:ring-primary";

function Field({ id, label, children, hint }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-slate-200">
        {label}
      </Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function IconInput({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
      <Input className={inputClass} {...props} />
    </div>
  );
}

export function RegisterForm({ values, onChange, onSubmit, onGoogle, busy, error }) {
  const set = (key) => (e) => onChange(key, e?.target ? e.target.value : e);

  return (
    <>
      <button
        type="button"
        onClick={onGoogle}
        className="flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-white text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f172a]"
      >
        <GoogleIcon className="h-5 w-5" />
        Continuar con Google
      </button>

      <div className="my-6 flex items-center gap-3" role="separator">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">o regístrate con tu email</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <AuthError>{error}</AuthError>

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <Field id="reg-name" label="Nombre completo">
          <IconInput icon={User} id="reg-name" autoComplete="name" placeholder="Tu nombre y apellido" value={values.fullName} onChange={set("fullName")} disabled={busy} required />
        </Field>

        <Field id="reg-email" label="Email">
          <IconInput icon={Mail} id="reg-email" type="email" autoComplete="email" placeholder="tu@email.com" value={values.email} onChange={set("email")} disabled={busy} required />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="reg-password" label="Contraseña">
            <IconInput icon={Lock} id="reg-password" type="password" autoComplete="new-password" placeholder="Mínimo 8 caracteres" minLength={8} value={values.password} onChange={set("password")} disabled={busy} required />
          </Field>
          <Field id="reg-confirm" label="Confirmar contraseña">
            <IconInput icon={Lock} id="reg-confirm" type="password" autoComplete="new-password" placeholder="Repite tu contraseña" value={values.confirm} onChange={set("confirm")} disabled={busy} required />
          </Field>
        </div>

        <Field id="reg-channel" label="Link de tu canal / red principal" hint="YouTube, TikTok u otra red donde publicas.">
          <IconInput icon={Link2} id="reg-channel" type="url" inputMode="url" placeholder="https://youtube.com/@tucanal" value={values.channelUrl} onChange={set("channelUrl")} disabled={busy} required />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="reg-country" label="País">
            <Select value={values.country} onValueChange={set("country")} disabled={busy}>
              <SelectTrigger id="reg-country" className={triggerClass}>
                <SelectValue placeholder="Selecciona tu país" />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {COUNTRIES.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field id="reg-source" label="¿Cómo nos encontraste?">
            <Select value={values.referralSource} onValueChange={set("referralSource")} disabled={busy}>
              <SelectTrigger id="reg-source" className={triggerClass}>
                <SelectValue placeholder="Selecciona una opción" />
              </SelectTrigger>
              <SelectContent>
                {REFERRAL_SOURCES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>

        <Field id="reg-whatsapp" label="WhatsApp">
          <div className="flex gap-2">
            <Select value={values.dialCountry} onValueChange={set("dialCountry")} disabled={busy}>
              <SelectTrigger aria-label="Código de país" className={`${triggerClass} w-[112px] shrink-0`}>
                <SelectValue placeholder="+00" />
              </SelectTrigger>
              <SelectContent className="max-h-72">
                {COUNTRIES.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    <span className="font-mono text-xs text-muted-foreground">{c.code}</span> {c.dial}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              id="reg-whatsapp"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder="Número sin código"
              value={values.whatsapp}
              onChange={(e) => onChange("whatsapp", e.target.value.replace(/[^\d\s-]/g, ""))}
              className={`${inputClass} pl-3`}
              disabled={busy}
              required
            />
          </div>
        </Field>

        <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3">
          <Checkbox id="reg-terms" checked={values.terms} onCheckedChange={(v) => onChange("terms", v === true)} disabled={busy} className="mt-0.5" />
          <Label htmlFor="reg-terms" className="text-sm font-normal leading-relaxed text-slate-300">
            Acepto los{" "}
            <Link to="/" hash="terminos" className="font-medium text-primary hover:underline">
              Términos y Condiciones
            </Link>{" "}
            y la{" "}
            <Link to="/" hash="privacidad" className="font-medium text-primary hover:underline">
              Política de Privacidad
            </Link>
          </Label>
        </div>

        <SubmitButton busy={busy} busyLabel="Creando tu cuenta..." className="h-12 w-full rounded-xl bg-primary text-base font-semibold shadow-[0_10px_30px_-10px_rgba(59,130,246,.9)] hover:bg-primary/90">
          Crear mi cuenta
        </SubmitButton>
      </form>
    </>
  );
}
