module.exports = {
  async redirects() {
    return [
      {
        source: '/api',
        destination: '/',
        permanent: true,
      },
    ];
  },
};
