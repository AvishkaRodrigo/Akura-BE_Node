require('dotenv').config()
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MDB_URI, {
      useNewUrlParser: true
    })
    console.log('connected to database')
  }catch(err){
    console.log(err)
    process.exit(1);
  }
}

module.exports = connectDB;


  // .then(() => {
  //   // listen to port
  //   app.listen(process.env.PORT, () => {
  //     console.log('listening for requests on port', process.env.PORT)
  //   })
  // })
  // .catch((err) => {
  //   console.log(err)
  //   process.exit(1);
  // }) 