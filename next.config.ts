import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Serve images straight from CloudFront instead of Vercel's /_next/image
     * optimizer. The Hobby plan's monthly image-transformation quota ran out
     * (402 OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED), which broke every event
     * cover that hadn't already been cached. Remove this if the project moves
     * to a plan with enough optimization quota.
     */
    unoptimized: true,
    remotePatterns: [
      {
        // Organiser + event cover images served from the CityTales CDN
        protocol: "https",
        hostname: "d20k5uz2q15f9b.cloudfront.net",
        pathname: "/**",
      },
      {
        // Origin bucket behind the CDN (some records expose the S3 URL directly)
        protocol: "https",
        hostname: "citytales-media-prod.s3.ap-south-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },

  async headers() {
    return [
      {
        /**
         * apple-app-site-association has no file extension, so it would otherwise be
         * served as application/octet-stream and iOS would reject the association —
         * the link then opens in Safari instead of the app.
         *
         * The file itself lives in public/.well-known/, NOT as an app-router route
         * handler. A route handler at src/app/.well-known/... builds correctly and
         * works under `next dev`, but was not served on Vercel (404 in production).
         * Apple's own guidance is to serve it from public/.
         *
         * assetlinks.json needs no entry here — the .json extension is enough.
         *
         * Universal Links also require no redirects on this path, so don't add one.
         */
        source: "/.well-known/apple-app-site-association",
        headers: [
          { key: "Content-Type", value: "application/json" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
    ];
  },
};

export default nextConfig;
