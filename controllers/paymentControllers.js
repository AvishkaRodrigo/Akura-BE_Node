const Payment = require('../models/paymentModel')
const mongoose = require('mongoose')

// classFees
const getAllPaidClassFees = async (req, res) => {
  const payments = await Payment.find({
    "Admission" : false
  }).sort({createdAt: -1})

  res.status(200).json(payments)
}

const getAllPaidClassFeesOfStudent = async (req, res) => {
  const { id } = req.params
  const payments = await Payment.find({
    "Admission" : false,
    "ST_ID" : id
  }).sort({createdAt: -1})

  res.status(200).json(payments)
}
const getAllStudentsPaidClassFeeForClass = async (req, res) => {
  const { id } = req.params
  const payments = await Payment.find({
    "Admission" : false,
    "class_ID" : id
  }).sort({createdAt: -1})

  res.status(200).json(payments)
}

const getAllPaidClassFeesOfStudentForClass = async (req, res) => {
  const { id, classID } = req.params
  const payments = await Payment.find({
    "Admission" : false,
    "ST_ID" : id,
    "class_ID" : classID
  }).sort({createdAt: -1})

  res.status(200).json(payments)
}


// Admissions
const getAllPaidAddmisions = async (req, res) => {
  const payments = await Payment.find({
    "Admission" : true
  }).sort({createdAt: -1})

  res.status(200).json(payments)
}

const getAllPaidAddmisionsOfStudent = async (req, res) => {
  const { id } = req.params
  const payments = await Payment.find({
    "Admission" : true,
    "ST_ID" : id
  }).sort({createdAt: -1})

  res.status(200).json(payments)
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
    const {payment_ID,	class_ID,	ST_ID,	SM_ID, Admission, Amount,	month,	Type} = req.body
    
    try {
        const payment = await Payment.create({payment_ID,	class_ID,	ST_ID,	SM_ID, Admission, Amount,	month,	Type})
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
  getAllPaidClassFeesOfStudentForClass,
  getAllPaidAddmisions,
  getAllPaidAddmisionsOfStudent,
  getPayment,
  payClassFee,
  deletePayment,
  updatePayment
}