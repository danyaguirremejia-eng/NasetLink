import { createRootRouteWithContext, Outlet, HeadContent, Scripts } from '@tanstack/react-router'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/lib/AuthContext'
import '../index.css'

export const Route = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { title: 'NASETLINK' },
      { name: "monetag", content: "db54841038392d14343fcf73d78f9d9f" },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="es" className="bg-[#03060a]">
      <head>
        <HeadContent />
      </head>
      <body className="bg-[#03060a] text-white font-sans antialiased flex justify-center">
        
        {/* Este div fuerza a que todo se vea como móvil en PC */}
        <div className="w-full max-w-md min-h-screen bg-[#0B0F19] relative shadow-2xl overflow-x-hidden border-x border-white/5">
          <AuthProvider>
            <Outlet />
          </AuthProvider>
        </div>

        <Toaster position="top-center" richColors />
        <Scripts />
      </body>
    </html>
  )
}
