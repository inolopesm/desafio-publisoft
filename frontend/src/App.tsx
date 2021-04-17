import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import './styles/global.css'
import CreateServiceIndustry from './pages/CreateServiceIndustry'
import CreateContract from './pages/CreateContract'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/dashboard" />
        </Route>

        <Route path="/dashboard" component={Dashboard} />
        <Route path="/serviceIndustries/create" component={CreateServiceIndustry} />
        <Route path="/contracts/create" component={CreateContract} />
      </Switch>
    </Router>
  )
}

export default App
