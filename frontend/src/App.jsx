import Login from './pages/Login'
//importing the login page from Login.jsx
import Register from './pages/Register'
//importing from Register.jsx
import Dashboard from './pages/Dashboard'
//importing from Dashboard.jsx
import Patterns from './pages/Patterns'
//importing from Patterns.jsx
import Resources from './pages/Resources'
//importing from Resources.jsx
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

function Layout(){
  const location = useLocation()
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register'
  return(
    <div className="flex">
      {!hideNavbar && <Navbar />}
      <div className={!hideNavbar ? 'ml-64 flex-1 p-8 bg-gray-700 min-h-screen' : 'flex-1'}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/patterns" element={<Patterns/>} />
          <Route path="/resources" element={<Resources/>} />
        </Routes>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
        <Layout />
    </BrowserRouter>
  )
}

export default App