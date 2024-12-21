import { join } from "node:path";
import { defineConfig } from "@tanstack/start/config";
import tsconfigPathsPlugin from "vite-plugin-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import type { App } from "vinxi";

const config = {
  appDirectory: "src",
};

const app = defineConfig({
  routers: {
    api: {
      entry: join(config.appDirectory, "entry-api.ts"),
    },
    ssr: {
      entry: join(config.appDirectory, "entry-ssr.tsx"),
    },
    client: {
      entry: join(config.appDirectory, "entry-client.tsx"),
    },
  },

  tsr: {
    appDirectory: config.appDirectory,
    generatedRouteTree: join(config.appDirectory, "route-tree.gen.ts"),
    quoteStyle: "single",
    semicolons: false,
    customScaffolding: {
      routeTemplate: [
        "%%tsrImports%%\n\n",
        "%%tsrExportStart%%{\n component: RouteComponent\n }%%tsrExportEnd%%\n\n",
        'function RouteComponent() { return "Hello %%tsrPath%%!" }\n',
      ].join(""),
      apiTemplate: [
        'import { json } from "@tanstack/start";\n',
        "%%tsrImports%%\n\n",
        "%%tsrExportStart%%{ GET: ({ request, params }) => { return json({ message:'Hello \"%%tsrPath%%\"!' }) }}%%tsrExportEnd%%\n",
      ].join(""),
    },
  },

  vite: {
    plugins: [
      tailwindcss(),
      tsconfigPathsPlugin({
        projects: ["./tsconfig.json"],
      }),
    ],
  },

  react: {
    babel: {
      plugins: [
        [
          "babel-plugin-react-compiler",
          {
            target: "19",
          },
        ],
      ],
    },
  },
});

// https://discord.com/channels/719702312431386674/1238170697650405547/1300589573080092723
function withGlobalMiddleware(app: App) {
  return {
    ...app,
    config: {
      ...app.config,
      routers: app.config.routers.map((router) => ({
        ...router,
        middleware:
          router.target !== "server"
            ? undefined
            : join(config.appDirectory, "global-middleware.ts"),
      })),
    },
  };
}

export default withGlobalMiddleware(app);
