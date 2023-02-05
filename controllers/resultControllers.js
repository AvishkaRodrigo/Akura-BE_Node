const Result = require('../models/resultModel')
const mongoose = require('mongoose')
const User = require('../models/userModel')

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

const getAllAssignmentIdsOfClass = async (req,res) => {
  const {class_ID} = req.query
  // console.log(req)
  const results = await Result.find({
      class_ID : class_ID
  })

  let assignmentIds = []
  results.map((x)=>{
    assignmentIds.push(x.assignment_ID)
  })

  let assignments = [...new Set(assignmentIds)]

  res.json({count: assignments.length,assignments})
}

const getAllResultsOfAssignment = async (req,res) => {
  const {assignment_ID} = req.query
  const results = await Result.find({
    assignment_ID : assignment_ID
  })

  const students = await User.find({
    userType:1
  })

  let studentsResults = []
  results.map((r)=>{
    students.map((s)=>{
      if(r.ST_ID == s._id){
        var studentDetails = {
          student_ID : s._id,
          studentName : s.firstName+" "+s.lastName,
          gender : s.gender,
          marks : r.marks
        }

        studentsResults.push(studentDetails)
      }
    })
  })

  res.json({count:studentsResults.length,studentsResults})
}

const getAllResultsOfAssignmentForParentView = async (req,res) => {
  const {class_ID, ST_ID} = req.query

  // console.log(class_ID, ST_ID)
  const results = await Result.find({
      class_ID : class_ID,
      ST_ID: ST_ID,
  }).sort({createdAt: -1})

  const students = await User.find({
      userType:1
  })

  let studentsResults = []
  results.map((r)=>{
    students.map((s)=>{
      if(r.ST_ID == s._id){
        var studentDetails = {
          assignment: r.assignment_ID,
          marks : r.marks,
          releasedDate : r.createdAt
        }

        studentsResults.push(studentDetails)
      }
    })
  })

  res.status(200).json({count: studentsResults.length,studentsResults})
  
  
  
  
  
  
  // const {assignment_ID} = req.query
  // const results = await Result.find({
  //   assignment_ID : assignment_ID
  // })

  // const students = await User.find({
  //   userType:1
  // })

  // let studentsResults = []
  // results.map((r)=>{
  //   students.map((s)=>{
  //     if(r.ST_ID == s._id){
  //       var studentDetails = {
  //         student_ID : s._id,
  //         studentName : s.firstName+" "+s.lastName,
  //         gender : s.gender,
  //         marks : r.marks
  //       }

  //       studentsResults.push(studentDetails)
  //     }
  //   })
  // })

  // res.json({count:studentsResults.length,studentsResults})
}

// create a new result
const createResult = async (req, res) => {
    const {ST_ID, class_ID	,assignment_ID,	marks} = req.body
    
    try {
        const result = await Result.create({ST_ID, class_ID, assignment_ID,	marks})
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
  getAllAssignmentIdsOfClass,
  getAllResultsOfAssignment,
  getAllResultsOfAssignmentForParentView,
  createResult,
  deleteResult,
  updateResult
}