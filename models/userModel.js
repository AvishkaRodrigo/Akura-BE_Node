const mongoose = require('mongoose');
const moment = require('moment-timezone');

const DateSL = new Date();

const Schema = mongoose.Schema

const userSchema = new Schema({
  ID : {
    type : String,
    // required : true
  },
  userType : {
    type : Number,
    // required : true
  },
  firstName : {
    type : String,
    // required : true
  },
  lastName : {
    type : String,
    // required : true
  },
  avatar : {
    type : String,
    // required : true
  },
  contactNumber : {
    type : String,
    // required : true
  },
  gender : {
    type : String,
    // required : true
  },
  email : {
    type : String,
    // required : true
  },
  email2 : {
    type : [String],
    // required : true
  },
  level : {
    type : String,
    // required : true
  },
  year : {
    type : String,
    // required : true
  },
  password : {
    type : String,
    // required : true
  },

  subject : {
    type : String,
    // required : true
  },
  accNumber : {
    type : String,
    // required : true
  },
  address : {
    type : String,
    // required : true
  },
  nic : {
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

module.exports = mongoose.model('User', userSchema)




