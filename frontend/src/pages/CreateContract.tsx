import { Button, Card, DatePicker, Form, notification, Select, Typography } from 'antd'
import { useEffect, useState } from 'react'
import Validator from '../utils/Validator'

interface ServiceIndustry {
  id: number
  register: string
  name: string
}

export default function CreateContract() {
  const [form] = Form.useForm()
  const [serviceIndustries, setServiceIndustries] = useState<ServiceIndustry[]>([])

  useEffect(() => {
    fetch(process.env.REACT_APP_API_BASE_URL + '/serviceIndustries')
      .then(response => response.json().then(setServiceIndustries))
  }, [])

  const handleFinish = async (values: Record<string, string>) => {
    if (Date.parse(values.startDate) > Date.parse(values.endDate)) {
      notification.open({
        message: 'Ops!',
        description: 'Data de Início não pode estar depois da Data de Fim'
      })

      return
    }

    const url = process.env.REACT_APP_API_BASE_URL + '/contracts'

    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })

    form.resetFields()

    notification.open({
      message: 'Uhul!',
      description: 'Contrato cadastrado com sucesso'
    })
  }

  const handleFinishFailed = () => {
    notification.open({
      message: 'Ops!',
      description: 'Parece que tem alguns campos necessitando da sua atenção'
    })
  }

  return (
    <>
      <Typography.Title level={2}>Cadastro de Contrato</Typography.Title>
      <Card>
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} form={form} onFinish={handleFinish} onFinishFailed={handleFinishFailed}>
          <Form.Item label="Prestador de Serviço" name="serviceIndustryId" rules={[{ validator: new Validator().isRequired().build }]}>
            <Select placeholder="">
              {serviceIndustries.map((si, i) => (
                <Select.Option key={`serviceIndustry-${i}-${si.id}`} value={si.id}>
                  {si.register}: {si.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Data de Início" name="startDate" rules={[{ validator: new Validator().isRequired().build }]}>
            <DatePicker />
          </Form.Item>

          <Form.Item label="Data de Fim" name="endDate" rules={[{ validator: new Validator().isRequired().build }]}>
            <DatePicker />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <Button type="primary" htmlType="submit">Submeter</Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}
