const Class = require('../models/classModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')

// get all classes
const getAllClasses = async (req, res) => {
  const instrctors = await User.find({
    "userType" : 3
  }).select('-password')
  
  const classes = await Class.find()
  
  let class4FE = []
  classes.map((x)=>{
    let ins = instrctors.find((a)=>a._id == x.IN_ID)
    console.log(ins)
    if(ins ==! null || ins !== undefined){
      const y = {
        id : x._id,
        class_ID : x.class_ID,
        instructorID : x.IN_ID,
        instructor : ins.firstName + " " + ins.lastName,
        subject : ins.subject,
        level : ins.level || 'null',
        grade : x.grade,
        classType : x.classType,
        hall : x.hall,
        classDate : x.classDate,
        startTime : x.startTime,
        endTime : x.endTime,
        admission : x.admission,
        classFee : x.classFee,
        paymentLink : x.paymentLink
        // createdAt : x.createdAt
      }
      class4FE.push(y)
    }else{
      return res.status(200).json({msg : "No instructors found for class"})
    }
  })


  res.status(200).json(class4FE)
}

// get a single class
const getClass = async (req, res) => {
  const class3 = await Class.findById({
    "class_ID": req.params.id.toString()
  })
  // console.log('class3')
  res.status(200).json(class3)
}

// create a new class
const createClass = async (req, res) => {
    const {class_ID,	IN_ID,	grade,	classType,	hall,	classDate,	startTime,	endTime, admission, classFee, paymentLink} = req.body
    // console.log('createclass')
    try {
      const class2 = await Class.create({class_ID,	IN_ID,	grade,	classType,	hall,	classDate,	startTime,	endTime, admission, classFee, paymentLink})
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
  // console.log('class3')
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