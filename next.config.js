module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/landing',
        permanent: false
      }
    ]
  }  
}
