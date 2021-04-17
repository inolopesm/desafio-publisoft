import React, { useEffect, useState } from 'react'
import { differenceInDays } from 'date-fns'

interface Contract {
  id: number
  startDate: string
  endDate: string
  serviceIndustry: {
    id: number
    register: string
    name: string
  }
}

interface ExpiresIn {
  expired: number
  today: number
  sevenDays: number
  fifteenDays: number
  thirtyDays: number
}

export default function Dashboard() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [expiresIn, setExpiresIn] = useState<ExpiresIn>()

  useEffect(() => {
    fetch(process.env.REACT_APP_API_BASE_URL + '/contracts')
      .then(response => response.json().then((contracts: Contract[]) => {
        setContracts(contracts)
        const today = new Date()

        const expiresIn: ExpiresIn = {
          expired: 0,
          today: 0,
          sevenDays: 0,
          fifteenDays: 0,
          thirtyDays: 0
        }

        for (const contract of contracts) {
          const endDate = new Date(contract.endDate)

          if (endDate.getTime() > today.getTime()) {
            expiresIn.expired++
          } else {
            const days = differenceInDays(new Date(contract.endDate), today)

            if (days === 0) {
              expiresIn.today++
            } else if (days <= 7) {
              expiresIn.sevenDays++
            } else if (days <= 15) {
              expiresIn.fifteenDays++
            } else if (days <= 30) {
              expiresIn.thirtyDays++
            }
          }
        }

        setExpiresIn(expiresIn)
      }))
  }, [])

  return (
    <>
      <h2>Painel Visual</h2>
      <h3>Contratos</h3>
      <ul>
        <li>
          <strong>Vencidos:</strong> {expiresIn?.expired}
        </li>
        <li>
          <strong>Vencem hoje:</strong> {expiresIn?.today}
        </li>
        <li>
          <strong>Vencem em 7 dias:</strong> {expiresIn?.sevenDays}
        </li>
        <li>
          <strong>Vencem em 15 dias:</strong> {expiresIn?.fifteenDays}
        </li>
        <li>
          <strong>Vencem em 30 dias:</strong> {expiresIn?.thirtyDays}
        </li>
      </ul>
      <p>
        <em>Dica: passe o mouse por cima do nome do prestador de serviço para visualizar seu CPF/CNPJ.</em>
        </p>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Prestador de Serviço</th>
            <th>Data de Início</th>
            <th>Data de Fim</th>
            <th>Dias Restantes</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract, i) => {
            const today = new Date()
            const endDate = new Date(contract.endDate)

            let daysLeft = 0

            if (today.getTime() < endDate.getTime()) {
              daysLeft = differenceInDays(today, endDate)
            }

            return (
              <tr key={`contract-${i}-${contract.id}`}>
                <td>{contract.id}</td>
                <td title={contract.serviceIndustry.register}>{contract.serviceIndustry.name}</td>
                <td>{contract.startDate.replace(/T.*/, '')}</td>
                <td>{contract.endDate.replace(/T.*/, '')}</td>
                <td>{daysLeft} dias</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
