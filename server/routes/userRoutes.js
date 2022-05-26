import express from 'express'
import { login, signup , getUser} from '../controllers/userController.js'
import { auth } from '../middleware/authMiddleware.js'
const router = express.Router()
 router.post('/signup',signup)
 router.post('/login',login)
 router.get('/',auth,getUser)
 
export default router