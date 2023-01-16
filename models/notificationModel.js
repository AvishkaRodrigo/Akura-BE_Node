const mongoose = require('mongoose')

const Schema = mongoose.Schema

const notificationSchema = new Schema({
  notification_ID : {
    type : String,
    // required : true
  },
  class_ID : {
    type : String,
    required : true
  },
  header : {
    type : String,
    required : true
  },
  message : {
    type : String,
    required : true
  },
  ST_ID : {
    type : String,
    // required : true
  },
},{timestamps : true})

module.exports = mongoose.model('Notification', notificationSchema)




