const mongoose = require('mongoose')

const Schema = mongoose.Schema

const attendanceSchema = new Schema({
  ST_ID : {
    type : String,
    required : true
  },
  class_ID : {
    type : String,
    required : true
  },
  attend_date : {
    type : String,
    required : true
  },

}, { timestamps: true })

module.exports = mongoose.model('Attendance', attendanceSchema)




