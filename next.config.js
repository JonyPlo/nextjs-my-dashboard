/** @type {import('next').NextConfig} */
const nextConfig = {
  // Esta configuración es necesaria si queremos usar links de imagenes que vengan del exterior en nuestro proyecto, de esta forma le decimos a next que confié en esos links, y para eso hay que decirle que confié en el protocolo y el hostname de los links de esas imagenes
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
}

module.exports = nextConfig
