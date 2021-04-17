import { RequestHandler } from 'express'
import knex from '../database/knex'

export const storeContractController: RequestHandler = async (req, res) => {
  await knex.client('contract').insert(req.body)
  return res.status(201).end()
}
