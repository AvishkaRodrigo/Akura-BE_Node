const Payment = require('../models/paymentModel')
const Attendance = require('../models/attendanceModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')
const moment = require('moment-timezone')
const { json } = require('express')

// get all attendances
const getStudentAttendance = async (req, res) => {

  const {class_ID, ST_ID} = req.query
  // console.log(req)
  const attendances = await Attendance.find({
    class_ID : class_ID,
    ST_ID : ST_ID
  }).sort({createdAt: -1})

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

const markAttendance = async (req, res) => {
  const {ST_ID,	class_ID,	attend_date} = req.body
  console.log(req.body)
  const studentOfClass = await Payment.find({
    // "Admission" : true,
    "class_ID" : class_ID,
    "ST_ID" : ST_ID
  })
  // console.log(studentOfClass)
  if(studentOfClass.length > 0){
    // return res.status(200).json(studentOfClass)
    let paidAdmission = false
    studentOfClass.map((x)=>{
      if(x.Admission === true && x.Type == "STU"){
        paidAdmission = true;
      }
    })
    if(paidAdmission === false){
      return res.status(401).json({message : "Student is not registered!"})
    }else{
      // console.log("not piad 123")
      let thisMonth = new Date()
      thisMonth = moment(thisMonth).format('MM')
      let paid4Month = false
      studentOfClass.map((x)=>{
        if(x.month = thisMonth){
          paid4Month = true
        }
      })
      if (paid4Month === false){
        // console.log("not piad")
        return res.status(402).json({message : "Not paid for this month"})
      }else {
        // console.log("piad")
        const attendance = await Attendance.find({
          "class_ID" : class_ID,
        })

        let check = false;
        attendance.map(async (aT)=>{
          // allST.map((x)=>{
            if(aT.ST_ID == ST_ID){
              // console.log(moment(x.attend_date).format('yyyy-MM-DD'))
              if(moment(aT.attend_date).toArray()[2] == moment(attend_date).toArray()[2]){
                check = true
                return res.status(401).json({message : "Student already in the class!"})
              }
            }
          // })

        })
        try {
          if(!check){
            const attendance = await Attendance.create({ST_ID,	class_ID,	attend_date})
            const student = await User.findById(ST_ID).select('-password')
            return res.status(200).json({message: 'Recorded successfully!', student: student, data: attendance})
          }else{
            return res.status(401).json({message : "Student already in the class"})
          }
        } catch (error) {
          return res.status(400).json({message: error.message})
        }



      }
    }
  }else{
    return res.status(401).json({message : "Student is not registered!"})
  }
  
  
  // try {
    //     const attendance = await Attendance.create({ST_ID,	class_ID,	attend_date})
    //     res.status(200).json(attendance)
  // } catch (error) {
  //     res.status(400).json({error: error.message})
  // }
}

const getClassAttendance = async (req, res) => {
  let { class_ID, date } = req.params
  // class_ID = '639f58b123fb0e1e24ce2f31'
  // date = '2023-01-08T05:09:39.363Z'
  // console.log(moment(date).format('yyyy/MM/DD'))
  const attendance = await Attendance.find({
    "class_ID" : class_ID,
  })
  const allST = await User.find({"userType" : 1}).select('-password') 
  const attendedST_ID = []

  attendance.map((aT)=>{
    // let attendDate = moment(aT.attend_date).format('yyyy-MM-DD')
    allST.map((x)=>{
      if(aT.ST_ID==x._id){
        // console.log(aT.attend_date)
        if(moment(aT.attend_date).toArray()[2] == moment(date).toArray()[2]){
          attendedST_ID.push(x)
        }
      }
    })

  })

  res.status(200).json({attendedST_ID})
}

module.exports = {
  getStudentAttendance,
  getAttendance,
  createAttendance,
  deleteAttendance,
  updateAttendance,
  markAttendance, 
  getClassAttendance,
}