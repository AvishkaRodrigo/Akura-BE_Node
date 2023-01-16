const Instructor = require('../models/instructorModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')

// get all instructors
const getInstructors = async (req, res) => {
  const instructors = await User.find({
    "userType": "3"
  }).select('-password')

  res.status(200).json(instructors)
}

// get a single instructor
const getInstructor = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such instructor'})
  }

  const instructor = await User.findById(id).select('-password')

  if (!instructor) {
    return res.status(404).json({error: 'No such instructor'})
  }

  res.status(200).json(instructor)
}

// create a new instructor
const createInstructor = async (req, res) => {
    const {IN_ID , IN_firstName,	IN_lastName, IN_contactNumber,	IN_gender,	IN_email,	IN_subject, IN_accNumber,	IN_password} = req.body
    
    try {
        const instructor = await Instructor.create({IN_ID , IN_firstName,	IN_lastName, IN_contactNumber,	IN_gender,	IN_email,	IN_subject, IN_accNumber,	IN_password})
        res.status(200).json(instructor)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a instructor
const deleteInstructor = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such instructor'})
  }

  const instructor = await User.findOneAndDelete({_id: id})

  if(!instructor) {
    return res.status(400).json({error: 'No such instructor'})
  }

  res.status(200).json(instructor)
}

// update a instructor
const updateInstructor = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such instructor'})
  }

  const instructor = await User.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!instructor) {
    return res.status(400).json({error: 'No such instructor'})
  }

  res.status(200).json(instructor)
}

module.exports = {
  getInstructors,
  getInstructor,
  createInstructor,
  deleteInstructor,
  updateInstructor
}