const express = require('express');
const auth = require('../middleware/auth')
const Class = require('../models/classModel')

const {
  studentProfile,
  getStudent,
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/studentControllers')

const { 
  getUsers,
  userProfile, 
  getUser, 
  createUser, 
  deleteUser, 
  updateUser
 } = require('../controllers/userControllers');


const {
  getParents,
  getParent,
  createParent,
  deleteParent,
  updateParent,
  getMyStudents
} = require('../controllers/parentControllers')


const {
  getInstructors,
  getInstructor,
  createInstructor,
  deleteInstructor,
  updateInstructor
} = require('../controllers/instructorControllers')

const {
  getStaffMembers,
  getStaffMember,
  createStaffMember,
  deleteStaffMember,
  updateStaffMember
} = require('../controllers/staffMemberControllers')

const {
  getAllClasses,
  getClass,
  createClass,
  deleteClass,
  updateClass,
  getInstructorClass,
  getClassFeesForInstructor
} = require('../controllers/classControllers')

const {
  getAllPaidClassFees,
  getPayment,
  payClassFee,
  deletePayment,
  updatePayment,
  getAllPaidAddmisions,
  getAllPaidClassFeesOfStudent,
  myClasses,
  getAllPaidClassFeesOfStudentForClass,
  getAllStudentsPaidClassFeeForClass,
  getAllStudentsOfClass,
  getInstructorPayments
} = require('../controllers/paymentControllers')

const {
  getNotifications,
  getNotification,
  createNotification,
  deleteNotification,
  updateNotification,
  createEarlyLeaveNotification
} = require('../controllers/notificationControllers')

const {
  getAssignments,
  getAssignment,
  createAssignment,
  deleteAssignment,
  updateAssignment
} = require('../controllers/assignmentControllers')

const {
  getResults,
  getResult,
  createResult,
  deleteResult,
  updateResult,
  getAllAssignmentIdsOfClass,
  getAllResultsOfAssignment,
  getAllResultsOfAssignmentForParentView
} = require('../controllers/resultControllers')

const {
  getStudentAttendance,
  getAttendance,
  createAttendance,
  deleteAttendance,
  updateAttendance,
  markAttendance,
  getClassAttendance
} = require('../controllers/attendanceControllers');



const router = express.Router()

// #############################User#############################
  // GEt user profile
  router.get('/user/profile', auth ,userProfile)

  // GET all user
  router.get('/user/', auth, getUsers)

  // GET a single user
  router.get('/user/:id', getUser)

  // POST a new user
  router.post('/user/', createUser)
  
  // DELETE a user
  router.delete('/user/:id', deleteUser)
  
  // UPDATE a user
  router.patch('/user/:id', updateUser)

// #############################Student#############################

  // GEt student profile
  router.get('/student/profile', auth, studentProfile)

  // GET all student
  router.get('/student/', getStudents)

  // GET a single student
  router.get('/student/:id', getStudent)

  // POST a new student
  router.post('/student/', createStudent)
  
  // DELETE a student
  router.delete('/student/:id', deleteStudent)
  
  // UPDATE a student
  router.patch('/student/:id', updateStudent)


// #############################Parent#############################


  // GET all parents
  router.get('/parent/',auth ,getParents)

  // GET all students of a parent
  router.get('/parent/students', auth, getMyStudents)

  // GET a single parent
  router.get('/parent/:id', getParent)

  // POST a new parent
  router.post('/parent/', createParent)

  // DELETE a parent
  router.delete('/parent/:id', deleteParent)

  // UPDATE a parent
  router.patch('/parent/:id', updateParent) 


// #############################Instructor#############################


  // GET all instructors
  router.get('/instructor/', getInstructors)

  // GET a single instructor
  router.get('/instructor/:id', getInstructor)

  // POST a new instructor
  router.post('/instructor/', createInstructor)

  // DELETE a instructor
  router.delete('/instructor/:id', deleteInstructor)

  // UPDATE a instructor
  router.patch('/instructor/:id', updateInstructor) 


// #############################Staffmember#############################


  // GET all staffMembers
  router.get('/staffMember/', getStaffMembers)

  // GET a single staffMember
  router.get('/staffMember/:id', getStaffMember)

  // POST a new staffMember
  router.post('/staffMember/', createStaffMember)

  // DELETE a staffMember
  router.delete('/staffMember/:id', deleteStaffMember)

  // UPDATE a staffMember
  router.patch('/staffMember/:id', updateStaffMember)


// #############################Class#############################


  // GET all classes
  router.get('/class/', getAllClasses)

  // GET a single class
  router.get('/class/:id', getClass)

  // POST a new class
  router.post('/class/', createClass)

  // DELETE a class
  router.delete('/class/:id', deleteClass)

  // UPDATE a class
  router.patch('/class/:id', updateClass)

  // GET all classes of instructor
  router.get('/getInstructorClasses/:id', getInstructorClass)

  // get all class and their paid fees for instructor
  router.get('/getClassFeesForInstructor', auth, getClassFeesForInstructor)


// #############################Payment#############################


  // GET all payments
  router.get('/allClassFees/', getAllPaidClassFees)
 
  // GET all paid fees of a student
  router.get('/allClassFees/:id', getAllPaidClassFeesOfStudent)
  
  // GET all paid student for a class
  router.get('/allStudentFees/:classID', getAllStudentsPaidClassFeeForClass)
  
  // GET all student those who are registered for a class
  router.get('/allStudents/:classID', auth, getAllStudentsOfClass)

  // GET class fees for a particular class for a particular student
  router.get('/payment/:classID/student/:id', auth, getAllPaidClassFeesOfStudentForClass)

  // GET all registered students
  router.get('/allAddmissions/', getAllPaidAddmisions)
  
  // get all classes of a student
  router.get('/allAddmissions/:id', auth, myClasses)

  // GET a single payment
  router.get('/payment/:id', getPayment)
  
  // get all payments that are paid for a instructor
  router.get('/instructor/institute-payments/:IN_ID', auth ,getInstructorPayments)

  // POST a new payment
  router.post('/payment', auth, payClassFee)

  // DELETE a payment
  router.delete('/payment/:id', deletePayment)

  // UPDATE a payment
  router.patch('/payment/:id', updatePayment)


// #############################Notification#############################


  // GET all notifications
  router.get('/notification/', auth, getNotifications)

  // GET a single notification
  router.get('/notification/:id', getNotification)

  // POST a new notification
  router.post('/instructor/notification/create/', createNotification)
  
  router.post('/notification/create/', createEarlyLeaveNotification)

  // DELETE a notification
  router.delete('/notification/:id', deleteNotification)

  // UPDATE a notification
  router.patch('/notification/:id', updateNotification)
  
  
  // #############################Assignment#############################
  
  
  // GET all assignments
  router.get('/assignment/', getAssignments)
  
  // GET a single assignment
  router.get('/assignment/:id', getAssignment)
  
  // POST a new assignment
  router.post('/assignment/', createAssignment)
  
  // DELETE a assignment
  router.delete('/assignment/:id', deleteAssignment)
  
  // UPDATE a assignment
  router.patch('/assignment/:id', updateAssignment)
  
  
// #############################Result#############################


  // GET all results
  router.get('/result/', getResults)

  // GET a single result
  router.get('/result/:id', getResult)
  
  // GET all assignment ids of a Class
  router.get('/getAllAssignmentIdsOfClass', getAllAssignmentIdsOfClass)

  // GET all results of all assignments 
  router.get('/getAllResultsOfAssignment', getAllResultsOfAssignment)

  // GET all results of assignments of a student for parent
  router.get('/getAllResultsOfAssignmentForParentView', getAllResultsOfAssignmentForParentView)

  // POST a new result
  router.post('/result/', createResult)

  // DELETE a result
  router.delete('/result/:id', deleteResult)

  // UPDATE a result
  router.patch('/result/:id', updateResult)


// #############################Attendance#############################


  // GET all attendances
  router.get('/getStudentAttendance/', auth,getStudentAttendance)

  // GET a single attendance
  router.get('/attendance/:id', getAttendance)

  // POST a new attendance
  router.post('/attendance/', createAttendance)

  // MARK student attendance
  router.post('/mark-attendance', markAttendance)

  // GET student attendance of a class for a particular date
  router.get('/show-attendance/:class_ID/:date', getClassAttendance)

  // DELETE a attendance
  router.delete('/attendance/:id', deleteAttendance)

  // UPDATE a attendance
  router.patch('/attendance/:id', updateAttendance)



  
  module.exports = router