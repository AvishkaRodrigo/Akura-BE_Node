const Notification = require('../models/notificationModel')
const mongoose = require('mongoose')
const Payment = require('../models/paymentModel')
const Class = require('../models/classModel')
const User = require('../models/userModel')

// get all notifications
const getNotifications = async (req, res) => {

  // TODO - change this to id 
  let studentID = null
  console.log(req.user)
  
  if(req.user.userType === 1){
    studentID = req.user.id
  }else {
    let {ID} = req.query
    studentID = ID
  }
  
  const registeredClasses = await Payment.find({
    "Admission" : true,
    "Type": "STU",
    "ST_ID" : studentID,
  })

  const classes = await Class.find()
  const instructors = await User.find({
    userType:3
  })

  const notifications = await Notification.find().sort({createdAt : -1})

  let temp = []
  let myNotifications = []

  notifications.map((x)=>{
    if(x.ST_ID == studentID){
      temp.push(x)
    }else {
      registeredClasses.map((y)=>{
        if(x.class_ID == y.class_ID){
          temp.push(x)
        }
      })
    }
  })

  temp.map((x)=>{
    classes.map((y)=>{
      if(x.class_ID == y._id){
        instructors.map((z)=>{
          if(y.IN_ID == z._id){
            let tempNoti = {
              "_id": x._id,
              "class_ID": x.class_ID,
              "Instructor":z.firstName+" "+z.lastName,
              "subject":z.subject,
              "classDate":y.classDate,
              "header": x.header,
              "message": x.message,
              "createdAt": x.createdAt,
            }
            myNotifications.push(tempNoti)
          }
        })
      }
    })
  })

  if(studentID !== null){
    res.status(200).json({"count": myNotifications.length, "notifications" : myNotifications})
  }else{
    res.status(200).json({"count": myNotifications.length, "notifications" : []})
  }


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

const createEarlyLeaveNotification = async (req, res) => {
    const {class_ID,	header, message, ST_ID} = req.body

    // let options = {
    //   to : 'biofinance.sl@gmail.com',
    //   subject : 'New user registered!',
    //   text : "<h2 style={color='#000'}>New user registered.</h2><br/>Name :" + user.firstName + " " + user.lastName +"<br/>Email : " + user.email + "<br/>Telephone : " + user.telephone
    // }

    // const result = sendEmail(options)
    
    try {
        const notification = await Notification.create({class_ID,	header, message, ST_ID})
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
  createEarlyLeaveNotification,
  deleteNotification,
  updateNotification
}