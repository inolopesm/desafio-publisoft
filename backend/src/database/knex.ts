import Knex, { Knex as KnexClient } from 'knex'
import { DATABASE_URL } from '../configs/env'


const knex = {
  client: undefined as unknown as KnexClient,

  connect () {
    knex.client = Knex({
      client: 'pg',
      connection: DATABASE_URL
    })
  }
}

export default knex
