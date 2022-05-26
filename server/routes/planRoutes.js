import express from 'express'
import { createPlan, getAllPlans,subscription ,deleteSub,getSubByUserId} from '../controllers/planController.js'
import { auth,admin } from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/',auth,admin,createPlan)
router.get('/',getAllPlans)
router.get('/:id',auth,getSubByUserId)
router.put('/subscription',auth,subscription)
router.put('/subscription/delete',auth,deleteSub)
export default router