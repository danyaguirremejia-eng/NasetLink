export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#0B0F19]">
      
      {/* Logo NASETLINK */}
      <div className="flex items-center gap-3 mb-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white font-black text-2xl shadow-[0_0_20px_-3px_rgba(37,99,235,0.5)]">
          N
        </span>
        <span className="font-heading text-3xl font-black tracking-[0.2em] text-white">
          NASET<span className="text-blue-500">LINK</span>
        </span>
      </div>

      {/* Puntitos animados */}
      <div className="flex gap-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      
    </div>
  );
}
