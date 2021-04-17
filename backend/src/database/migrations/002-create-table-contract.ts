import { Knex } from 'knex'

export const up = async (knex: Knex) => {
  await knex.schema.createTable('contract', table => {
    table.increments()
    table.integer('serviceIndustryId').notNullable().references('id').inTable('serviceIndustry')
    table.date('startDate').notNullable()
    table.date('endDate').notNullable()
    table.dateTime('deletedAt')
  })
}

export const down = async (knex: Knex) => {
  await knex.schema.dropTable('contract')
}
