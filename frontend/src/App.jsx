import { BrowserRouter, Routes, Route } from 'react-router-dom'
// BrowserRouter handles the URL
// Routes and Route define which component shows at which URL
import Login from './pages/Login'
//importing the login page from Login.jsx
import Register from './pages/Register'
//importing from Register.jsx
import Dashboard from './pages/Dashboard'
//importing from Dashboard.jsx

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App