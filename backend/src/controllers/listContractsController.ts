import { RequestHandler } from 'express'
import knex from '../database/knex'

export const listContractsController: RequestHandler = async (_req, res) => {
  const contractDTOs = await knex.client('contract')
    .select([
      'contract.id', 'contract.serviceIndustryId', 'contract.startDate', 'contract.endDate',
      'serviceIndustry.name', 'serviceIndustry.register'
    ])
    .innerJoin('serviceIndustry', 'contract.serviceIndustryId', 'serviceIndustry.id')
  return res.json(contractDTOs)
}
