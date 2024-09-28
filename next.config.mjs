/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/pantrypulse-27c70.appspot.com/o/**", // This matches Firebase Storage URLs
      },
    ],
  },
};
export default nextConfig;
