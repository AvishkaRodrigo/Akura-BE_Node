const mongoose = require('mongoose')

const Schema = mongoose.Schema

const notificationSchema = new Schema({
  notification_ID : {
    type : String,
    // required : true
  },
  class_ID : {
    type : String,
    // required : true
  },
  notifi_description : {
    type : String,
    // required : true
  },
},)

module.exports = mongoose.model('Notification', notificationSchema)




