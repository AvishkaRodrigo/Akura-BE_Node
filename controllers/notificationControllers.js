const Notification = require('../models/notificationModel')
const mongoose = require('mongoose')
const Payment = require('../models/paymentModel')

// get all notifications
const getNotifications = async (req, res) => {

  // TODO - change this to id 
  let studentID = req.user.userID
  
  const registeredClasses = await Payment.find({
    "Admission" : true,
    "ST_ID" : studentID,
  })

  const notifications = await Notification.find()
  
  const test = notifications.map((x)=>{
    registeredClasses.map((y)=>{
      if(x.class_ID == y.class_ID){
        return x
      }
    })
  })

  res.status(200).json({"classes" : test})
}

// get a single notification
const getNotification = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such notification'})
  }

  const notification = await Notification.findById(id)

  if (!notification) {
    return res.status(404).json({error: 'No such notification'})
  }

  res.status(200).json(notification)
}

// create a new notification
const createNotification = async (req, res) => {
    const {class_ID,	header, message} = req.body
    
    try {
        const notification = await Notification.create({class_ID,	header, message})
        res.status(200).json(notification)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a notification
const deleteNotification = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such notification'})
  }

  const notification = await Notification.findOneAndDelete({_id: id})

  if(!notification) {
    return res.status(400).json({error: 'No such notification'})
  }

  res.status(200).json(notification)
}

// update a notification
const updateNotification = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such notification'})
  }

  const notification = await Notification.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!notification) {
    return res.status(400).json({error: 'No such notification'})
  }

  res.status(200).json(notification)
}

module.exports = {
  getNotifications,
  getNotification,
  createNotification,
  deleteNotification,
  updateNotification
}