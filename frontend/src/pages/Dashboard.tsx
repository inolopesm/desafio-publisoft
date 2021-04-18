import { useEffect, useState } from 'react'
import { differenceInDays } from 'date-fns'
import { Typography, Card, Row, Col, Table, Statistic } from 'antd'

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
    <>
      <Typography.Title level={2}>Painel Visual</Typography.Title>

      <Typography.Title level={3}>Contratos</Typography.Title>

      <Row gutter={16} justify="space-between" style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Card size="small">
            <Statistic title="Vencidos" value={expiresIn?.expired} />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Statistic title="Vencem Hoje" value={expiresIn?.today} />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Statistic title="Vencem em 7 Dias" value={expiresIn?.sevenDays} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} justify="space-between" style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Card size="small">
            <Statistic title="Vencem em 15 Dias" value={expiresIn?.fifteenDays} />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Statistic title="Vencem em 30 Dias" value={expiresIn?.thirtyDays} />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Statistic title="Total" value={contracts.length} />
          </Card>
        </Col>
      </Row>

      <Card size="small">
        <Table dataSource={contracts}>
          <Table.Column title="#" dataIndex="key" />
          <Table.Column title="Prestador de Serviço" dataIndex="serviceIndustry" />
          <Table.Column title="Data de Início" dataIndex="startDate" />
          <Table.Column title="Data de Fim" dataIndex="endDate" />
          <Table.Column title="Dias Restantes" dataIndex="daysLeft" />
        </Table>
      </Card>
    </>
  )
}
