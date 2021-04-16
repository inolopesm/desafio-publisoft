import { RequestHandler } from 'express'

interface StoreServiceIndustryDTO {
  type: string
  register: string
  name: string
  email: string
  zipCode: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
}

export const storeServiceIndustry: RequestHandler = async (req, res) => {
  const data: StoreServiceIndustryDTO = req.body
  return res.status(201).end()
}
