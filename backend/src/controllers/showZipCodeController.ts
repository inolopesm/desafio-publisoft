import { RequestHandler } from 'express'
import https from 'https'
import { Address } from '../entities/Address'

interface ViaCepError {
  erro: boolean
}

interface ViaCepData {
  cep: string,
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,
  ibge: string,
  gia: string,
  ddd: string,
  siafi: string
}

export const showZipCodeController: RequestHandler<{ zipCode: string }, Address> = (req, res) => {
  const { zipCode } = req.params

  https.get(`https://viacep.com.br/ws/${zipCode}/json/`, httpsResponse => {
    let body = ''

    httpsResponse.on('data', chunk => {
      body += chunk
    })

    httpsResponse.on('end', () => {
      const data: ViaCepError | ViaCepData = JSON.parse(body)
      if ('erro' in data) return res.status(404).end()

      const address: Address = {
        zipCode: data.cep.replace('-', ''),
        state: data.uf,
        city: data.localidade,
        neighborhood: data.bairro,
        street: data.logradouro,
        complement: data.complemento
      }

      return res.json(address)
    })
  })
}
