module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/animals',
    pool: {
      min: 1,
      max: 1
    }
  },

  test: {
    client: 'postgresql',
    connection: 'postgres://localhost/animals-test',
    pool: {
      min: 1,
      max: 1
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 1,
      max: 1
    }
  }
};
