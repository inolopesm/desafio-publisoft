import { Knex } from 'knex'

export const up = async (knex: Knex) => {
  await knex.schema.createTable('serviceIndustry', table => {
    table.increments()
    table.string('type', 15).notNullable()
    table.string('register', 14).notNullable()
    table.string('name', 50).notNullable()
    table.string('email', 100).notNullable()
    table.string('zipCode', 8).notNullable()
    table.string('street', 255).notNullable()
    table.string('number', 5).notNullable()
    table.string('complement', 255).notNullable()
    table.string('neighborhood', 255).notNullable()
    table.string('city', 255).notNullable()
    table.string('state', 2).notNullable()
    table.dateTime('deletedAt')
  })
}

export const down = async (knex: Knex) => {
  await knex.schema.dropTable('serviceIndustry')
}
