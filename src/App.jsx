import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Mapa from './pages/Mapa'
import Login from './pages/Login'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Mapa" element={<Mapa />} />
        <Route path="/Login" element={<Login/>}/>

      </Routes>
    </Router>
  )
}

export default App
