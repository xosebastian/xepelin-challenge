const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  coverageReporters: ["json", "html"],
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/coverage/**",
    "!**/jest.config.js",
    "!**/layout.tsx",
    "!**/page.tsx",
    "!**/tailwind.config.ts",
    "!**/postcss.config.js",
    "!**/next.config.js",
    "!**/components/ui/**",
    "!**/api/**",
    "!**/lib/**",
    "!**/theme-provider.tsx",
    "!**/provider.tsx",
  ],
};
module.exports = createJestConfig(customJestConfig);