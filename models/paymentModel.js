const mongoose = require('mongoose')

const Schema = mongoose.Schema

const paymentSchema = new Schema({
  payment_ID : {
    type : Number,
    // required : true
  },	
  class_ID : {
    type : String,
    required : true
  },
  ST_ID : {
    type : String,
    required : true
  },
  IN_ID : {
    type : String,
    // required : true
  },	
  SM_ID : {
    type : String,
    // required : true
  },	
  Admission : {  
    type : Boolean,
    required : true
  },  
  Amount : {  
    type : Number,
    required : true
  },  
  month : {
    type : String,
    required : true
  },
  Type : {
    type : String,      // STU - student payements, INS - instructor payments
    required : true
  },

}, { timestamps: true })

module.exports = mongoose.model('Payment', paymentSchema)




