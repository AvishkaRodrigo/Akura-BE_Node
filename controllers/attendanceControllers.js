const Attendance = require('../models/attendanceModel')
const mongoose = require('mongoose')

// get all attendances
const getAttendances = async (req, res) => {
  const attendances = await Attendance.find({}).sort({createdAt: -1})

  res.status(200).json(attendances)
}

// get a single attendance
const getAttendance = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such attendance'})
  }

  const attendance = await Attendance.findById(id)

  if (!attendance) {
    return res.status(404).json({error: 'No such attendance'})
  }

  res.status(200).json(attendance)
}

// create a new attendance
const createAttendance = async (req, res) => {
    const {ST_ID,	class_ID,	attend_date} = req.body
    
    try {
        const attendance = await Attendance.create({ST_ID,	class_ID,	attend_date})
        res.status(200).json(attendance)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a attendance
const deleteAttendance = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such attendance'})
  }

  const attendance = await Attendance.findOneAndDelete({_id: id})

  if(!attendance) {
    return res.status(400).json({error: 'No such attendance'})
  }

  res.status(200).json(attendance)
}

// update a attendance
const updateAttendance = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such attendance'})
  }

  const attendance = await Attendance.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!attendance) {
    return res.status(400).json({error: 'No such attendance'})
  }

  res.status(200).json(attendance)
}

module.exports = {
  getAttendances,
  getAttendance,
  createAttendance,
  deleteAttendance,
  updateAttendance
}