import { useAuthState } from "@/services/user-state.query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { data } = useAuthState();

  return (
    <div className="flex flex-col">
      <div>index</div>
      <div>{data?.profile?.nickname ?? "no auth"}</div>
      <Link to="/test" className="underline">
        test
      </Link>
    </div>
  );
}
