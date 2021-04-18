import { Router } from 'express'
import { listCitiesController } from './controllers/listCitiesController'
import { listContractsController } from './controllers/listContractsController'
import { listServiceIndustryController } from './controllers/listServiceIndustryController'
import { showZipCodeController } from './controllers/showZipCodeController'
import { storeContractController } from './controllers/storeContractController'
import { storeServiceIndustryController } from './controllers/storeServiceIndustryController'

const routes = Router()

routes.post('/serviceIndustries', storeServiceIndustryController)
routes.get('/serviceIndustries', listServiceIndustryController)
routes.post('/contracts', storeContractController)
routes.get('/contracts', listContractsController)
routes.get('/addresses/:zipCode', showZipCodeController)
routes.get('/states/:state/cities', listCitiesController)

export default routes
