import dotenv from 'dotenv'
import app from './app'
import { HOST, PORT } from './configs/env'
import knex from './database/knex'

dotenv.config()

knex.connect()
app.listen(PORT, HOST)
