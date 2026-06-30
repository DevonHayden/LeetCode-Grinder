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

    useEffect(()=>{
        fetchProblems()
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
        }catch(err){
            setError('Failed to delete problem')
        }
    } 
    return(
        <div>
            <h1>Dashboard</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
            
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
                    <input
                        type="text"
                        placeHolder="Category (e.g. Arrays, Math, etc)"
                        value={category}
                        onChange={(e)=> setCategory(e.target.value)}
                        />
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

            {problems.length===0 ? (
                <p>No problems added yet! Add one!</p>
            ) : (
                    
                problems.map(problem => (
                    <div key={problem.id}>
                         <h3>{problem.title}</h3>
                        <p>Difficulty:{problem.difficulty}</p>
                        <p>Category: {problem.category}</p>
                        <p>Status: {problem.status}</p>
                        <button onClick={() => deleteProblem(problem.id)}>Delete</button>
                    </div>
                ))
            )}
        </div>
    )
}

export default Dashboard