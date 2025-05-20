import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Logo from '../images/MeridaLogo.png'
import {Button} from '../components/ui/button'
 

export default function Login(){
const [NombreUser, setNombreUser] =useState('');
const [password,setPassword] =useState('');
const [error, seterror] =useState('');
const navigate = useNavigate();



const handleLogin =(e) =>{
    e.preventDefault()



const validNombreUser = 'Ricardo123'
const validPassword = '12345'

if(NombreUser===validNombreUser & password===validPassword){
    navigate('/admin')
}else{
    setError('credenciales incorrectas')
}

}
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <img src={Logo} alt="Logo" className="mx-auto mb-6 h-20" />
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-left text-gray-600 mb-1">Nombre De Usuario</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={NombreUser}
              onChange={(e) => setNombreUser(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-left text-gray-600 mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 text-lg rounded-lg"
          >
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </div>
  )
}