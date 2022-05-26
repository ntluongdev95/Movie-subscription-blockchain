import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const signup = async(req,res)=>{
    try {
        const{name,email,password} = req.body
        if(!name ||!email || !password){
            return res.status(400).json({message:'Please fill in all files'})
         }
         if(!validateEmail(email))
         return res.status(400).json({message: "Invalid emails."})
        const user = await User.findOne({email})
        if(user) return res.status(400).json({message:"This email already exists."})
        if(!validatePassword(password)){
            return res.status(400).json({message: "Password must contain minimum six characters, at least one uppercase letter, one lowercase letter and one number"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = await User.create({
            name,email,password:hashedPassword
        })
        await newUser.save()
        res.json({
            _id:newUser._id,
            name:newUser.name,
            token:token(newUser._id),
            isAdmin:newUser.isAdmin,
            subscription:newUser.subscription,
        })
    } catch (error) {
        res.status(500).json({message:'Somthing went wrong'})
    }
}

export const login = async(req,res)=>{
    const{email,password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({message:"Email is incorrect"})
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(400).json({message:"Password is incorrect"})
        res.status(200).json({
            _id:user._id,
            name:user.name,
            token:token(user._id),
            isAdmin:user.isAdmin,
            subscription:user.subscription,
            paymentBy :user.paymentBy
        })
    } catch (error) {
        res.status(500).json({message:'Somthing went wrong'})
    }
}



export const getUser =async(req,res)=>{
    try {
        const user = await User.findById(req.user._id).select('-password')  
        res.status(200).json({
            user
        })
          
      } catch (error) {
        res.status(500).json({message:error.message})
      }
}


///check-email

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword =(password)=>{
    const re = /^(?=.*\d)(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/
    return re.test(password);
   
}


const token =(id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}

