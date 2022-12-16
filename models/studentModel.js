const mongoose = require('mongoose');
const moment = require('moment-timezone');

const DateSL = new Date();

const Schema = mongoose.Schema

const studentSchema = new Schema({
  ST_ID : {
    type : String,
    // required : true
  },
  ST_firstName : {
    type : String,
    // required : true
  },
  ST_lastName : {
    type : String,
    // required : true
  },
  ST_avatar : {
    type : String,
    // required : true
  },
  ST_contactNumber : {
    type : String,
    // required : true
  },
  ST_gender : {
    type : String,
    // required : true
  },
  ST_email : {
    type : String,
    // required : true
  },
  ST_level : {
    type : String,
    // required : true
  },
  ST_year : {
    type : String,
    // required : true
  },
  ST_password : {
    type : String,
    // required : true
  },
  // created_date : {
  //   type : Date,
  //   default : DateSL
  // },
  // updated_date : {
  //   type : Date,
  //   default : DateSL
  // },

},{timestamps : true})

module.exports = mongoose.model('Student', studentSchema)




