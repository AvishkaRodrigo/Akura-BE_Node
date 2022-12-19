const Assignment = require('../models/assignmentModel')
const mongoose = require('mongoose')

// get all assignments
const getAssignments = async (req, res) => {
  const assignments = await Assignment.find({}).sort({createdAt: -1})

  res.status(200).json(assignments)
}

// get a single assignment
const getAssignment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such assignment'})
  }

  const assignment = await Assignment.findById(id)

  if (!assignment) {
    return res.status(404).json({error: 'No such assignment'})
  }

  res.status(200).json(assignment)
}

// create a new assignment
const createAssignment = async (req, res) => {
    const {assign_ID,	class_ID,	assign_description,	assign_link,	deadline} = req.body
    try {
        const assignment = await Assignment.create({assign_ID,	class_ID,	assign_description,	assign_link,	deadline})
        res.status(200).json(assignment)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a assignment
const deleteAssignment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such assignment'})
  }

  const assignment = await Assignment.findOneAndDelete({_id: id})

  if(!assignment) {
    return res.status(400).json({error: 'No such assignment'})
  }

  res.status(200).json(assignment)
}

// update a assignment
const updateAssignment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such assignment'})
  }

  const assignment = await Assignment.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!assignment) {
    return res.status(400).json({error: 'No such assignment'})
  }

  res.status(200).json(assignment)
}

module.exports = {
  getAssignments,
  getAssignment,
  createAssignment,
  deleteAssignment,
  updateAssignment
}