import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Mapa from './pages/Mapa'
import Login from './pages/Login'
import Actividades from './pages/Actividades'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Mapa" element={<Mapa />} />
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Actividades" element={<Actividades/>}/>

      </Routes>
    </Router>
  )
}

export default App
