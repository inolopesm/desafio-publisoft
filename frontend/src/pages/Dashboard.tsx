import React, { useEffect, useState } from 'react'

interface Contract {
  id: number
  serviceIndustryId: number
  startDate: string
  endDate: string
  register: string
  name: string
}

export default function Dashboard() {
  const [contracts, setContracts] = useState<Contract[]>([])

  useEffect(() => {
    fetch(process.env.REACT_APP_API_BASE_URL + '/contracts')
      .then(response => response.json().then(setContracts))
  }, [])

  return (
    <>
      <h2>Painel Visual</h2>
      <h3>Contratos</h3>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Prestador de Serviço</th>
            <th>Data de Início</th>
            <th>Data de Fim</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((contract, i) => (
            <tr key={`contract-${i}-${contract.id}`}>
              <td>{contract.id}</td>
              <td title={contract.register}>{contract.name}</td>
              <td>{contract.startDate.replace(/T.*/, '')}</td>
              <td>{contract.endDate.replace(/T.*/, '')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
