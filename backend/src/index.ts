import dotenv from 'dotenv'
import app from './app'
import { getDatabaseUrl, getHost, getPort } from './configs/env'
import knex from './database/knex'

dotenv.config()

knex.connect(getDatabaseUrl())
app.listen(getPort(), getHost())
