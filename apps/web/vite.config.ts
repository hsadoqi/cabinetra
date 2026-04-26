import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'url';
import path from 'path';
import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        server: {
            deps: {
                inline: ['@cabinetra/ui-clients', '@cabinetra/domain-clients', '@cabinetra/ui-components', '@cabinetra/ui-layouts', '@cabinetra/platform-i18n', '@cabinetra/feature-clients'],
            },
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './'),
        },
    },
});

