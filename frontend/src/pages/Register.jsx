import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Register(){
    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            await axios.post('http://localhost:3000/api/auth/register', {
                name, email, password
            })
            //after register go to dashboard
            const loginResponse = await axios.post('http://localhost:3000/api/auth/login', {
                email, password
            })
            localStorage.setItem('token', loginResponse.data.token)
            navigate('/dashboard')
        }catch(err){
            setError(err.response?.data?.message || 'Something went wrong')
        }
    }
    return (
        <div>
            <h1>Register</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeHolder="name"
                value={name}
                onChange={(e)=> setName(e.target.value)}
                />
                <input
                type="email"
                placeHolder="Email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                />
                <input 
                type="password"
                placeHolder="Password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                />
                <button type ="submit">Register</button>
            </form>
        </div>
    )
}

export default Register