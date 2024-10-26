import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: ['test/**/*.ts'],
        coverage: {
            reporter: ['text', 'json', 'html'],
            include: ['src/**'],
            exclude: ['src/types/**', 'src/definitions.ts'],
        },
    },
    esbuild: {
        target: 'esnext',
    },
    resolve: {
        extensions: ['.ts', '.js'],
        conditions: ['import', 'module', 'default'],
    },
})
