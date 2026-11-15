import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import TopBar from "./TopBar";
import BottomNav from "./BottomNav";

export default function NasetLayout({ children }) {
  const [level, setLevel] = useState(1);

  useEffect(() => {
    if (!auth.currentUser) return;
    const unsub = onSnapshot(doc(db, "users", auth.currentUser.uid), (docSnap) => {
      if (docSnap.exists()) {
        setLevel(docSnap.data().level || 1);
      }
    });
    return () => unsub();
  }, []);

  return (
    <div className="naset-bg relative min-h-screen overflow-x-hidden text-slate-100">
      <div className="pointer-events-none fixed inset-0 grid-lines" />

      <div className="relative mx-auto w-full max-w-3xl px-4 pb-36 pt-6 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <Link to="/dashboard" className="group flex items-center gap-2.5">
            {/* NUEVO LOGO AQUÍ */}
            <img src="/logo.png" alt="NASETLINK Logo" className="h-9 w-9 object-contain drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]" />
            <span className="font-heading text-lg font-bold tracking-[0.22em] text-white">
              NASET<span className="text-[#a855f7]">LINK</span>
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
