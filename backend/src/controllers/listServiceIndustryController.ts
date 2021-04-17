import { RequestHandler } from 'express'
import knex from '../database/knex'
import { ServiceIndustryDTO } from '../DTOs/ServiceIndustryDTO'
import { ServiceIndustry } from '../entities/ServiceIndustry'

export const listServiceIndustryController: RequestHandler<{}, ServiceIndustryDTO[]> = async (_req, res) => {
  const serviceIndustries = await knex.client<ServiceIndustry>('serviceIndustry')
    .select(['id', 'register', 'name'])
    .whereNull('deletedAt')
  return res.json(serviceIndustries)
}
