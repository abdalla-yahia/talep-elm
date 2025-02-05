import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images:{
    remotePatterns:[
    {
      protocol:'https',
      hostname:'encrypted-tbn0.gstatic.com'
    },
    {
      protocol:'https',
      hostname:'img.pikbest.com'
    },
    {
      protocol:'https',
      hostname:'www.noor-book.com'
    },
    {
      protocol:'https',
      hostname:'ktabpdf.com'
    }

    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  /* config options here */
};

export default nextConfig;




