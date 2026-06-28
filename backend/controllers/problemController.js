const prisma = require('../db/prismaClient')
//used to query db
const getProblems = async(req, res) =>{
    try{
        const problems = await prisma.problem.findMany({
            where: {userId: req.user.userId}
            //returing user specific problems
            //req.etc.etc comes from jwt token
        })
        res.status(200).json(problems)
        //200 = good 
    }catch(error){
        res.status(500).json({message: 'Server error', error: error.message})
    }
}

const createProblem = async(req, res) =>{
    try{
        const{title, number, difficulty, category, status, notes, url} = req.body
        //all fields for leetcode probs
        const problem = await prisma.problem.create({
            data:{
                title, number, difficulty, category,
                status: status || 'unsolved',
                //defaults to unsolved
                notes, url,
                userId: req.user.userId
            }
        })
         res.status(201).json(problem)
            //201 = problem made successfully and sends back the new problem
    }catch(error){
        res.status(500).json({message:'Server error', error: error.message})
    }
}


const updateProblem = async(req, res) =>{
    try{
        const{id} = req.params
        const {title, number, difficulty, category, status, notes, url} = req.body
        const problem = await prisma.problem.update({
            where:{id: parseInt(id),},
            data:{title, number, difficulty, category, status, notes, url}
        })
        res.status(200).json(problem)
    }catch(error){
        res.status(500).json({message:'Server error', error: error.message})
    }
}

const deleteProblem = async (req, res) =>{
    try{
        const{id} = req.params
        await prisma.problem.delete({
            where:{id: parseInt(id)}
        })
        res.status(200).json({message:'Problem deleted'})
    }catch(error){
        res.status(500).json({message:'Server error', error: error.message})
    }
}


module.exports={getProblems, createProblem, updateProblem, deleteProblem}