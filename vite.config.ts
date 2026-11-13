/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: { target: 'es2022', cssCodeSplit: false, sourcemap: false },
  test: { include: ['tests/unit/**/*.test.ts'], environment: 'node' },
});
