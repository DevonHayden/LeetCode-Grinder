const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
//protection ie all probs rewuire a jwt token
const {getProblems, createProblem, updateProblem, deleteProblem, getStats} = require('../controllers/problemController')
//importing all frunctions from problemController.js

router.get('/', protect, getProblems)
// GET /api/problems — get all problems for the logged in user

router.post('/', protect, createProblem)
// POST /api/problems — create a new problem

router.put('/:id', protect, updateProblem)
// PUT /api/problems/1 — update problem with id 1
// :id is a URL parameter — it can be any number

router.delete('/:id', protect, deleteProblem)
// DELETE /api/problems/1 — delete problem with id 1
router.get('/stats', protect, getStats)
module.exports = router