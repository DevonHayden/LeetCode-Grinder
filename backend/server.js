require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())
//middleware going through the json\
const authRoutes = require('./routes/auth')
//importing auth router (from auth.js)
app.use('/api/auth', authRoutes)
// mounts the auth routes at /api/auth
// so /register becomes /api/auth/register
// and /login becomes /api/auth/login
app.get('/' , (req, res)=> {
    res.json({message: 'LeetCode Grinder API is running'})
})
const{protect} = require('./middleware/authMiddleware')
//proctecting middleware
app.get('/api/protected', protect, (req, res) => {
    res.json({message: 'You are auhthorized', user: req.user})
})

app.listen(3000, ()=>{
    console.log('Server running on port 3000')
})

