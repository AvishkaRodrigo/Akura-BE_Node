const mongoose = require('mongoose')

const Schema = mongoose.Schema

const paymentSchema = new Schema({
  payment_ID : {
    type : String,
    required : true
  },	
  class_ID : {
    type : String,
    required : true
  },
  ST_ID : {
    type : String,
    required : true
  },
  SM_ID : {
    type : String,
    required : true
  },	
  Amount : {  
    type : String,
    required : true
  },  
  month : {
    type : String,
    required : true
  },
  Type : {
    type : String,
    required : true
  },

}, { timestamps: true })

module.exports = mongoose.model('Payment', paymentSchema)




