import { Router } from 'express'
import { storeServiceIndustry } from './controllers/storeServiceIndustry'

const routes = Router()

routes.post('/serviceIndustry', storeServiceIndustry)

export default routes
