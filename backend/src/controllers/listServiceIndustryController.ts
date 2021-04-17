import { RequestHandler } from 'express'
import knex from '../database/knex'

export const listServiceIndustryController: RequestHandler = async (_req, res) => {
  const serviceIndustries = await knex.client('serviceIndustry').select(['id', 'register', 'name'])
  return res.json(serviceIndustries)
}