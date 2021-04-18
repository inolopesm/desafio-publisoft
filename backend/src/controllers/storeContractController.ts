import { RequestHandler } from 'express'
import knex from '../database/knex'
import { StoreContractDTO } from '../DTOs/StoreContractDTO'
import { Contract } from '../entities/Contract'

export const storeContractController: RequestHandler<{}, undefined, StoreContractDTO> = async (req, res) => {
  const { serviceIndustryId, startDate, endDate } = req.body

  const contract: Omit<Contract, 'id'> = {
    serviceIndustryId,
    startDate: new Date(startDate),
    endDate: new Date(endDate)
  }

  await knex.client<Contract>('contract').insert(contract)
  return res.status(201).end()
}
