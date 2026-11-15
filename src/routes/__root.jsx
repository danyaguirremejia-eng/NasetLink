import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { Toaster } from 'sonner'

export const Route = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { title: 'NASETLINK' },
      { name: "monetag", content: "db54841038392d14343fcf73d78f9d9f" },
    ],
  }),
  component: RootComponent,
  errorComponent: ({ error }) => (
    <div className="p-5 text-white bg-[#0B0F19] min-h-screen">
      <h1 className="text-red-500 font-bold text-xl mb-4">Error en la App</h1>
      <pre className="text-sm text-slate-400 bg-black/30 p-4 rounded-xl overflow-auto">
        {error.message}
      </pre>
    </div>
  ),
})

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster position="top-center" richColors />
    </>
  )
}
