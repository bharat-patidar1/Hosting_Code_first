import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({
    name : {
        type : String,
        required: [true, "Name is required"],
    },
    email : {
        type : String,
        required: [true, "Email is required"], 
        unique : true,
        lowercase: true
    },
    phoneNumber : {
        type : Number,
        required: [true, "Phone number is required"],
    },
    department: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    password : {
        type : String,
        required: [true, "Password is required"],
    },
    role : {
        type : String,
        default : "Employee",
        required : true
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
    profile : {
        bio : {type : String},
        skills : [{type : String}],
        profilePhoto : {type : String , default : ""}
    }
},{
    collection : "Employee" ,
    timestamps : true
})

export const Employee =  mongoose.model("Employee" , employeeSchema);