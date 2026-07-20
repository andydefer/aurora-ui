import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            'aurora-ui': path.resolve(__dirname, './src/index.ts'),
        },
    },
    server: {
        port: 5173,
        open: '/examples/audio.html',
    },
    build: {
        lib: {
            entry: './src/index.ts',
            name: 'AuroraUI',
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'tailwindcss'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
});