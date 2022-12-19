const mongoose = require('mongoose')

const Schema = mongoose.Schema

const parentSchema = new Schema({
  PA_ID : {
    type : String,
    required : true
  },
  ST_ID : {
    type : String,
    // required : true
  },
  PA_name : {
    type : String,
    required : true
  },
  PA_contactNumber : {
    type : String,
    required : true
  },
  PA_gender : {
    type : String,
    required : true
  },
  email2 : {
    type : String,
    required : true
  },
  PA_address : {
    type : String,
    required : true
  },
  PA_password : {
    type : String,
    required : true
  },
}, { timestamps: true })

module.exports = mongoose.model('Parent', parentSchema)