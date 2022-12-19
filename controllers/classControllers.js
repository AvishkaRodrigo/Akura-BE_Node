const Class = require('../models/classModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')

// get all classes
const getAllClasses = async (req, res) => {
  const instrctors = await User.find({
    "userType" : 3
  })
  const classes = await Class.find({}).sort({createdAt: -1})
  
  const class4FE = classes.map((x)=>{
    const ins = instrctors.find((a)=>a.ID == x.IN_ID)
    const y = {
      class_ID : x.class_ID,
      instructorID : x.IN_ID,
      instructor : ins.firstName + " " + ins.lastName,
      subject : ins.subject,
      grade : x.grade,
      classType : x.classType,
      hall : x.hall,
      classDate : x.classDate,
      startTime : x.startTime,
      endTime : x.startTime,
      admission : x.admission,
      classFee : x.classFee,
      // createdAt : x.createdAt
    }
    return y
  })


  res.status(200).json(class4FE)
}

// get a single class
const getClass = async (req, res) => {
  const { id } = req.params
  

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such class'})
  }

  const class1 = await Class.findById(id)

  if (!class1) {
    return res.status(404).json({error: 'No such class'})
  }
  res.status(200).json(class1)
}

// create a new class
const createClass = async (req, res) => {
    const {class_ID,	IN_ID,	grade,	classType,	hall,	classDate,	startTime,	endTime, admission, classFee} = req.body
    // console.log('createclass')
    try {
      const class2 = await Class.create({class_ID,	IN_ID,	grade,	classType,	hall,	classDate,	startTime,	endTime, admission, classFee})
        res.status(200).json(class2)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a class
const deleteClass = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such class'})
  }

  const class3 = await Class.findOneAndDelete({_id: id})

  if(!class3) {
    return res.status(400).json({error: 'No such class'})
  }

  res.status(200).json(class3)
}

// update a class
const updateClass = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such class'})
  }

  const class4 = await Class.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!class4) {
    return res.status(400).json({error: 'No such class'})
  }

  res.status(200).json(class4)
}

const getInstructorClass = async (req, res) => {
  const class3 = await Class.find({
    "IN_ID": req.params.id.toString()
  })
  console.log('class3')
  res.status(200).json(class3)
}




module.exports = {
  getAllClasses,
  getClass,
  createClass,
  deleteClass,
  updateClass,
  getInstructorClass,
}