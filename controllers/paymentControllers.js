const User = require('../models/userModel')
const Payment = require('../models/paymentModel')
const Class = require('../models/classModel')
const mongoose = require('mongoose')

// classFees
const getAllPaidClassFees = async (req, res) => {
  const payments = await Payment.find({
    "Admission" : false,
    "Type": "STU"
  }).sort({createdAt: -1})

  res.status(200).json(payments)
}

const getAllPaidClassFeesOfStudent = async (req, res) => {
  const { id } = req.params
  const payments = await Payment.find({
    "Admission" : false,
    "Type": "STU",
    "ST_ID" : id
  }).sort({createdAt: -1})

  res.status(200).json(payments)
}

// get all students who paid class fees for a class
const getAllStudentsPaidClassFeeForClass = async (req, res) => {
  const { classID } = req.params
  // console.log(classID)
  const payments = await Payment.find({
    "Admission" : false,
    "Type": "STU",
    "class_ID" : classID
  }).sort({createdAt: -1})

  res.status(200).json(payments)
}

// get all students of a class based on the admission
const getAllStudentsOfClass = async (req, res) => {
  const { classID } = req.params
  
  const students = await User.find({
    userType:1
  })
  const payments = await Payment.find({
    "Admission" : true,
    "Type": "STU",
    "class_ID" : classID
  }).sort({createdAt: -1})

  const classStudents = []

  payments.map((x)=>{
    students.map((s)=>{
      if(s._id == x.ST_ID){
        let ST = {
          studentID : s._id,
          firstName : s.firstName,
          lastName : s.lastName,
          enrolledDate : x.createdAt,
          email : s.email,
          gender : s.gender,
          contactNumber : s.contactNumber,
          ID:s.ID
        }
        classStudents.push(ST)
      }
    })
  })

  res.status(200).json(classStudents)
}

const getAllPaidClassFeesOfStudentForClass = async (req, res) => {
  const { id, classID } = req.params
  const payments = await Payment.find({
    "Admission" : false,
    "ST_ID" : id,
    "Type": "STU",
    "class_ID" : classID
  }).sort({createdAt: +1})

  const instrctors = await User.find({
    "userType" : 3
  }).select('-password')
  
  const x = await Class.findById(classID)
  // const class4FE = classDetails.map((x)=>{
    const instructorInfo = instrctors.filter((a)=>a._id == x.IN_ID)
    const classInfo = {
      id : x._id,
      class_ID : x.class_ID,
      instructorID : x.IN_ID,
      // instructor : ins.firstName + " " + ins.lastName,
      // subject : ins.subject,
      // level : ins.level || 'null',
      grade : x.grade,
      classType : x.classType,
      hall : x.hall,
      classDate : x.classDate,
      startTime : x.startTime,
      endTime : x.endTime,
      admission : x.admission,
      classFee : x.classFee,
      // createdAt : x.createdAt
    }
    // return y
  // })

  res.status(200).json({payments,classInfo,instructorInfo:instructorInfo[0]})
}


// Admissions
const getAllPaidAddmisions = async (req, res) => {
  const payments = await Payment.find({
    "Admission" : true,
    "Type": "STU"
  }).sort({createdAt: -1})

  res.status(200).json(payments)
}

const getInstructorPayments = async (req, res) => {
  const {IN_ID} = req.params 
  let instructorID = null
  if(req.user.userType == 5){
    instructorID = IN_ID
    console.log('admin')
  }else{
    console.log('user')
    instructorID = req.user.id
  }
  
  const payments = await Payment.find({
    "Type": "INS",
    "IN_ID" : instructorID 
  }).sort({createdAt: -1})

  res.status(200).json(payments)
}

const myClasses = async (req, res) => {
  const { id } = req.params
  console.log(id)
  const payments = await Payment.find({
    "Admission" : true,
    "Type": "STU",
    "ST_ID" : id
  }).sort({createdAt: -1})
  
  const instrctors = await User.find({
    "userType" : 3
  }).select('-password')

  const classes = await Class.find({})
  const mycls = []
  const test = classes.map((x)=>{
    payments.map((y)=>{
      if(y.class_ID == x.id){
        mycls.push(x)
        // return y
      }
    })
  })

  console.log(mycls,instrctors)
  const studentMyClasses = mycls.map((x)=>{
    const ins = instrctors.find((a)=>a._id == x.IN_ID)
    if(ins){
      const y = {
        class_ID : x._id,
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
        // createdAt : x.createdAt
      }
      return y
    }
  })

  res.status(200).json({studentMyClasses})
}


// get a single payment
const getPayment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such payment'})
  }

  const payment = await Payment.findById(id)

  if (!payment) {
    return res.status(404).json({error: 'No such payment'})
  }

  res.status(200).json(payment)
}

// create a new payment
const payClassFee = async (req, res) => {
    const {payment_ID,	class_ID,	ST_ID,	SM_ID, IN_ID, Admission, Amount,	month,	Type} = req.body
    // console.log(req.user)
    // TODO need to take student ID
    

    // console.log(res)
    try {
        const payment = await Payment.create({payment_ID,	class_ID,	ST_ID, IN_ID,	SM_ID, Admission, Amount,	month,	Type})
        res.status(200).json(payment)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a payment
const deletePayment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such payment'})
  }

  const payment = await Payment.findOneAndDelete({_id: id})

  if(!payment) {
    return res.status(400).json({error: 'No such payment'})
  }

  res.status(200).json(payment)
}

// update a payment
const updatePayment = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such payment'})
  }

  const payment = await Payment.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!payment) {
    return res.status(400).json({error: 'No such payment'})
  }

  res.status(200).json(payment)
}

module.exports = {
  getAllPaidClassFees,
  getAllPaidClassFeesOfStudent,
  getAllStudentsPaidClassFeeForClass,
  getAllStudentsOfClass,
  getAllPaidClassFeesOfStudentForClass,
  getAllPaidAddmisions,
  myClasses,
  getPayment,
  payClassFee,
  deletePayment,
  updatePayment,
  getInstructorPayments
}