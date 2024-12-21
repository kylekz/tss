import module from "node:module";
import eslintPluginTailwind from "eslint-plugin-tailwindcss";
import eslintPluginTanStackQuery from "eslint-plugin-tanstack-query";
import eslintPluginTanStackRouter from "eslint-plugin-tanstack-router";
import globals from "globals";
import tseslint from "typescript-eslint";

const require = module.createRequire(import.meta.url);

export default tseslint.config(
  ...eslintPluginTailwind.configs["flat/recommended"],
  ...eslintPluginTanStackQuery.configs["flat/recommended"],
  ...eslintPluginTanStackRouter.configs["flat/recommended"],
  // react compiler rules
  {
    name: "react-compiler/recommended",
    plugins: {
      "react-compiler": require("eslint-plugin-react-compiler"),
    },
    rules: {
      "react-compiler/react-compiler": "error",
    },
  },
  // drizzle rules
  {
    name: "drizzle/recommended",
    plugins: {
      drizzle: require("eslint-plugin-drizzle"),
    },
    rules: {
      "drizzle/enforce-delete-with-where": [
        "error",
        { drizzleObjectName: ["db", "indexer"] },
      ],
      "drizzle/enforce-update-with-where": [
        "error",
        { drizzleObjectName: ["db", "indexer"] },
      ],
    },
  },
  // react google translate rules
  {
    name: "react-google-translate/recommended",
    plugins: {
      "react-google-translate": require("eslint-plugin-react-google-translate"),
    },
    rules: {
      "react-google-translate/no-conditional-text-nodes-with-siblings": "error",
      "react-google-translate/no-return-text-nodes": "error",
    },
  },
  // misc
  {
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      tailwindcss: {
        callees: ["cx", "cva"],
        whitelist: ["toaster"],
      },
    },
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
      "react-refresh/only-export-components": "off",
      "unicorn/no-useless-undefined": "off", // a quickfix for server function
    },
  },
  {
    ignores: [".vinxi", ".output"],
  }
);
