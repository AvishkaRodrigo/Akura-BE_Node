const mongoose = require('mongoose')

const Schema = mongoose.Schema

const instructorSchema = new Schema({
  IN_ID : {
    type : String,
    required : true
  },
  IN_firstName : {
    type : String,
    required : true
  },
  IN_lastName : {
    type : String,
    required : true
  },
  IN_contactNumber : {
    type : String,
    required : true
  },
  IN_gender : {
    type : String,
    required : true
  },
  IN_email : {
    type : String,
    required : true
  },
  IN_subject : {
    type : String,
    required : true
  },
  IN_accNumber : {
    type : String,
    required : true
  },
  IN_password : {
    type : String,
    required : true
  },
}, { timestamps: true })

module.exports = mongoose.model('Instructor', instructorSchema)