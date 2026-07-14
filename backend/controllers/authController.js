const jwt = require('jsonwebtoken')
//importing the webtoken library
const bcrypt = require('bcrypt')
//for hasing passwords
const prisma = require('../db/prismaClient')



const register = async(req,res) =>{
    // req = user sent, res = sent by me
    try{
        const {name ,email, password} = req.body
        //taking fields out of the req body
        if(!email || !password || !name) {
            return res.status(400).json({message:'All fields are required'})
        }

        if(!email.includes('@')){
            return res.status(400).json({message:'Invalid email format'})
        }

        if(password.length < 8){
            return res.status(400).json({message:'Password must be at least 8 characters long'})
        }
        const existingUser = await prisma.user.findUnique({
            where: {email}
        })
        //check if they have an acc alr
        if(existingUser){
            return res.status(400).json({ message: 'Email already in use'})
            //400 = bad request
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        //10 = # of scrambles
        const user = await prisma.user.create({
            data: {
                name, email,
                password: hashedPassword
                //hashedPsw stored here
            }
        })
        res.status(201).json({message: 'User account created', userId: user.id})
        //201 = account made succesfully 
    } catch(error){
        res.status(500).json({message: 'Server Error', error: error.message})
        //500 = server errors
    }
}

const login = async(req,res) => {
    try{
        const {email, password} = req.body
        //fields needed to log in
        if(!email || !password) {
            return res.status(400).json({message:'All fields are required'})
        }
        const user = await prisma.user.findUnique({
            where: {email}
        })
        if (!user){
            return res.status(400).json({message:'Invalid email or password'})
            //if they are not a user then psw or email is wrong
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        //comparing hasedPassword to user entry

        if(!passwordMatch){
            return res.status(400).json({message: 'Invalid email or password'})
        }

       const token = jwt.sign(
        {userId: user.id, email: user.email},
        //payload ie stuff inside token
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
       )
       res.status(200).json({
        message: 'Login successful',
        token, 
        //sending token back to fe
        userId: user.id
       })
        //200 = all good
    }catch(error){
        res.status(500).json({message:'Server error', error: error.message})
    }
}


module.exports = {register, login}
//exporting so our routes can use this