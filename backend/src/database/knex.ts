import Knex, { Knex as KnexClient } from 'knex'


const knex = {
  client: undefined as unknown as KnexClient,

  connect (uri: string) {
    knex.client = Knex({
      client: 'pg',
      connection: uri
    })
  }
}

export default knex
