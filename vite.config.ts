import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"), // Correct entry point
      name: "ReactNewCalendar",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "cjs"], // Output both ESM and CommonJS
    },
    rollupOptions: {
      external: ["react", "react-dom"], // Prevents bundling React
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
