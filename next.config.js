module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: false
      }
    ]
  } 
}
