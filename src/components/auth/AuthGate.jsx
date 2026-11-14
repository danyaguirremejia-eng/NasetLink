import { redirect } from "@tanstack/react-router";
import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

/**
 * El guardián ahora usa Firebase para verificar si el usuario está logueado.
 * Usamos una Promesa con onAuthStateChanged para evitar que el usuario sea
 * redirigido al login mientras Firebase está cargando la sesión inicial.
 */
export async function requireSignedIn({ location }) {
  const user = await new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      unsubscribe();
      resolve(currentUser);
    });
  });

  if (user) {
    // Si hay usuario, lo pasamos al contexto para que el Dashboard lo use
    return { user };
  }

  // Si no hay usuario, lo mandamos al login guardando la ruta a la que quería ir
  throw redirect({
    to: "/login",
    search: { returnTo: location.href, from_url: location.href },
    reloadDocument: true,
  });
}

export function AuthGateError({ error }) {
  return <DefaultCatchBoundary error={error} />;
}
