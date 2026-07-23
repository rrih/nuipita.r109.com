import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
import type { NextConfig } from "next";
const nextConfig: NextConfig = { poweredByHeader:false, images:{unoptimized:true}, turbopack:{root:__dirname}, async headers(){return [{source:"/sw.js",headers:[{key:"Cache-Control",value:"no-cache"}]},{source:"/(.*)",headers:[{key:"X-Content-Type-Options",value:"nosniff"},{key:"X-Frame-Options",value:"SAMEORIGIN"},{key:"Referrer-Policy",value:"strict-origin-when-cross-origin"},{key:"Permissions-Policy",value:"camera=(), microphone=(), geolocation=()"}]}]}};
export default nextConfig;
