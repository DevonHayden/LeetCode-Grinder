import {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'


function Dashboard(){
    const[problems, setProblems] = useState([])
    const[error, setError] = useState('')
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [title, setTitle] = useState('')
    const [number, setNumber] = useState('')
    const [difficulty, setDifficulty] = useState('easy')
    const [category, setCategory] = useState('')
    const [status, setStatus] = useState('unsolved')
    const [notes, setNotes] = useState('')
    const [url, setUrl] = useState('')
    // one state variable for each field in the add problem form
    const [filterCategory, setFilterCategory] = useState('all')
    const [filterDifficulty, setFilterDifficulty] = useState('all')
    const [filterStatus, setFilterStatus] = useState('all')
// 'all' means no filter applied for that field
    const [stats, setStats] = useState(null)
    const [search, setSearch] = useState('')
    const [editingId, setEditingId] = useState(null)
    //null means no problem is being edited remember this

const filteredProblems = problems.filter(problem => {
        const matchesCategory = filterCategory === 'all' || problem.category === filterCategory
        const matchesDifficulty = filterDifficulty ==='all' || problem.difficulty === filterDifficulty
        const matchesStatus = filterStatus === 'all' || problem.status === filterStatus
        const matchesSearch = search === '' || problem.title.toLowerCase().includes(search.toLowerCase())
        return matchesCategory && matchesDifficulty && matchesStatus && matchesSearch
    })



    useEffect(()=>{
        fetchProblems()
        fetchStats()
        //fetching as soon as it loads
    }, [])
    const fetchProblems = async() =>{
        try{
            const response = await axios.get('http://localhost:3000/api/problems', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setProblems(response.data)
        }catch(err){
            setError('Failed to fetch problem')
        }
    }

    const fetchStats = async() => {
        try{
            const response = await axios.get('http://localhost:3000/api/problems/stats', {
                headers: {Authorization: `Bearer ${token}`}
            })
            setStats(response.data)
        }catch(err){
            console.error('Failed to fetch stats', err)
        }
    }


    const addProblem = async (e)=>{
        e.preventDefault()
        try{
            if(editingId){
                await axios.put(`http://localhost:3000/api/problems/${editingId}`, {
                    title, number: parseInt(number), difficulty, category, status, notes, url
                }, {
                    headers:{Authorization: `Bearer ${token}`}
                })
                setEditingId(null)
            } else {
                await axios.post('http://localhost:3000/api/problems',{
                    title, number: parseInt(number), difficulty, category, status, notes, url
                }, {
                    headers:{Authorization: `Bearer ${token}`}
                })
            }
                setTitle('')
                setNumber('')
                setCategory('')
                setNotes('')
                setUrl('')
                fetchProblems()
                fetchStats()
        }catch(err){
            setError(editingId ? 'Failed to update problem' : 'Failed to add problem')
        }
    }

    const deleteProblem = async (id) => {
        try{
            await axios.delete(`http://localhost:3000/api/problems/${id}`, {
                headers: {Authorization: `Bearer ${token}`}
            })
            fetchProblems()
            fetchStats()
        }catch(err){
            setError('Failed to delete problem')
        }
    } 

    const startEdit = (problem) => {
        setEditingId(problem.id)
        //ie fill with problems curr data
        setTitle(problem.title)
        setNumber(problem.number || '')
        setDifficulty(problem.difficulty)
        setCategory(problem.category)
        setStatus(problem.status)
        setNotes(problem.notes || '')
        setUrl(problem.url || '')
    }

    const toggleReview = async (id) => {
        try{
            await axios.patch(`http://localhost:3000/api/problems/${id}/review`, {}, {
                headers: {Authorization: `Bearer ${token}`}
            })
            fetchProblems()
        }catch(err){
            setError('Failed to update review status')
        }
    }

    return(
        <div>
            <h1 className="text-3xl font-bold text-gray-300 mb-6">Dashboard</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {stats && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-300">Your Stats</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-green-100 border border-green-300 rounded-lg p-4">
                            <p className="text-gray-600 text-sm">Total Problems</p>
                            <p className="text-3xl font-bold text-green-700">{stats.totalProblems}</p>
                        </div>
                        <div className="bg-orange-100 border border-orange-300 rounded-lg p-4">
                            <p className="text-gray-600 text-sm">Total Solved</p>
                            <p className="text-3xl font-bold text-orange-700">{stats.totalSolved}</p>
                        </div>
                        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
                            <p className="text-gray-600 text-sm">Solved by Difficulty</p>
                            {stats.byDifficulty.map(item => (
                                <p key={item.difficulty} className="text-sm font-semibold">
                                    {item.difficulty}: {item._count}
                                </p>
                            ))}
                        </div>
                    </div>
                    </div>
            )}

            {problems.filter(p => p.needsReview).length > 0 && (
                <div className="mb-8 bg-orange-50 border border-orange-300 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4 text-orange-800">Review Queue</h2>
                    <div className="grid grid-cols-1 gap-3">
                        {problems.filter(p => p.needsReview).map(problem => (
                            <div key={problem.id} className="bg-white border border-orange-200 rounded-lg p-4 flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold">{problem.title}</h3>
                                    <p className="text-sm text-gray-600">
                                        {problem.category} • {problem.difficulty}
                                    </p>
                                </div>
                                <button
                                    onClick={() => toggleReview(problem.id)}
                                    className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded px-3 py-1"
                                >
                                    Remove from Review Queue
                                </button>
                            </div>
                        ))}
                        </div>
                    </div>
            )}
                    <div className="mb-8 bg-gray-300 border border-gray-300 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Problem' : 'Add Problem'}</h2>
                        <form onSubmit={addProblem} className="grid grid-cols-1 gap-4">
                            <input
                            type="text"
                            placeHolder="Title"
                            value={title}
                            onChange={(e)=> setTitle(e.target.value)}
                            className="bg-gray-100 border border-gray-300 rounded-lg p-2"
                            />
                            <input
                            type="number"
                            placeHolder="Problem Number"
                            value={number}
                            onChange={(e)=> setNumber(e.target.value)}
                            className="bg-gray-100 border border-gray-300 rounded-lg p-2"
                            />
                            <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            className="bg-gray-100 border border-gray-300 rounded-lg p-2"
                            >
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                            <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="bg-gray-100 border border-gray-300 rounded-lg p-2"
                            >
                                <option value="">Select Category</option>
                                <option value="arrays">Arrays</option>
                                <option value="trees">Trees</option>
                                <option value="graphs">Graphs</option>
                                <option value="dp">DP</option>
                            </select>
                            <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="bg-gray-100 border border-gray-300 rounded-lg p-2"
                            >
                                <option value="unsolved">Unsolved</option>
                                <option value="attempted">Attempted</option>
                                <option value="solved">Solved</option>
                            </select>
                            <input
                            type="text"
                            placeHolder="Notes (optional)"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="bg-gray-100 border border-gray-300 rounded-lg p-2"
                            />
                            <input
                            type="text"
                            placeHolder= "LeetCode URL (optional)"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="bg-gray-100 border border-gray-300 rounded-lg p-2"
                            />
                            <button
                                type="submit"
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded p-2 col-span-2"
                            >
                                {editingId ? 'Update Problem' : 'Add Problem'}
                            </button>
                        </form>
                    </div>

            <div className="mb-8 bg-gray-300 border border-gray-300 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Filters</h2>
                <div className="grid grid-cols-4 gap-4">
                    <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="bg-gray-100 border border-gray-300 rounded-lg p-2"
                    >
                        <option value="all">All Categories</option>
                        <option value="arrays">Arrays</option>
                        <option value="trees">Trees</option>
                        <option value="graphs">Graphs</option>
                        <option value="dp">DP</option>
                    </select>
                    <select
                    value={filterDifficulty}
                    onChange={(e) => setFilterDifficulty(e.target.value)}
                    className="bg-gray-100 border border-gray-300 rounded-lg p-2"
                    >
                        <option value="all">All Difficulties</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                    <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-gray-100 border border-gray-300 rounded-lg p-2"
                    >
                        <option value="all">All Statuses</option>
                        <option value="unsolved">Unsolved</option>
                        <option value="attempted">Attempted</option>
                        <option value="solved">Solved</option>
                    </select>
                    <input 
                    type="text"
                    placeholder="Search problems..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-gray-100 border border-gray-300 rounded-lg p-2"
                />
                </div>
            </div>
            <div className="bg-gray-300 border border-gray-300 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Problems</h2>
                {filteredProblems.length===0 ? (
                    <p className="text-gray-500">No problems Added Yet! Add One!</p>
                ):(
                    <div className="grid grid-cols-1 gap-4">
                        {filteredProblems.map(problem => (
                            <div key={problem.id} className="bg-gray-100 border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-lg">
                                        #{problem.number} {problem.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {problem.category} • {problem.difficulty} • {problem.status}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                    onClick={() => toggleReview(problem.id)}
                                    className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded px-3 py-1"
                                    >
                                        {problem.needsReview ? 'Remove Review' : 'Add Review'}
                                    </button>
                                    <button 
                                    onClick={() => startEdit(problem)}
                                    className={editingId === problem.id
                                        ? "bg-green-800 text-white text-sm font-semibold rounded px-3 py-1"
                                        : "bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded px-3 py-1"
                                    }
                                    >
                                        {editingId === problem.id ? 'Editing...' : 'Edit'}
                                    </button>
                                    <button
                                    onClick={()=> deleteProblem(problem.id)}
                                    className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded px-3 py-1"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                        </div>
                )}
                </div>
            </div>
    )
}    
export default Dashboard