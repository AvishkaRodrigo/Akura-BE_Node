const Payment = require('../models/paymentModel')
const mongoose = require('mongoose')

// get all payments
const getPayments = async (req, res) => {
  const payments = await Payment.find({}).sort({createdAt: -1})

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
const createPayment = async (req, res) => {
    const {payment_ID,	class_ID,	ST_ID,	SM_ID, TimeStamp,	Amount,	month,	Type} = req.body
    
    try {
        const payment = await Payment.create({payment_ID,	class_ID,	ST_ID,	SM_ID, TimeStamp,	Amount,	month,	Type})
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
  getPayments,
  getPayment,
  createPayment,
  deletePayment,
  updatePayment
}