const express = require('express')
const UserController = require('../controllers/userController')
const ExerciseLogController = require('../controllers/exerciseLogController')
const AuthController = require('../controllers/authController')
const { authenticateToken } = require('../utils/methods');

const routes = express.Router()

// user routes
routes.route('/users').get(UserController.getUsers)
routes.route('/users').post(UserController.addUser)
routes.route('/users/:id').get(UserController.getUserById)
routes.route('/users/:id').put(UserController.updateUser)
routes.route('/users/:id').delete(UserController.removeUser)

// auth routes
routes.route('/login').post(AuthController.login)
routes.route('/signup').post(AuthController.register)

// exerciselogs routes
routes.route('/exerciseLog').get(authenticateToken, ExerciseLogController.get)
routes.route('/exerciseLog').post(authenticateToken, ExerciseLogController.create)
routes.route('/exerciseLog/:id').get(authenticateToken, ExerciseLogController.getOne)
routes.route('/exerciseLog/:id').put(authenticateToken, ExerciseLogController.update)
routes.route('/exerciseLog/:id').delete(authenticateToken, ExerciseLogController.delete)
routes.route('/user/exerciseLog').get(authenticateToken, ExerciseLogController.getUserLogs)
module.exports = routes;
