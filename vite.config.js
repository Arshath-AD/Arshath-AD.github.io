import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Vite production build configuration with performance optimizations:
 *
 * 1. manualChunks: Splits vendor code into separate cacheable chunks.
 *    - framer-motion (~180KB) is split so changes to app code don't bust its cache.
 *    - react + react-dom are grouped together (they are always needed together).
 *    - lenis (smooth scroll) is split as it's a heavy UI library.
 *
 * 2. assetsInlineLimit: Files < 4KB are inlined as data URIs to save HTTP requests.
 *    Increased slightly to inline small SVGs and tiny images.
 *
 * 3. cssCodeSplit: true (default) — each lazy chunk gets its own CSS file.
 *
 * 4. reportCompressedSize: false — speeds up build by skipping gzip size reporting.
 */
export default defineConfig({
    plugins: [react()],
    base: '/',
    build: {
        // Target modern browsers for smaller bundle (no IE11 polyfills)
        target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
        // Speed up builds by skipping gzip size calculation during development
        reportCompressedSize: false,
        // Increase chunk warning threshold slightly (framer-motion is large)
        chunkSizeWarningLimit: 600,
        rollupOptions: {
            output: {
                /**
                 * Manual code splitting strategy:
                 * - Vendor chunks are hashed separately, enabling long-term browser caching.
                 * - App code changes frequently, so it gets its own chunk.
                 * - Libraries like framer-motion and lenis are stable and cache well.
                 */
                manualChunks: {
                    // React core — stable, cached indefinitely
                    'vendor-react': ['react', 'react-dom'],
                    // Framer Motion — large animation lib, split for caching
                    'vendor-framer': ['framer-motion'],
                    // Lenis smooth scroll — separate chunk
                    'vendor-lenis': ['@studio-freight/react-lenis'],
                },
                // Deterministic file naming with content hash for cache busting
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
            },
        },
        // Inline assets smaller than 4KB as data URIs
        assetsInlineLimit: 4096,
    },
})