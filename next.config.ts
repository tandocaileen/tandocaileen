import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets a phone on the LAN load dev scripts/HMR (otherwise hydration fails).
  allowedDevOrigins: ["192.168.100.89"],
};

export default nextConfig;
