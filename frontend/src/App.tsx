import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './styles/global.css'
import CreateServiceIndustry from './pages/CreateServiceIndustry'
import CreateContract from './pages/CreateContract'
import Header from './components/Header'

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/serviceIndustries/create" component={CreateServiceIndustry} />
        <Route path="/contracts/create" component={CreateContract} />
      </Switch>
    </Router>
  )
}

export default App
