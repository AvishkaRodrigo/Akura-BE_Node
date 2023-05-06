const Class = require('../models/classModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')
const Payment = require('../models/paymentModel')
const moment = require('moment-timezone')

// get all classes
const getAllClasses = async (req, res) => {

  const {level, grade, classType, day} = req.query
  const instrctors = await User.find({
    "userType" : 3
  }).select('-password')
  
  const classes = await Class.find()
  
  let class4FE = []
  classes.map((x)=>{
    let ins = instrctors.find((a)=>a._id == x.IN_ID)
    // console.log(ins)
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

  // console.log(level)
  if(level != undefined && level != null){
    let temp = []
    class4FE.map((x)=>{
      if(x.level == level){
        temp.push(x)
      }
    })
    class4FE = temp
  }

  if(grade != undefined && grade != null){
    let temp = []
    console.log(grade)
    class4FE.map((x)=>{
      if(x.grade == grade){
        temp.push(x)
      }
    })
    class4FE = temp
  }

  if(classType != undefined && classType != null){
    let temp = []
    class4FE.map((x)=>{
      if(x.classType == classType){
        temp.push(x)
      }
    })
    class4FE = temp
  }

  if(day != undefined && day != null){
    let temp = []
    class4FE.map((x)=>{
      if(x.classDate == day){
        temp.push(x)
      }
    })
    class4FE = temp
  }

  res.status(200).json({count:class4FE.length , data:class4FE})
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
  console.log(class3,req.params.id.toString())
  res.status(200).json(class3)
}

const getClassFeesForInstructor = async (req, res) => {
  let {year, IN_ID} = req.query
  console.log(req.user)
  if(req.user.userType !== 5 || req.user.userType !== 3){

    const insClz = await Class.find({
      "IN_ID": IN_ID
    })

    const students = await User.find({
      "userType" : "1"
    }).sort({createdAt: -1}).select('-password')
    
  // console.log(insClz)
    let clz = []
    insClz.map((x)=>{
      let temp = {
        class_ID : x._id,
        grade : x.grade,
        classType : x.classType,
        classInfo : x, 
        paidStudents : [[],[],[],[],[],[],[],[],[],[],[],[]]
      }
      clz.push(temp)
    })
  
    let payments = await Payment.find({
      "Admission" : false,
      "Type": "STU"
    }).sort({createdAt: -1})
  
    // let {year} = req.query
  
    // filter relevent year payments
    let tempPayments = []
    payments.map((x)=>{
      let payYear = moment(x.createdAt).format('yyyy')
      if(parseInt(year) === parseInt(payYear)){
        tempPayments.push(x)
      }
    })
    payments = tempPayments
    
    // set Student Details
    tempPayments = []
    payments.map((p)=>{
      students.map((s)=>{
        if(p.ST_ID == s._id){
          let temp = {
            ID:s._id,
            name : s.firstName + " " + s.lastName 
          }
          p.Type = s.firstName + " " + s.lastName
          // p.Type = s._id
        }
      })
    })
    // console.log(payments)
    
    payments.map((p)=>{
      clz.map((c)=>{
        if(p.class_ID == c.class_ID){
          let tempYear = parseInt(moment(p.createdAt).format('YYYY'))
          let tempMonth = parseInt(moment(p.month).format('M'))
          c.paidStudents[tempMonth-1].push(p)
          
          // c.paidStudents.push(p)
        }
      })
    })
  
    let MonthlyAmount = []

    clz.map((p,i)=>{
      let temp = [0,0,0,0,0,0,0,0,0,0,0,0]
      p.paidStudents.map((x,j)=>{
        // console.log("x")
        
        // console.log(j)
        if(x.length > 0){
          x.map((y,k)=>{
            let index = parseInt(y.month)
            temp[index]=temp[index]+parseInt(y.Amount)
            // console.log(index)
          })
        }
      })
      let temp2 = {
        class_ID : p.class_ID,
        grade : p.grade,
        classType : p.classType,
        totalPayment : temp
      }
      MonthlyAmount.push(temp2)
    })
    // console.log(MonthlyAmount)
    res.status(200).json({"payments":clz, MonthlyAmount})

  }else {
    return res.status(400).json({"msg": "not authorized to access this route"})
  }
  
}




module.exports = {
  getAllClasses,
  getClass,
  createClass,
  deleteClass,
  updateClass,
  getInstructorClass,
  getClassFeesForInstructor
}