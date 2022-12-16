const Result = require('../models/resultModel')
const mongoose = require('mongoose')

// get all results
const getResults = async (req, res) => {
  const results = await Result.find({}).sort({createdAt: -1})

  res.status(200).json(results)
}

// get a single result
const getResult = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such result'})
  }

  const result = await Result.findById(id)

  if (!result) {
    return res.status(404).json({error: 'No such result'})
  }

  res.status(200).json(result)
}

// create a new result
const createResult = async (req, res) => {
    const {ST_ID,	assignment_ID,	marks} = req.body
    
    try {
        const result = await Result.create({ST_ID,	assignment_ID,	marks})
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a result
const deleteResult = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such result'})
  }

  const result = await Result.findOneAndDelete({_id: id})

  if(!result) {
    return res.status(400).json({error: 'No such result'})
  }

  res.status(200).json(result)
}

// update a result
const updateResult = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such result'})
  }

  const result = await Result.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!result) {
    return res.status(400).json({error: 'No such result'})
  }

  res.status(200).json(result)
}

module.exports = {
  getResults,
  getResult,
  createResult,
  deleteResult,
  updateResult
}