import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 60,
    },
  },

  async rewrites() {
    return [
      {
        source: "/zastepstwa",
        destination: "/substitutions",
      },
    ];
  },

  webpack: (config) => {
    checkEnvVariables([
      "NEXT_PUBLIC_TIMETABLE_URL",
      "NEXT_PUBLIC_APP_URL",
      "NEXT_PUBLIC_SCHOOL_NAME_ACCUSATIVE",
      "NEXT_PUBLIC_SCHOOL_SHORT",
      "NEXT_PUBLIC_SCHOOL_WEBSITE",
    ]);

    return config;
  },
};

const checkEnvVariables = (envVars: string[]) => {
  envVars.forEach((envVar) => {
    const value = process.env[envVar];

    if (!value) {
      throw new Error(
        `Error: Missing required environment variable: ${envVar}`,
      );
    }

    if (envVar.endsWith("_URL")) {
      try {
        new URL(value);
      } catch {
        throw new Error(
          `Error: Environment variable ${envVar} is not a valid URL: ${value}`,
        );
      }
    }
  });
};

// export default nextConfig;

const sentryConfig = {
  org: "majrvy",
  project: "zstio-timetable",

  silent: !process.env.CI,

  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: false,
  telemetry: false,
};

export default withSentryConfig(nextConfig, sentryConfig);
