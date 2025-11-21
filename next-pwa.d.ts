// next-pwa.d.ts
declare module 'next-pwa' {
    import { NextConfig } from 'next';
  
    interface PWAConfig {
      dest: string;
      sw?: string;
      disable?: boolean;
      register?: boolean;
      scope?: string;
      cacheOnFrontEndNav?: boolean;
      aggressiveFrontEndNavCaching?: boolean;
      reloadOnOnline?: boolean;
      swcMinify?: boolean;
      workboxOptions?: object;
      fallbacks?: {
        document?: string;
        image?: string;
        audio?: string;
        video?: string;
        font?: string;
      };
      // Add other options as needed from the next-pwa documentation
    }
  
    function withPWA(config: PWAConfig): (nextConfig: NextConfig) => NextConfig;
  
    export = withPWA;
}
