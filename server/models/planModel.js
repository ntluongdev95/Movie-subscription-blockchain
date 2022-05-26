import mongoose from 'mongoose'
const planSchema =mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quanlity:{
        type:String,
        required:true
    },
    users:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    date:{
        type:Date,
        default:Date.now
    }

})
const Plan = mongoose.model('Plan',planSchema)
export default Plan