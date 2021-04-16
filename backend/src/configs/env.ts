import env from 'env-var'

export const getPort = () => env.get('PORT').required().asInt()
export const getHost = () => env.get('HOST').required().asString()
export const getDatabaseUrl = () => env.get('DATABASE_URL').required().asString()
