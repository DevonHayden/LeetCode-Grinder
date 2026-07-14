import {useState} from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'

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
        <div className ="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className ="bg-gray-800 rounded-lg p-8 w-96 border border-gray-700">
                <h1 className="text-3xl font-bold text-green-400 mb-2 text-center">LeetCode Grinder</h1>
                <h2 className=" text-xl text-gray-300 mb-6 text-center">Login</h2>
                {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input 
                        type="email"
                        placeHolder="Email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        className="bg-gray-700 text-white border border-gray-600 rounded-lg p-3 placeholder-gray-400"
                    />
                    <input 
                        type="password"
                        placeHolder="Password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        className="bg-gray-700 text-white border border-gray-600 rounded-lg p-3 placeholder-gray-400"
                    />
                    <button 
                    type="submit" 
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg p-3 transition">
                        
                        Login
                    </button>
                </form>
                <p className="text-gray-400 text-center mt-4">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-green-400 hover:text-green-300">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login