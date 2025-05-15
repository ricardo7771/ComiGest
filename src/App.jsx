import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Mapa from './pages/Mapa'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Mapa" element={<Mapa />} />

      </Routes>
    </Router>
  )
}

export default App
