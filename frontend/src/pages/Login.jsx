import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Login(){
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async(e)=> {
        e.preventDefault()
        //prevents page from refreshing on a submit
        try{
            const response = await axios.post('http://localhost:3000/api/auth/login', {
                email, password
            })
            //sending login request to B.E
            localStorage.setItem('token', response.data.token)
            //saving jwt to local storage to remember user is logged in
            navigate('/dashboard')
        }catch(err){
            setError(err.response?.data?.message || 'Something went wrong')
            //if login fails send error message
        }
    }
    return (
        <div>
            <h1>Login</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login