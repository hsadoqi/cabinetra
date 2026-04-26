/**
 * Base Next.js configuration for all Cabinetra applications
 * Applications should extend this configuration for consistency
 * 
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    // Headers for proper cache control to prevent stale module issues
    headers: async () => {
        return [
            {
                source: "/:path((?!.*\\.json)(?!_next).*)*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=3600, must-revalidate",
                    },
                ],
            },
            {
                source: "/_next/static/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            {
                source: "/:path*\\.json",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "no-cache, no-store, must-revalidate",
                    },
                ],
            },
        ]
    },
    // Ensure TypeScript strict mode for better type safety
    typescript: {
        tsconfigPath: "./tsconfig.json",
    },
};

export default nextConfig;
