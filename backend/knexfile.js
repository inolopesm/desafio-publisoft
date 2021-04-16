require('ts-node/register')
require('dotenv').config()
const path = require('path')

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: path.resolve('src', 'database', 'migrations')
  }
}
