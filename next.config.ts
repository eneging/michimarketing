import { NextConfig } from "next";

const nextConfig: NextConfig = {
 
  images: {
    domains: ['upload.wikimedia.org', 'images.unsplash.com', 
   "michimarketing.com", "picsum.photos", "i.ytimg.com","cdn.openai.com", "placehold.co","res.cloudinary.com", "drive.google.com"

    ],
  },


  

  env: {
    API_URL: process.env.API_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },



};






export default nextConfig;