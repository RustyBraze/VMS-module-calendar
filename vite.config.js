import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: "dist",
        minify: "terser",
        rollupOptions: {
            input: "src/main.ts",
            output: {
                format: "umd",  // Universal Module Definition (works with <script>)
                name: "ShiftCalendar",
                dir: "dist",
                entryFileNames: "calendar.min.js"
            }
        }
    }
});
