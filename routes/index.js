const express = require('express')
const UserController = require('../controllers/userController')
// const ExerciseController = require('../controllers/exercise.controller')
// const WorkoutController = require('../controllers/workout.controller')
// const AuthController = require('../controllers/auth.controller')
// const { authenticate } = require('../middleware/auth')

const routes = express.Router()

routes.route('/users').get(UserController.getUsers)
routes.route('/users').post(UserController.addUser)
routes.route('/users/:id').get(UserController.getUserById)
routes.route('/users/:id').put(UserController.updateUser)
routes.route('/users/:id').delete(UserController.removeUser)

module.exports = routes;
