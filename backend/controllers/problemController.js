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

const getStats = async(req, res) =>{
    try{
        const userId = req.user.userId

        const totalSolved = await prisma.problem.count({
            where: {userId, status: 'solved'}
        })
        const totalProblems = await prisma.problem.count({
            where: {userId}
        })
        const byDifficulty = await prisma.problem.groupBy({
            by: ['difficulty'],
            where: {userId, status: 'solved'},
            _count: true
        })
        res.status(200).json({totalSolved, totalProblems, byDifficulty})
    }catch(error){
        res.status(500).json({message: 'Server error', error: error.message})
    }
}

const createProblem = async(req, res) =>{
    try{
        const{title, number, difficulty, category, status, notes, url} = req.body
        //all fields for leetcode probs
        if(!title || !difficulty || !category){
            return res.status(400).json({message: 'Title, difficulty, and category are required'})
        }
        if(!['easy', 'medium', 'hard'].includes(difficulty)){
            return res.status(400).json({message: 'Difficulty must be easy, medium, or hard'})
        }
        if(number && isNaN(parseInt(number))){
            return res.status(400).json({message: 'Problem number must be a valid integer'})
        }
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
        const existing = await prisma.problem.findUnique({
            where:{id: parseInt(id)}
        })
        if(!existing || existing.userId !== req.user.userId){
            return res.status(404).json({message:'Problem not found'})
        }
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
        const problem = await prisma.problem.findUnique({
            where:{id: parseInt(id)}
        })
        if(!problem || problem.userId !== req.user.userId){
            return res.status(404).json({message:'Problem not found'})
        }
        await prisma.problem.delete({
            where:{id: parseInt(id)}
        })
        res.status(200).json({message:'Problem deleted'})
    }catch(error){
        res.status(500).json({message:'Server error', error: error.message})
    }
}

const toggleReview = async (req, res) =>{
    try{
        const{id} = req.params
        const problem = await prisma.problem.findUnique({
            where:{id: parseInt(id)}
        })
        if(!problem || problem.userId !== req.user.userId){
            return res.status(404).json({message:'Problem not found'})
        }
        const updatedProblem = await prisma.problem.update({
            where:{id: parseInt(id)},
            data:{needsReview: !problem.needsReview}
        })
        res.status(200).json(updatedProblem)
    }catch(error){
        res.status(500).json({message:'Server error', error: error.message})
    }
}

module.exports={getProblems, createProblem, updateProblem, deleteProblem, getStats, toggleReview}