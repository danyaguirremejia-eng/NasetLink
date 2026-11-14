import { redirect } from "@tanstack/react-router";
import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary";
import { auth } from "@/lib/firebase";

export async function requireSignedIn({ location }) {
  // Esta función espera OBLIGATORIAMENTE a que Firebase lea la sesión del celular
  await auth.authStateReady();
  
  const user = auth.currentUser;

  if (user) {
    // Si hay usuario, lo pasamos al contexto
    return { user };
  } 
  
  // Si de verdad no hay sesión, mandamos al login sin forzar recarga bruta
  throw redirect({
    to: "/login",
    search: { returnTo: location.href, from_url: location.href },
  });
}

export function AuthGateError({ error }) {
  return <DefaultCatchBoundary error={error} />;
}
