module.exports = {
  env: {
    DOMAIN_BASE:
      process.env.NODE_ENV === 'production'
        ? 'https://your-production-domain.com'
        : 'http://localhost:3000',
  },
};
