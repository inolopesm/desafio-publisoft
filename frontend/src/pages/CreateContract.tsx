import React, { useEffect, useState } from 'react'

interface FormData {
  serviceIndustryId: string
  startDate: string
  endDate: string
}

const initialFormDataState: FormData = {
  serviceIndustryId: '', startDate: '', endDate: ''
}

interface ServiceIndustry {
  id: number
  register: string
  name: string
}

export default function CreateContract() {
  const [formData, setFormData] = useState<FormData>(initialFormDataState)
  const [serviceIndustries, setServiceIndustries] = useState<ServiceIndustry[]>([])

  useEffect(() => {
    fetch(process.env.REACT_APP_API_BASE_URL + '/serviceIndustries')
      .then(response => response.json().then(setServiceIndustries))
  }, [])

  function handleChange(changeEvent: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = changeEvent.target
    setFormData({ ...formData, [name]: value })
  }

  async function handleSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault()

    const url = process.env.REACT_APP_API_BASE_URL + '/contracts'

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    if (response.status === 201) {
      setFormData(initialFormDataState)
      window.alert('Prestador cadastrado com sucesso')
    }

    if (response.status === 400) {
      const data = await response.json()
      window.alert(data.message)
    }
  }

  return (
    <>
      <h1>Cadastro de Contrato</h1>
      <form onSubmit={handleSubmit}>
        <label>Prestador de Serviço</label>
        {
          serviceIndustries.length !== 0
          ? (
            <select name="serviceIndustryId" value={formData.serviceIndustryId} onChange={handleChange} required>
              <option> </option>
              {serviceIndustries.map((serviceIndustry, i) => (
                <option key={`${i}${serviceIndustry.id}`} value={serviceIndustry.id}>
                  {serviceIndustry.register}: {serviceIndustry.name}
                </option>
              ))}
            </select>
          )
          : (
            <select disabled></select>
          )
        }
        <label>Data de Início</label>
        <input type="text" name="startDate" value={formData.startDate} onChange={handleChange} minLength={10} maxLength={10} required />

        <label>Data de Fim</label>
        <input type="text" name="endDate" value={formData.endDate} onChange={handleChange} minLength={10} maxLength={10} required />

        <button type="submit">Submeter</button>
      </form>
    </>
  )
}