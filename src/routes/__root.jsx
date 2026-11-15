import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { title: 'NASETLINK' },
      { name: "monetag", content: "db54841038392d14343fcf73d78f9d9f" },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return <Outlet />
}
