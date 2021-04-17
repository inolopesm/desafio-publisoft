import { Router } from 'express'
import { listContractsController } from './controllers/listContractsController'
import { listServiceIndustryController } from './controllers/listServiceIndustryController'
import { storeContractController } from './controllers/storeContractController'
import { storeServiceIndustryController } from './controllers/storeServiceIndustryController'

const routes = Router()

routes.post('/serviceIndustries', storeServiceIndustryController)
routes.get('/serviceIndustries', listServiceIndustryController)
routes.post('/contracts', storeContractController)
routes.get('/contracts', listContractsController)

export default routes
