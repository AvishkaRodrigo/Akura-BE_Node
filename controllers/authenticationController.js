require('dotenv').config()

const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const User = require('../models/userModel');
const Instructor = require('../models/instructorModel');


// create a new user
const authUser = (
    [
        check('email','Please include valid email').isEmail(),
        check('password','Password is required').exists()
    ],

    async (req, res) => {
        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {email, password} = req.body;
        try {
            let user = await User.findOne({email});

            // TODO implement a logic to log all type of users

            // let user = await Instructor.findOne({email});
            if (!user) {
                return res.status(400).json({errors: [{msg : "Invalid credentials"}]})
            }
            
            const isMatch = await bcrypt.compare(password,user.password)

            if(!isMatch) {
                return res.status(400).json({errors: [{msg: 'Invalid credentials'}]});
            }

            const payload = {
                user : {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                process.env.JWTSECRET,
                {expiresIn : 360000},   // ! set token expire time
                (err, token)=> {
                if(err) throw err;
                res.json({token});
                }
            )

        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server error')
        }
    }
)

module.exports = {
    authUser
}