import { Outlet, createFileRoute } from "@tanstack/react-router";
import { AuthGateError, requireSignedIn } from "@/components/auth/AuthGate";
import NasetLayout from "@/components/naset/NasetLayout";
import LoadingScreen from "@/components/naset/LoadingScreen";

export const Route = createFileRoute("/_authed")({
  ssr: false,
  beforeLoad: requireSignedIn,
  errorComponent: AuthGateError,
  component: AuthedLayout,
  pendingComponent: LoadingScreen,
});

function AuthedLayout() {
  return (
    <NasetLayout>
      <Outlet />
    </NasetLayout>
  );
}
