import { AutoComplete, Form, Input, Select, Card, Typography, Button, notification } from 'antd'
import { ChangeEvent, useState } from 'react'
import Validator from '../utils/Validator'

interface Address {
  zipCode: string
  state: string
  city: string
  neighborhood: string
  street: string
  complement: string
}

const mapCity = (city: string) => ({ value: city })

export default function CreateServiceIndustry() {
  const [form] = Form.useForm()
  const [cities, setCities] = useState<string[]>([])

  const handleFinish = async (values: Record<string, string>) => {
    const url = process.env.REACT_APP_API_BASE_URL + '/serviceIndustries'

    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })

    form.resetFields()

    notification.open({
      message: 'Uhul!',
      description: 'Prestador cadastrado com sucesso'
    })
  }

  const handleFinishFailed = () => {
    notification.open({
      message: 'Ops!',
      description: 'Parece que tem alguns campos necessitando da sua atenção'
    })
  }

  const handleZipCodeChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (/\d{8}/.test(value) === false) return
    const response = await fetch(process.env.REACT_APP_API_BASE_URL + `/addresses/${value}`)
    if (response.status === 404) return
    const data: Address = await response.json()
    form.setFieldsValue(data)
  }

  const handleStateChange = async (value: string | undefined) => {
    if (value === undefined && value === '') return
    const response = await fetch(process.env.REACT_APP_API_BASE_URL + `/states/${value}/cities`)
    const data: string[] = await response.json()
    setCities(data)
  }

  return (
    <>
      <Typography.Title level={2}>Cadastro de Prestador</Typography.Title>
      <Card>
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} form={form} onFinish={handleFinish} onFinishFailed={handleFinishFailed}>
          <Form.Item label="Tipo" name="type" rules={[{ validator: new Validator().isRequired().build }]}>
            <Select placeholder="Física ou Jurídica?">
              <Select.Option value="Pessoa Física">Pessoa Física</Select.Option>
              <Select.Option value="Pessoa Jurídica">Pessoa Jurídica</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="CPF/CNPJ" name="register" rules={[{ validator: new Validator().isRequired().onlyNumbers().onlyLengths([11, 14]).build }]}>
            <Input placeholder="12312312312 (apenas números)" />
          </Form.Item>

          <Form.Item label="Nome/Razão Social" name="name" rules={[{ validator: new Validator().isRequired().maxLength(50).build }]}>
            <Input placeholder="José Arlindo Santos ou JAS Eireli" />
          </Form.Item>

          <Form.Item label="E-mail" name="email" rules={[{ validator: new Validator().isRequired().isEmail().maxLength(100).build }]}>
            <Input placeholder="josearlindo@jaseireli.com" />
          </Form.Item>

          <Form.Item label="CEP" name="zipCode" rules={[{ validator: new Validator().isRequired().onlyLength(8).build }]}>
            <Input placeholder="01001000 (apenas números)" onChange={handleZipCodeChange} />
          </Form.Item>

          <Form.Item label="UF" name="state" rules={[{ validator: new Validator().isRequired().build }]}>
            <Select placeholder="PB? PE? SP?" onChange={handleStateChange}>
              {
                ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']
                .map((state, i) => <Select.Option key={`state-${i}`} value={state}>{state}</Select.Option>)
              }
            </Select>
          </Form.Item>

          <Form.Item label="Cidade" name="city" rules={[{ validator: new Validator().isRequired().maxLength(255).inArray(cities, true).build }]}>
            <AutoComplete options={cities.map(mapCity)} placeholder="João Pessoa? Recife? São Paulo?" />
          </Form.Item>

          <Form.Item label="Bairro" name="neighborhood" rules={[{ validator: new Validator().isRequired().maxLength(255).build }]}>
            <Input placeholder="Torre? Afogados? Vila Maladalena?" />
          </Form.Item>

          <Form.Item label="Logradouro" name="street" rules={[{ validator: new Validator().isRequired().maxLength(255).build }]}>
            <Input placeholder="Rua A? Avenida B? Estrada C?" />
          </Form.Item>

          <Form.Item label="Número" name="number" rules={[{ validator: new Validator().isRequired().onlyNumbers().maxLength(5).build }]}>
            <Input placeholder="Se não houver, deixa o número 0 (zero)" />
          </Form.Item>

          <Form.Item label="Complemento" name="complement" rules={[{ validator: new Validator().isRequired().maxLength(255).build }]}>
            <Input placeholder="Se não houver, e for casa, coloca &quot;casa&quot;, ou algo como &quot;não há&quot;" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
            <Button type="primary" htmlType="submit">Submeter</Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}
