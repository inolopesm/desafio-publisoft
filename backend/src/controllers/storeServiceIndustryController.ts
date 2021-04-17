import { RequestHandler } from 'express'
import knex from '../database/knex'

export const storeServiceIndustryController: RequestHandler = async (req, res) => {
  await knex.client('serviceIndustry').insert(req.body)
  return res.status(201).end()
}
