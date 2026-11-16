import { Outlet, createFileRoute } from "@tanstack/react-router";
import { AuthGateError, requireSignedIn } from "@/components/auth/AuthGate";
import NasetLayout from "@/components/naset/NasetLayout";
import LoadingScreen from "@/components/naset/LoadingScreen";
import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { ShieldAlert } from "lucide-react";

// ⬇️ TUS CORREOS DE STAFF AQUÍ ⬇️
const OWNER_EMAILS = ["danyxiter67@gmail.com"];
const MODERATOR_EMAILS = ["moderador@ejemplo.com"];
const ADMIN_EMAILS = ["admin@ejemplo.com"];

export const Route = createFileRoute("/_authed")({
  ssr: false,
  beforeLoad: requireSignedIn,
  errorComponent: AuthGateError,
  component: AuthedLayout,
  pendingComponent: LoadingScreen,
});

function AuthedLayout() {
  const [maintenance, setMaintenance] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Escuchar si el modo mantenimiento está activo
    const unsubSettings = onSnapshot(doc(db, "settings", "global"), (docSnap) => {
      if (docSnap.exists()) {
        setMaintenance(docSnap.data().maintenance || false);
      }
    });

    // 2. Revisar si el usuario actual es del staff
    const checkRole = async () => {
      if (auth.currentUser) {
        const userEmail = auth.currentUser.email;
        
        // Primero revisamos si el correo está en las listas de arriba
        if (OWNER_EMAILS.includes(userEmail) || MODERATOR_EMAILS.includes(userEmail) || ADMIN_EMAILS.includes(userEmail)) {
          setIsStaff(true);
          setLoading(false);
          return;
        }

        // Si no está en las listas, revisamos en Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
          if (userDoc.exists()) {
            const role = userDoc.data().role;
            if (role === 'owner' || role === 'admin' || role === 'moderator') {
              setIsStaff(true);
            }
          }
        } catch (e) {
          console.log("Error verificando rol", e);
        }
      }
      setLoading(false);
    };
    checkRole();

    return () => unsubSettings();
  }, []);

  if (loading) return <LoadingScreen />;

  // Si está en mantenimiento y NO es del staff, lo bloquea
  if (maintenance && !isStaff) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center text-white p-5 text-center">
        <ShieldAlert className="w-20 h-20 text-red-500 mb-6 animate-pulse" />
        <h1 className="text-4xl font-black mb-4">En Mantenimiento</h1>
        <p className="text-slate-400 max-w-md mx-auto text-lg">Estamos actualizando NASETLINK para traerte mejoras increíbles. Volveremos en unos minutos.</p>
        <div className="mt-8 text-sm font-bold text-slate-600">NASETLINK © 2026</div>
      </div>
    );
  }

  return (
    <NasetLayout>
      <Outlet />
    </NasetLayout>
  );
}
