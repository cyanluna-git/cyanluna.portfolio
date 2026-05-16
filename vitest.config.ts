import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "node",
    environmentMatchGlobs: [
      ["src/hooks/__tests__/**", "jsdom"],
      ["src/components/__tests__/**", "jsdom"],
      ["src/lib/__tests__/**", "jsdom"],
    ],
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.ts", "src/**/*.test.tsx", "scripts/**/*.test.ts"],
    exclude: ["**/node_modules/**", "**/.next/**", "**/e2e/**"],
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      exclude: [
        "**/node_modules/**",
        "**/.next/**",
        "**/e2e/**",
        "**/*.config.*",
        // Presentation-only RSC components — no business logic, covered by E2E
        "src/components/project/**",
        "src/components/AboutSection.tsx",
        "src/components/Nav.tsx",
        "src/components/IntersectionSection.tsx",
        "src/components/ContactSection.tsx",
        "src/components/LabSection.tsx",
        // Next.js app router pages — RSC server-rendered, covered by E2E
        "src/app/**/page.tsx",
        "src/app/**/layout.tsx",
        "src/app/opengraph-image.tsx",
        "src/app/**/opengraph-image.tsx",
      ],
      thresholds: {
        // 기존 코드 84파일 → 60%부터 시작 (ratchet: 커버리지 올라가면 숫자 올릴 것)
        branches: 60,
        functions: 60,
        lines: 60,
        statements: 60,
      },
    },
  },
});
