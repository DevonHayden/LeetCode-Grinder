import {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

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
            await axios.post('http://localhost:3000/api/problems',{
                title, number: parseInt(number), difficulty, category, status, notes, url
            }, {
                headers:{Authorization: `Bearer ${token}`}
            })
                setTitle('')
                setNumber('')
                setCategory('')
                setNotes('')
                setUrl('')
                fetchProblems()
                fetchStats()
        }catch(err){
            setError('Failed to add problem')
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
            <h1>Dashboard</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {stats && (
                <div>
                    <h2>Your Stats</h2>
                    <p>Total Problems: {stats.totalProblems}</p>
                    <p>Total Solved: {stats.totalSolved}</p>
                    <h3>Solved by Difficulty</h3>
                    {stats.byDifficulty.map(item => (
                        <p key={item.difficulty}>{item.difficulty}: {item._count}</p>
                    ))}
                </div>
            )}

            {problems.filter(p => p.needsReview).length > 0 && (
                <div>
                    <h2>Reviewed Problems</h2>
                    {problems.filter(p => p.needsReview).map(problem => (
                        <div key ={problem.id}>
                            <h3>{problem.title}</h3>
                            <p>Category: {problem.category} | Difficulty: {problem.difficulty}</p>
                            <button onClick={() => toggleReview(problem.id)}>Remove from Review</button>
                        </div>
                    ))}
                  </div>  
            )}
            <h2>Add Problem</h2>
                 <form onSubmit={addProblem}>
                    <input
                        type="text"
                        placeHolder="Title"
                        value={title}
                        onChange={(e)=> setTitle(e.target.value)}
                        />
                    <input
                        type="number"
                        placeHolder="Problem Number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        />
                    <select value={difficulty} onChange={(e)=> setDifficulty(e.target.value)}>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        <option value="arrays">Arrays</option>
                        <option value="trees">Trees</option>
                        <option value="graphs">Graphs</option>
                        <option value="dp">DP</option>
                    </select>
                     <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="unsolved">Unsolved</option>
                        <option value="attempted">Attempted</option>
                        <option value="solved">Solved</option>
                    </select>
                    <input
                        type="text"
                        placeHolder="Notes (optional)"
                        value={notes}
                        onChange={(e)=> setNotes(e.target.value)}
                        />
                    <input
                        type="text"
                        placeHolder="LeetCode URl (optional)"
                        value={url}
                        onChange={(e)=> setUrl(e.target.value)}
                        />
                    <button type ="submit">Add Problem</button>
                    </form>

            <h2>Filters</h2>
            <select value={filterCategory} onChange ={(e) => setFilterCategory(e.target.value)}>
                <option value ="all">All Catergories</option>
                <option value ="arrays">Arrays</option>
                <option value ="trees">Trees</option>
                <option value ="graphs">Graphs</option>
                <option value ="dp">DP</option>
            </select>
            <select value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value)}>
                <option value="all">All Difficulties</option>
                <option value ="easy">Easy</option>
                <option value ="medium">Medium</option>
                <option value ="hard">Hard</option>
            </select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value ="all">All Statuses</option>
                <option value ="unsolved">Unsolved</option>
                <option value ="attempted">Attempted</option>
                <option value="solved">Solved</option>
            </select>


            <input
                type ="text"
                placeHolder="Search problems ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {filteredProblems.length===0 ? (
                <p>No problems added yet! Add one!</p>
            ) : (
                    
                filteredProblems.map(problem => (
                    <div key={problem.id}>
                         <h3>{problem.title}</h3>
                        <p>Difficulty:{problem.difficulty}</p>
                        <p>Category: {problem.category}</p>
                        <p>Status: {problem.status}</p>
                        <p>Problem #{problem.number}</p>
                        <button onClick={() => deleteProblem(problem.id)}>Delete</button>
                        <button onClick={() => toggleReview(problem.id)}>
                            {problem.needsReview ? 'Remove from Reviewed' : 'Add to Review'}
                        </button>
                    </div>  
                ))
            )}
        </div>
    )
}

export default Dashboard