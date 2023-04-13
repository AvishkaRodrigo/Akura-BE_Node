require('dotenv').config()

const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const User = require('../models/userModel');

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
            console.log(user)
            if (!user) {
                return res.status(400).json({errors: [{msg : "Invalid credentials"}]})
            }
            
            const isMatch = bcrypt.compare(password, user.password)

            if(!isMatch) {
                return res.status(400).json({errors: [{msg: 'Invalid credentials'}]});
            }
            let payload;
            if(user.userType == 2){
                payload = {
                    user : {
                        id: user.id,
                        userID : user.ID,
                        userType : user.userType,
                        email : user.email,
                        studentIds : user.email2
                    }
                }
            }else{
                payload = {
                    user : {
                        id: user.id,
                        userID : user.ID,
                        userType : user.userType,
                        email : user.email
                    }
                }
            }

            jwt.sign(
                payload,
                process.env.JWTSECRET,
                {expiresIn : 3600},   // ! set token expire time
                (err, token)=> {
                    const decoded = jwt.verify(token, process.env.JWTSECRET)
                    if(err) throw err;

                    res.json({token: token, info : decoded});
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