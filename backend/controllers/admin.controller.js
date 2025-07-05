import { Admin } from "../models/admin.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const adminRegister = async(req , res)=>{
    try {

        const adminExists = await Admin.findOne();
        if(adminExists){
            res.status(401).json({
                success : false,
                message : "Admin already exists"
            })
            res.send();
        }
        
        const { name , email , phoneNumber , password , role} = req.body;
        if (!name || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        const hashedPass = await bcrypt.hash(password,10)

        await Admin.create({
            name , email , phoneNumber , password : hashedPass , role 
        })
        res.status(201).json({
            success : true ,
            message : "Admin registered Successfully"
        })
        
    } catch (error) {
        console.log(error)
    }
}

export const adminLogin = async(req , res)=>{
try {
    const {email , password , role} = req.body;
    if(!email || !password || !role){
        return res.status(400).json({
            success : false,
            message : "Something is missing"
        })
    }
    const admin = await Admin.findOne({email});
    if(!admin){
       return res.status(400).json({
            success : false ,
            message : "Incorrect email or password"
        })
    }
    const isPassMatch = await bcrypt.compare(password ,  admin.password)
    if(!isPassMatch){
       return  res.status(400).json({
            success : false,
            message : "Incorrect Password"
        })
    }
    const tokenData = { 
        adminId : Admin._id ,
        role : "Admin"
    }
    const token = jwt.sign(tokenData , process.env.SECRET_KEY , {expiresIn : '1h'})
   return res.status(200).cookie("token" , token , { maxAge: 1 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
        success : true ,
        message : `Welcome ${admin.name}`
    })
} catch (error) {
    console.log(error)
}
}

export const adminLogout = async(req ,res)=>{
    try {
        return res.status(200).cookie("token" , "" , {maxAge : 0}).json({
            success : true,
            message : "Logged out successfully"
        })
    } catch (error) {
        console.log(error)
    }
}