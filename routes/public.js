const express = require('express');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const {authUser} = require('../controllers/authenticationController');
const Student = require('../models/studentModel');
const Instructor = require('../models/instructorModel');

const router = express.Router()

// #############################PUBLIC#############################

router.post('/login', authUser);

module.exports = router