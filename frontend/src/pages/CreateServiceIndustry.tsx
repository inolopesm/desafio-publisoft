import React, { useState } from 'react'

interface FormData {
  type: string
  register: string
  name: string
  email: string
  zipCode: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
}

const initialFormDataState: FormData = {
  type: '', register: '', name: '', email: '', zipCode: '', street: '',
  number: '', complement: '', neighborhood: '', city: '', state: ''
}

export default function CreateServiceIndustry() {
  const [formData, setFormData] = useState<FormData>(initialFormDataState)

  function handleChange(changeEvent: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = changeEvent.target
    let changedValue = value

    if (['register', 'cep', 'number'].includes(name)) {
      changedValue = changedValue.replace(/\D/, '')
    }

    setFormData({ ...formData, [name]: changedValue })
  }

  async function handleSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault()

    const url = process.env.REACT_APP_API_BASE_URL + '/serviceIndustries'

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
      <h2>Cadastro de Prestador</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tipo</label>
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option> </option>
            <option>Pessoa Física</option>
            <option>Pessoa Jurídica</option>
          </select>
        </div>

        <div>
          <label>CPF/CNPJ</label>
          <input type="text" name="register" value={formData.register} onChange={handleChange} minLength={11} maxLength={14} required />
          <small>Apenas números</small>
        </div>

        <div>
          <label>Nome/Razão Social</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} maxLength={50} required />
        </div>

        <div>
          <label>E-mail</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} maxLength={100} required />
        </div>

        <fieldset>
          <legend>Endereço</legend>
          <div>
          <label>CEP</label>
            <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} minLength={8} maxLength={8} required />
            <small>Apenas números</small>
          </div>

          <div>
            <label>UF</label>
            <select name="state" value={formData.state} onChange={handleChange} required>
              <option> </option>
              <option>AC</option>
              <option>AL</option>
              <option>AP</option>
              <option>AM</option>
              <option>BA</option>
              <option>CE</option>
              <option>DF</option>
              <option>ES</option>
              <option>GO</option>
              <option>MA</option>
              <option>MT</option>
              <option>MS</option>
              <option>MG</option>
              <option>PA</option>
              <option>PB</option>
              <option>PR</option>
              <option>PE</option>
              <option>PI</option>
              <option>RJ</option>
              <option>RN</option>
              <option>RS</option>
              <option>RO</option>
              <option>RR</option>
              <option>SC</option>
              <option>SP</option>
              <option>SE</option>
              <option>TO</option>
            </select>
          </div>

          <div>
            <label>Cidade</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} maxLength={255} required />
          </div>

          <div>
            <label>Bairro</label>
            <input type="text" name="neighborhood" value={formData.neighborhood} onChange={handleChange} maxLength={255} required />
          </div>

          <div>
            <label>Logradouro</label>
            <input type="text" name="street" value={formData.street} onChange={handleChange} maxLength={255} required />
          </div>

          <div>
            <label>Número</label>
            <input type="text" name="number" value={formData.number} onChange={handleChange} maxLength={5} required />
            <small>Apenas números. Se não houver, informe o número 0 (zero)</small>
          </div>

          <div>
            <label>Complemento</label>
            <input type="text" name="complement" value={formData.complement} onChange={handleChange} maxLength={255} required />
            <small>Se não houver, informe algo como "Não há"</small>
          </div>
        </fieldset>
        <button type="submit">Submeter</button>
      </form>
    </>
  )
}
