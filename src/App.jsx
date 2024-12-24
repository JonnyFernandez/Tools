import { Route, Router, Routes } from 'react-router-dom'


import { Home, Calculator, Butget, LocalSale } from './views'
import { Nav } from './components'
import './App.css'

function App() {

  return (
    <div>

      <Nav />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/calc" element={<Calculator />} />
        <Route path="/butget" element={<Butget />} />
        <Route path="/local-sale" element={<LocalSale />} />
      </Routes>
    </div>
  )
}

export default App
