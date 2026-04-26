import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import js from "@eslint/js";
import onlyWarn from "eslint-plugin-only-warn";
import tseslint from "typescript-eslint";
import turboPlugin from "eslint-plugin-turbo";

const isCI = process.env.CI === "true";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    ...(isCI
      ? {}
      : {
        plugins: {
          onlyWarn,
        },
      }),
  },
  {
    files: ["scripts/**/*.{js,mjs,ts,mts}"],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    ignores: ["dist/**"],
  },
];
