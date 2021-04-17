import React, { useEffect, useState } from 'react'
import { differenceInDays } from 'date-fns'
import { Typography, Card, Row, Col, Table } from 'antd'

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

interface ContractDTO {
  key: number
  startDate: string
  endDate: string
  serviceIndustry: string
  daysLeft: number
}

interface ExpiresIn {
  expired: number
  today: number
  sevenDays: number
  fifteenDays: number
  thirtyDays: number
}

export default function Dashboard() {
  const [contracts, setContracts] = useState<ContractDTO[]>([])
  const [expiresIn, setExpiresIn] = useState<ExpiresIn>()

  useEffect(() => {
    fetch(process.env.REACT_APP_API_BASE_URL + '/contracts')
      .then(response => response.json().then((contractsAPI: Contract[]) => {

        const today = new Date()

        const expiresIn: ExpiresIn = {
          expired: 0,
          today: 0,
          sevenDays: 0,
          fifteenDays: 0,
          thirtyDays: 0
        }

        const contracts: ContractDTO[] = []

        for (const contract of contractsAPI) {
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

          let daysLeft = 0

          if (today.getTime() < endDate.getTime()) {
            daysLeft = differenceInDays(endDate, today)
          }

          contracts.push({
            key: contract.id,
            startDate: contract.startDate,
            endDate: contract.endDate,
            serviceIndustry: contract.serviceIndustry.name,
            daysLeft
          })
        }

        setExpiresIn(expiresIn)
        setContracts(contracts)
      }))
  }, [])

  return (
    <div style={{ padding: 16 }}>
      <Typography.Title level={2}>Painel Visual</Typography.Title>

      <Typography.Title level={3}>Contratos</Typography.Title>

      <Row gutter={16} justify="space-between">
        <Col>
          <Card size="small" style={{ minWidth: 160 }}>
            <Typography.Title>{expiresIn?.expired}</Typography.Title>
            <Typography.Title level={5}>Vencidos</Typography.Title>
          </Card>
        </Col>
        <Col>
          <Card size="small" style={{ minWidth: 160 }}>
            <Typography.Title>{expiresIn?.today}</Typography.Title>
            <Typography.Title level={5}>Vencem Hoje</Typography.Title>
          </Card>
        </Col>
        <Col>
          <Card size="small" style={{ minWidth: 160 }}>
            <Typography.Title>{expiresIn?.sevenDays}</Typography.Title>
            <Typography.Title level={5}>Vencem em 7 Dias</Typography.Title>
          </Card>
        </Col>
        <Col>
          <Card size="small" style={{ minWidth: 160 }}>
            <Typography.Title>{expiresIn?.fifteenDays}</Typography.Title>
            <Typography.Title level={5}>Vencem em 15 Dias</Typography.Title>
          </Card>
        </Col>
        <Col>
          <Card size="small" style={{ minWidth: 160 }}>
            <Typography.Title>{expiresIn?.thirtyDays}</Typography.Title>
            <Typography.Title level={5}>Vencem em 30 Dias</Typography.Title>
          </Card>
        </Col>
      </Row>

      <div style={{ padding: 16 }} />

      <Card size="small">
        <Table dataSource={contracts}>
          <Table.Column title="#" dataIndex="key" />
          <Table.Column title="Prestador de Serviço" dataIndex="serviceIndustry" />
          <Table.Column title="Data de Início" dataIndex="startDate" render={(value) => { console.log(typeof value, value); return value; }} />
          <Table.Column title="Data de Fim" dataIndex="endDate" />
          <Table.Column title="Dias Restantes" dataIndex="daysLeft" />
        </Table>
      </Card>
    </div>
  )
}
