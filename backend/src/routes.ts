import { Router } from 'express'
import { storeServiceIndustry } from './controllers/storeServiceIndustry'

const routes = Router()

routes.post('/serviceIndustries', storeServiceIndustry)

export default routes
