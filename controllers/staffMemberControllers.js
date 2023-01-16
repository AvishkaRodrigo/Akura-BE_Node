const StaffMember = require('../models/staffMemberModel')
const mongoose = require('mongoose')
const User = require('../models/userModel')

// get all staffMembers
const getStaffMembers = async (req, res) => {
  const staffMembers = await StaffMember.find({
    "userType" : "4"
  }).sort({createdAt: -1}).select('-password')

  res.status(200).json(staffMembers)
}

// get a single staffMember
const getStaffMember = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such staffMember'})
  }

  const staffMember = await StaffMember.findById(id)

  if (!staffMember) {
    return res.status(404).json({error: 'No such staffMember'})
  }

  res.status(200).json(staffMember)
}

// create a new staffMember
const createStaffMember = async (req, res) => {
    const {SM_ID,	SM_name, SM_contactNumber,	SM_gender,	SM_email,	SM_NIC,	SM_password} = req.body
    
    try {
        const staffMember = await StaffMember.create({SM_ID,	SM_name, SM_contactNumber,	SM_gender,	SM_email,	SM_NIC,	SM_password})
        res.status(200).json(staffMember)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a staffMember
const deleteStaffMember = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such staffMember'})
  }

  const staffMember = await StaffMember.findOneAndDelete({_id: id})

  if(!staffMember) {
    return res.status(400).json({error: 'No such parent'})
  }

  res.status(200).json(parent)
}

// update a parent
const updateStaffMember = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such parent'})
  }

  const parent = await StaffMember.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!parent) {
    return res.status(400).json({error: 'No such parent'})
  }

  res.status(200).json(parent)
}

module.exports = {
  getStaffMembers,
  getStaffMember,
  createStaffMember,
  deleteStaffMember,
  updateStaffMember
}