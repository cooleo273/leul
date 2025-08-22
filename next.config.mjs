import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
  eslint: {
    // Avoid failing the build on ESLint errors in Vercel where eslint-config-next may be missing
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Ensure MDX content directories are included in the serverless bundle for fs reads
    outputFileTracingIncludes: {
      // Home uses Projects and Posts previews
      "/src/app/page": [
        "src/app/work/projects/**",
        "src/app/blog/posts/**"
      ],
      // Work index and details
      "/src/app/work/page": ["src/app/work/projects/**"],
      "/src/app/work/[slug]/page": ["src/app/work/projects/**"],
      // Blog details (if used)
      "/src/app/blog/[slug]/page": ["src/app/blog/posts/**"],
    },
  },
};

export default withMDX(nextConfig);
