import { RequestHandler } from 'express'
import knex from '../database/knex'
import { ContractDTO } from '../DTOs/ContractDTO'

interface Row {
  id: number
  serviceIndustryId: number
  startDate: Date
  endDate: Date
  name: string
  register: string
}

export const listContractsController: RequestHandler<{}, ContractDTO[]> = async (_req, res) => {
  const rows: Row[] = await knex.client('contract')
    .select([
      'contract.id', 'contract.serviceIndustryId', 'contract.startDate', 'contract.endDate',
      'serviceIndustry.name', 'serviceIndustry.register'
    ])
    .innerJoin('serviceIndustry', 'contract.serviceIndustryId', 'serviceIndustry.id')
    .whereNull('contract.deletedAt')

  const contractDTOs = rows.map(row => ({
    id: row.id,
    startDate: row.startDate.toISOString().replace(/T.*/, ''),
    endDate: row.endDate.toISOString().replace(/T.*/, ''),
    serviceIndustry: {
      id: row.serviceIndustryId,
      name: row.name,
      register: row.register
    }
  }))

  return res.json(contractDTOs)
}
