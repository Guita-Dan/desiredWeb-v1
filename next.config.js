/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "mybvizcthcwnnjttetaq.supabase.co"
            },
            {
                protocol: "https",
                hostname: "picsum.photos"
            },
        ]
    },
};
module.exports = nextConfig;
