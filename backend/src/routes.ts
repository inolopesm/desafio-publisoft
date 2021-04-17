import { Router } from 'express'
import { listServiceIndustry } from './controllers/listServiceIndustry'
import { storeServiceIndustry } from './controllers/storeServiceIndustry'

const routes = Router()

routes.post('/serviceIndustries', storeServiceIndustry)
routes.get('/serviceIndustries', listServiceIndustry)

export default routes
