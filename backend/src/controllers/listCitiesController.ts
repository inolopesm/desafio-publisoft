import { RequestHandler } from 'express'
import https from 'https'

interface City {
  id: number
  nome: string
  municipio: {
    id: number
    name: string
    microregiao: {
      id: number
      nome: string
      mesorregiao: {
        id: number
        nome: string
        UF: {
          id: number
          sigla: string
          nome: string
          regiao: {
            id: number
            sigla: string
            nome: string
          }
        }
      }
    }
  }
}

export const listCitiesController: RequestHandler<{ state: string }, string[]> = (req, res) => {
  const { state } = req.params
  https.get(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/distritos`,
    httpResponse => {
      let body = ''

      httpResponse.on('data', chunk => {
        body += chunk
      })

      httpResponse.on('end', () => {
        const data: City[] = JSON.parse(body)
        const cities = data.map(city => city.nome)
        return res.json(cities)
      })
    }
  )
}
