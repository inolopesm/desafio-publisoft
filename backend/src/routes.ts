import { Router } from 'express'
import { listServiceIndustryController } from './controllers/listServiceIndustryController'
import { storeContractController } from './controllers/storeContractController'
import { storeServiceIndustryController } from './controllers/storeServiceIndustryController'

const routes = Router()

routes.post('/serviceIndustries', storeServiceIndustryController)
routes.get('/serviceIndustries', listServiceIndustryController)
routes.post('/contracts', storeContractController)

export default routes
