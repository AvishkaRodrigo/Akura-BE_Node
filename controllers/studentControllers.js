require('dotenv').config()

const User = require('../models/userModel')
const Student = require('../models/studentModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')

const studentProfile =async(req,res) => {
  try{
    const student = await User.findById(req.student.id).select('-ST_password');
    res.json(student)
  } catch(err){
    res.status(500).send('Server error')
  }
}

// get all students

const getStudents = async (req, res) => {
  const students = await User.find({
    "userType" : "1"
  }).sort({createdAt: -1}).select('-password')

  res.status(200).json(students)
}

// get a single student
const getStudent = async (req, res) => {
  const { id } = req.params
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such student'})
  }

  // if(userType == 1){
    const student = await User.findById(id).select('-password')

    if (!student) {
      return res.status(404).json({error: 'No such student'})
    }
  // }

  res.status(200).json(student)
}

// create a new student
const createStudent = async (req, res) => {
    // const {ST_ID, ST_firstName} = req.body
    const {ST_ID,	ST_firstName,	ST_lastName,	ST_contactNumber,	ST_gender,	ST_email,	ST_level,	ST_year,	ST_password, created_date, updated_date} = req.body
    
    try {
        let student = await Student.findOne({ST_email});

        if(student){
          console.log("Email exist")
          return res.status(400).json({msg: 'Student already exist!'});
        }
        
        // console.log(ST_email)
        const ST_avatar = gravatar.url(ST_email, {
          s : '200',
          r : 'pg',
          d : 'mm'
        })
        
        student = new Student({
          ST_ID,
          ST_firstName,	
          ST_lastName,
          ST_avatar,	
          ST_contactNumber,	
          ST_gender,	
          ST_email,	
          ST_level,	
          ST_year,	
          ST_password, 
          created_date, 
          updated_date
        })

        const salt = await bcrypt.genSalt(10);
        student.ST_password = await bcrypt.hash(ST_password, salt);
        const resonse = await student.save();
        console.log("User created - Student")
        // res.status(200).json({msg: 'Student registration success!'});
        
        // res.st atus(200).send(student)
        await student.save();

        // user information need to include in jwt token
        const payload = {
          student: {
            id : student.id
          }
        }

        jwt.sign(
          payload, 
          process.env.JWTSECRET,
          {expiresIn : 360000},   // ! set token expire time
          (err, token)=> {
            if(err) throw err;
            res.status(200).json({token,msg: 'Student registration success!'});
          }
        )

    } catch (error) { 
        // res.status(400).json({error: error.message})
        res.status(400).json({msg: 'server error'})
        console.log(error)
    }
}

// delete a student
const deleteStudent = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such student'})
  }

  const student = await User.findOneAndDelete({_id: id})

  if(!student) {
    return res.status(400).json({error: 'No such student'})
  }

  res.status(200).json(student)
}

// update a student
const updateStudent = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such student'})
  }

  const student = await User.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!student) {
    return res.status(400).json({error: 'No such student'})
  }

  res.status(200).json(student)
}

module.exports = {
  studentProfile,
  getStudents,
  getStudent,
  createStudent,
  deleteStudent,
  updateStudent
}