import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'

function App() {

  return (
   <Router>
    <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
    </Routes>
   </Router>
  )
}

export default App
