import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Cast process to any to avoid TS error about missing cwd method
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // This ensures your existing code using process.env.API_KEY works
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});