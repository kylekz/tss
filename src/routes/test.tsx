import { useAuthState } from "@/services/user-state.query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/test")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useAuthState();

  return (
    <div className="flex flex-col">
      <div>test</div>
      <div>{data?.profile?.nickname ?? "no auth"}</div>
      <Link to="/" className="underline">
        index
      </Link>
    </div>
  );
}
