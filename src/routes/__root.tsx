import Inter from "@fontsource-variable/inter?url";
import styles from "@/styles/tailwind.css?url";
import {
  createRootRouteWithContext,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";
import { Meta, Scripts } from "@tanstack/start";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { type PropsWithChildren } from "react";
import { createMetadata } from "@/lib/metadata";
import { QueryDevtools, RouterDevtools, type RouterContext } from "@/router";
import { ThemeProvider } from "next-themes";
import { authStateQueryOptions } from "@/services/user-state.query";

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ context }) => {
    console.log("__root__ beforeLoad", new Date().toISOString());

    // load user state: critical
    const authState = await context.queryClient.ensureQueryData(
      authStateQueryOptions()
    );

    return authState;
  },

  head: () => {
    return {
      meta: createMetadata({
        charSet: "utf-8",
        viewport: {
          width: "device-width",
          "initial-scale": "1",
          "maximum-scale": "1",
          "user-scalable": "no",
          "viewport-fit": "cover",
        },
        title: import.meta.env.VITE_APP_NAME,
        description: "Unofficial desktop client for Cosmo",
        robots: "index, follow",
      }),
      links: [
        {
          rel: "icon",
          href: "/favicon.ico",
        },
        {
          rel: "stylesheet",
          href: styles,
        },
        {
          rel: "stylesheet",
          href: Inter,
        },
      ],
    };
  },

  component: RootComponent,
  errorComponent: ErrorComponent,
  pendingComponent: PendingComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <Document>
      <div className="relative flex min-h-dvh flex-col">
        <div>root</div>
        {/* <Navbar /> */}

        {/* content */}
        <div className="flex min-w-full flex-col text-foreground">
          <Outlet />
        </div>

        {/* <Suspense>
          <Overlay />
        </Suspense> */}
      </div>
    </Document>
  );
}

function PendingComponent() {
  return (
    <div className="space-y-6 p-6">
      <div>Loading...</div>
    </div>
  );
}

function ErrorComponent({ error }: ErrorComponentProps) {
  return (
    <Document>
      <div className="space-y-6 p-6">
        <div>Error</div>
        <p className="text-destructive">{error.message}</p>
      </div>
    </Document>
  );
}

function NotFoundComponent() {
  return (
    <div className="space-y-6">
      <div>404 Not Found</div>
    </div>
  );
}

function Document({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Meta />
      </head>
      <body className="font-inter antialiased bg-background text-foreground overflow-y-scroll">
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>

        <QueryDevtools />
        <RouterDevtools />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
