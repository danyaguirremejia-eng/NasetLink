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
