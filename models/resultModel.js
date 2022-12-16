const mongoose = require('mongoose')

const Schema = mongoose.Schema

const resultSchema = new Schema({
  ST_ID : {
    type : String,
    required : true
  },
  assignment_ID : {
    type : String,
    required : true
  },
  marks : {
    type : String,
    required : true
  },

}, { timestamps: true })

module.exports = mongoose.model('Result', resultSchema)




