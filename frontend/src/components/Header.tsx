import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header>
      <h1>Publicsoft</h1>
      <nav>
        <NavLink to="/serviceIndustries/create">Criar Prestador de Serviço</NavLink>
        &nbsp;|&nbsp;
        <NavLink to="/contracts/create">Criar Contrato</NavLink>
      </nav>
    </header>
  )
}
