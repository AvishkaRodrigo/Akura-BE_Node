const mongoose = require('mongoose')

const Schema = mongoose.Schema

const staffMemberSchema = new Schema({
  SM_ID : {
    type : String,
    required : true
  },
  SM_name : {
    type : String,
    required : true
  },
  SM_contactNumber : {
    type : String,
    required : true
  },
  SM_gender : {
    type : String,
    required : true
  },
  SM_email : {
    type : String,
    required : true
  },
  SM_NIC : {
    type : String,
    required : true
  },
  SM_password : {
    type : String,
    required : true
  },
}, { timestamps: true })

module.exports = mongoose.model('StaffMember', staffMemberSchema)