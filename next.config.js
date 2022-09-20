/** @type {import('next').NextConfig} */
const nextConfig = {
  
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:['help.twitter.com','i.insider.com','eyeofriyadh.com','lh3.googleusercontent.com']
  },
}

module.exports = nextConfig
