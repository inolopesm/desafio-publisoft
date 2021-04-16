import env from 'env-var'

export const PORT = env.get('PORT').required().asInt()
export const HOST = env.get('HOST').required().asString()
export const DATABASE_URL = env.get('DATABASE_URL').required().asString()
