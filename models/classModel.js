const mongoose = require('mongoose')

const Schema = mongoose.Schema

const classSchema = new Schema({
  class_ID : {
    type : String,
    // required : true
  },
  IN_ID : {
    type : String,
    required : true
  },
  grade : {
    type : String,
    required : true
  },
  classType : {
    type : String,
    required : true
  },
  hall : {
    type : String,
    required : true
  },
  classDate : {
    type : String,
    required : true
  },
  startTime : {
    type : String,
    required : true
  },
  endTime : {
    type : String,
    required : true
  },
  admission : {
    type : Number,
    required : true
  },
  classFee : {
    type : Number,
    required : true
  },
  paymentLink : {
    type : String,
    required : true
  },
}, { timestamps: true })

module.exports = mongoose.model('Class', classSchema)




