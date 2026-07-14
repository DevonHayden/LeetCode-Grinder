require('dotenv').config()
const express = require('express')
const app = express()
app.set('trust proxy', 1)
const cors = require ('cors')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const PORT = process.env.PORT || 3000
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,
    message:{message: 'Too many attempts, please try again later'}
})

app.use(express.json())
app.use(helmet())
//middleware going through the json\
app.use(cors({
    origin: 'http://localhost:5173'
}))

const authRoutes = require('./routes/auth')
//importing auth router (from auth.js)
const problemRoutes = require('./routes/problems')
app.use('/api/problems', problemRoutes)
app.use('/api/auth', authLimiter, authRoutes)
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

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

