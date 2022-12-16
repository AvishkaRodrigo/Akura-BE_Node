require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const protectedRoutes = require('./routes/protected')
const publicRoutes = require('./routes/public')
const auth = require('./middleware/auth')
const connectDB = require('./config/db')
const Student = require('./models/studentModel')
const User = require('./models/userModel')



// express app
const app = express()

// listen to port
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

// middleware
app.use(express.json())

// connect to db
connectDB()
.then(()=>{
  app.listen(process.env.PORT, () => {
    console.log('listening for requests on port', process.env.PORT)
  });
})
.catch((err)=>{console.log(err)})

// routes

app.use('/login/akura', auth, async(req, res)=> {
  try{
    const user = await User.findById(req.user.id).select('-password')
    res.json(user);
  }catch (err){
    console.error(err.message);
    res.status(500).send('Server error')
  }
})

app.use('/akura', protectedRoutes)
app.use('/public/akura', publicRoutes)


// app.use((req, res, next) => {
//   console.log(req.path, req.method)
//   next()
// })

// // connect to db
// try {
//   mongoose.connect(process.env.MDB_URI)
// }  catch {
//     console.log(err)
// }



// .then(() => {
  //   console.log('connected to database')
  // })
  // .catch((err) => {
  //   console.log(err)
  //   process.exit(1)
  // }) 