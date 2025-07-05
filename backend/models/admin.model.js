import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true , 
        unique : true,
        lowercase: true
    },
    phoneNumber : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        default : "Admin",
        required : true
    },
    profile : {
        bio : {type : String},
        profilePhoto : {type : String , default : ""}
    }
},{
    collection : "Admin" ,
    timestamps : true
})

export const Admin =  mongoose.model("Admin" , adminSchema);