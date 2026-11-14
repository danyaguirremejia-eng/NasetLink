import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import TopBar from "./TopBar";
import BottomNav from "./BottomNav";

export default function NasetLayout({ children }) {
  const [level, setLevel] = useState(1);

  useEffect(() => {
    // Escuchar el nivel del usuario logueado en tiempo real
    import("firebase/auth").then(({ getAuth }) => {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (currentUser) {
        const unsub = onSnapshot(doc(db, "users", currentUser.uid), (docSnap) => {
          if (docSnap.exists() && docSnap.data().level) {
            setLevel(docSnap.data().level);
          }
        });
        return () => unsub();
      }
    });
  }, []);

  return (
    <div className="naset-bg relative min-h-screen overflow-x-hidden text-slate-100">
      <div className="pointer-events-none fixed inset-0 grid-lines" />

      <div className="relative mx-auto w-full max-w-3xl px-4 pb-36 pt-6 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/dashboard" className="group flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#00f0ff] shadow-[0_0_24px_-4px_rgba(0,240,255,.8)]">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#04141a]">
                <path
                  d="M9.5 14.5 14.5 9.5M8 16l-1.2 1.2a3.4 3.4 0 1 1-4.8-4.8L5 9.4M16 8l1.2-1.2a3.4 3.4 0 1 1 4.8 4.8L19 14.6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="font-heading text-lg font-bold tracking-[0.22em] text-white">
              NASET<span className="text-[#00f0ff]">LINK</span>
            </span>
          </Link>
          <span className="rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#00f0ff]">
            Nivel {level}
          </span>
        </div>

        <div className="mb-7">
          <TopBar />
        </div>

        {children}
      </div>

      <BottomNav />
    </div>
  );
}
