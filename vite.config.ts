import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,
        origin: process.env.VITE_DEV_SERVER_URL ?? 'http://localhost:5173',
        cors: {
            origin: process.env.APP_URL ?? 'http://localhost:8000',
        },
        hmr: {
            host: process.env.VITE_HMR_HOST ?? 'localhost',
            port: Number(process.env.VITE_HMR_PORT ?? 5173),
            protocol: 'ws',
        },
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
    esbuild: {
        jsx: 'automatic',
    },
});
