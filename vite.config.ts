import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { readFileSync } from 'fs';

export default defineConfig({
  assetsInclude: ['**/*.numbers', '**/*.xlsx'],
	plugins: [
    tailwindcss(),
    sveltekit(),
    {
      name: "sheet-base64",
      transform(code, id) {
        if(!id.match(/\.(numbers|xlsx)$/)) return;
        const data = readFileSync(id, "base64");
        return `export default '${data}'`;
      }
    },
  ],
  optimizeDeps: {
    exclude: ['svelte-headless-table'],
  },
});
