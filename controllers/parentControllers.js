const Parent = require('../models/parentModel')
const User = require('../models/userModel')
const mongoose = require('mongoose')
const { getUser } = require('./userControllers')

// get all parents
const getParents = async (req, res) => {
  const parents = await User.find({
    "userType" : "2"
  }).sort({createdAt: -1}).select('-password')

  res.status(200).json(parents)
}

// get a single parent
const getParent = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such parent'})
  }

  const parent = await User.findById(id).select('-password')

  if (!parent) {
    return res.status(404).json({error: 'No such parent'})
  }

  res.status(200).json(parent)
}

const getMyStudents = async (req, res) => {
  console.log( "My students" ,req.user.studentIds)
  if (req.user.userType !== 2){
    return res.status(400).json({msg : "access denied!"})
  }else{
    const myStudents = req.user.studentIds;
    const myStuInfo = [];
    const allStudents = await User.find({
      "userType" : 1
    }).select('-password')

    myStudents.map(async (x)=>{
      allStudents.map((y)=>{
        // console.log(y)
        if(x == y.email){
          myStuInfo.push(y)
        }
      })  
    })
    return res.status(200).json({myStuInfo})
  }
}

// create a new parent
// TODO - remove
const createParent = async (req, res) => {
    const {PA_ID , ST_ID,	PA_name, PA_contactNumber,	PA_gender,	PA_email,	PA_address,	PA_password} = req.body
    
    try {
        const parent = await Parent.create({PA_ID , ST_ID,	PA_name, PA_contactNumber,	PA_gender,	PA_email,	PA_address,	PA_password})
        res.status(200).json(parent)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a parent
const deleteParent = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such parent'})
  }

  const parent = await User.findOneAndDelete({_id: id})

  if(!parent) {
    return res.status(400).json({error: 'No such parent'})
  }

  res.status(200).json(parent)
}

// update a parent
const updateParent = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such parent'})
  }

  const parent = await User.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!parent) {
    return res.status(400).json({error: 'No such parent'})
  }

  res.status(200).json(parent)
}

module.exports = {
  getParents,
  getParent,
  getMyStudents,
  createParent,
  deleteParent,
  updateParent
}