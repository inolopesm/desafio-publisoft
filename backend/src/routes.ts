import { Router } from 'express'
import { listServiceIndustryController } from './controllers/listServiceIndustryController'
import { storeServiceIndustryController } from './controllers/storeServiceIndustryController'

const routes = Router()

routes.post('/serviceIndustries', storeServiceIndustryController)
routes.get('/serviceIndustries', listServiceIndustryController)

export default routes
