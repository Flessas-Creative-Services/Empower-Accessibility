export default {
  root: true,
  ignorePatterns: [
    "dist/",
    ".astro/",
    "node_modules/",
    "public/",
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: process.cwd(),
  },
  extends: [
    "eslint:recommended",
    "plugin:astro/recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["astro", "react", "react-hooks", "@typescript-eslint"],
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
    },
    {
      files: ["**/*.ts", "**/*.tsx"],
      rules: {
        "react/prop-types": "off", // TypeScript handles types
      },
    },
  ],
};
