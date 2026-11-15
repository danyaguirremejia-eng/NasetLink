import { createRootRouteWithContext, Outlet, HeadContent, Scripts } from '@tanstack/react-router'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/lib/AuthContext'
import '../index.css'

export const Route = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { title: 'NASETLINK' },
      { name: "monetag", content: "db54841038392d14343fcf73d78f9d9f" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1" },
    ],
    links: [
      {
        rel: "icon",
        type: "image/svg+xml",
        // Este es un icono SVG con el logo de NASETLINK (fondo azul y el enlace blanco)
        href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232563eb' %3E%3Crect width='24' height='24' rx='6' fill='%232563eb' /%3E%3Cpath d='M9.5 14.5 14.5 9.5M8 16l-1.2 1.2a3.4 3.4 0 1 1-4.8-4.8L5 9.4M16 8l1.2-1.2a3.4 3.4 0 1 1 4.8 4.8L19 14.6' stroke='white' stroke-width='2.2' stroke-linecap='round'/%3E%3C/svg%3E"
      }
    ]
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body className="bg-[#0B0F19] text-white font-sans antialiased overflow-x-hidden">
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Toaster position="top-center" richColors />
        <Scripts />
      </body>
    </html>
  )
}
