const mongoose = require('mongoose')

const Schema = mongoose.Schema

const assignmentSchema = new Schema({
  assign_ID : {
    type : String,
    // required : true
  },
  class_ID : {
    type : String,
    required : true
  },
  assign_description : {
    type : String,
    required : true
  },
  assign_link : {
    type : String,
    required : true
  },
  deadline : {
    type : Date,        // should be able to store not only date but also time as well 
    required : true
  },

}, { timestamps: true })

module.exports = mongoose.model('Assignment', assignmentSchema)