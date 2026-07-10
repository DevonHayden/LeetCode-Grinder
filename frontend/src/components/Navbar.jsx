import {Link, useNavigate} from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }
    return(
        <div className=" w-64 min-h-screen bg-gray-900 text-white flex flex-col p-4 fixed left-0 top-0">
            <h1 className="text-green-400 text-2xl font-bold mb-8 cursor-pointer" onClick={() => navigate('/dashboard')}>
                LeetCode Grinder
                </h1>
                <nav className="flex flex-col gap-2">
                    <Link to="/dashboard" className="p-3 rounded hover:bg-gray-700 transition">
                    Dashboard
                    </Link>
                    <Link to="/patterns" className="p-3 rounded hover:bg-gray-700 transition">
                    Patterns
                    </Link>
                    <Link to="/resources" className="p-3 rounded hover:bg-gray-700 transition">
                    Resources
                    </Link>
                </nav>

                <button
                onClick={handleLogout}
                className="mt-auto p-3 bg-red-600 hover:bg-red-700 transition"
                >
                Logout
                </button>
        </div>
    )
}

export default Navbar
