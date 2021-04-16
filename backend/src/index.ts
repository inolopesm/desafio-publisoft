import dotenv from 'dotenv'
import app from './app'
import { HOST, PORT } from './configs/env'

dotenv.config()

app.listen(PORT, HOST)
