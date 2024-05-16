import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Router from './Routes'
import { AuthProvider } from './context/AuthContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <AuthProvider>
    <Router />  
    </AuthProvider>
    </div>
  )
}

export default App
