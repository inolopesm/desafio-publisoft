import { RequestHandler } from 'express'
import knex from '../database/knex'
import { ServiceIndustry } from '../entities/ServiceIndustry'
import { StoreServiceIndustryDTO } from '../DTOs/StoreServiceIndustryDTO'

export const storeServiceIndustryController: RequestHandler<{}, undefined, StoreServiceIndustryDTO> = async (req, res) => {
  await knex.client<ServiceIndustry>('serviceIndustry').insert(req.body)
  return res.status(201).end()
}
