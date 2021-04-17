import { RequestHandler } from 'express'
import knex from '../database/knex'

export const listContractsController: RequestHandler = async (_req, res) => {
  const rows = await knex.client('contract')
    .select([
      'contract.id', 'contract.serviceIndustryId', 'contract.startDate', 'contract.endDate',
      'serviceIndustry.name', 'serviceIndustry.register'
    ])
    .innerJoin('serviceIndustry', 'contract.serviceIndustryId', 'serviceIndustry.id')
    .whereNull('contract.deletedAt')

  const contractDTOs = rows.map(row => {
    return {
      id: row.id,
      startDate: row.startDate.toISOString().replace(/T.*/, ''),
      endDate: row.endDate.toISOString().replace(/T.*/, ''),
      serviceIndustry: {
        id: row.serviceIndustryId,
        name: row.name,
        register: row.register
      }
    }
  })

  return res.json(contractDTOs)
}
