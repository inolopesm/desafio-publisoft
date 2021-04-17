import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'

export default function Header() {
  const { pathname } = useLocation()

  return (
    <Layout.Header>
      <img src="/logo.png" alt="Logo" style={{ display: 'inline-block', float: 'left', margin: '1rem 2rem 1rem 0' }} />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/']} selectedKeys={[pathname]}>
        <Menu.Item key="/dashboard">
          <Link to="/dashboard">Painel Visual</Link>
        </Menu.Item>
        <Menu.Item key="/serviceIndustries/create">
          <Link to="/serviceIndustries/create">Criar Prestador de Serviço</Link>
        </Menu.Item>
        <Menu.Item key="/contracts/create">
          <Link to="/contracts/create">Criar Contrato</Link>
        </Menu.Item>
      </Menu>
    </Layout.Header>
  )
}
