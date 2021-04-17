import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import 'antd/dist/antd.css'
import CreateServiceIndustry from './pages/CreateServiceIndustry'
import CreateContract from './pages/CreateContract'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Router>
        <Header />
        <Layout.Content>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/serviceIndustries/create" component={CreateServiceIndustry} />
            <Route path="/contracts/create" component={CreateContract} />
          </Switch>
        </Layout.Content>
      </Router>
    </Layout>
  )
}

export default App
