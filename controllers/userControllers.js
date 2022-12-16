require('dotenv').config()

const User = require('../models/userModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')

const userProfile = async (req,res) => {
  try{
    const user = await User.findById(req.user.id).select('-password');
    res.json(user)
  } catch(err){
    res.status(500).send('Server error')
  }
}

// get all user
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({createdAt: -1})

  res.status(200).json(users)
}

// get a single user
const getUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }

  const user = await User.findById(id)

  if (!user) {
    return res.status(404).json({error: 'No such user'})
  }

  res.status(200).json(user)
}

// create a new user
const createUser = async (req, res) => {
    // const {ST_ID, ST_firstName} = req.body
    const {
      ID,	
      userType,
      firstName,	
      lastName,	
      contactNumber,	
      gender,	
      email,	
      PA_email,
      level,	
      year,	
      password, 
      subject,
      accNumber,
      address,
      nic,
      created_date, 
      updated_date
    } = req.body
    
    try {
        let user = await User.findOne({email});

        if(user){
          console.log("Email exist")
          return res.status(400).json({msg: 'User already exist!'});
        }
        
        // console.log(email)
        const avatar = gravatar.url(email, {
          s : '200',
          r : 'pg',
          d : 'mm'
        })
        
        user = new User({
          ID,
          userType,
          firstName,	
          lastName,
          avatar,	
          contactNumber,	
          gender,	
          email,	
          PA_email,
          level,	
          year,	
          password, 
          subject,
          accNumber,
          address,
          nic,
          created_date, 
          updated_date
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        const resonse = await user.save();
        console.log("User created")
        // res.status(200).json({msg: 'User registration success!'});
        
        // res.st atus(200).send(user)
        await user.save();

        // user information need to include in jwt token
        const payload = {
          user: {
            id : user.id
          }
        }

        jwt.sign(
          payload, 
          process.env.JWTSECRET,
          {expiresIn : 360000},   // ! set token expire time
          (err, token)=> {
            if(err) throw err;
            res.status(200).json({token,msg: 'User registration success!'});
          }
        )

    } catch (error) { 
        // res.status(400).json({error: error.message})
        res.status(400).json({msg: 'server error'})
        console.log(error)
    }
}

// delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such user'})
  }

  const user = await User.findOneAndDelete({_id: id})

  if(!user) {
    return res.status(400).json({error: 'No such user'})
  }

  res.status(200).json(user)
}

// update a user
const updateUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such user'})
  }

  const user = await User.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!user) {
    return res.status(400).json({error: 'No such user'})
  }

  res.status(200).json(user)
}

module.exports = {
  userProfile,
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser
}