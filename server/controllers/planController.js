import Plan from "../models/planModel.js";
import User from "../models/userModel.js";
export const createPlan =async(req,res)=>{
      const{name,price,quanlity} = req.body
     try {
         const plan = await Plan.create({
             name,price,quanlity
         })
         await plan.save()
         res.status(201).json(plan)
         
     } catch (error) {
        res.status(500).json({message:'Somthing went wrong'})
     }
}

export const getAllPlans = async(req,res)=>{
    try {
        const plans = await Plan.find()
        res.status(200).json(plans)
    } catch (error) {
        res.status(500).json({message:'Somthing went wrong'})
    }
}

export const subscription = async(req,res)=>{
    const{planId,wallet} = req.body
    try {
        const plan = await Plan.find({_id:planId ,users:req.user._id})
        if(plan.length >0)return res.status(400).json({msg:'you already subscribed this plan'})
        const newPlan = await Plan.findOneAndUpdate({ _id:planId },
            {$push:{users:req.user._id}},{new:true} )
        await User.findByIdAndUpdate({_id:req.user._id},{
             subscription:true,paymentBy:wallet
        },{new:true})
        res.json({
            success:true,
            newPlan
        })
    } catch (error) {
        res.status(500).json({message:'Somthing went wrong'})
    }
}

export const deleteSub = async(req,res)=>{
    const{planId} = req.body
    try {
        const plan = await Plan.find({_id:planId ,users:req.user._id})
        if(!plan.length)return res.status(400).json({msg:'you have not subscribed this plan yet'})
         const newPlan =await Plan.findOneAndUpdate({ _id:planId },
            {$pull:{users:req.user._id}},{new:true} )
         await User.findByIdAndUpdate({_id:req.user._id},{
            subscription:false
        },{new:true})
        res.json({
            message:'You unsubscribed this plan',
            newPlan
        })
    } catch (error) {
        res.status(500).json({message:'Somthing went wrong'})
    }

}

export const getSubByUserId = async(req,res)=>{
   const{id} = req.params
    try {
       const plan = await Plan.find({users:{$elemMatch:{$eq:id}}}) 
       if(!plan) return res.status(400).json({message:'Not found'})
       res.json(plan)
    } catch (error) {
        res.status(500).json({message:'Somthing went wrong'})
    }
}