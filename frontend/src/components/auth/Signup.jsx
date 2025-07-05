import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import Navbar from '../shared/Navbar'
import { ADMIN_API_END_POINT } from '@/utils/constant'

export const Signup = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        role: ""
    })
    const loading = false;
    const changeEventHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
   

    // api call hogi isliye async fn. bnaenge
    const submitHandler = async(e)=> {
        e.preventDefault();
        try {
           
           const formData = new FormData()
           formData.append("name"  , data.name)
           formData.append("email"  , data.email)
           formData.append("phoneNumber"  , data.phoneNumber)
           formData.append("password"  , data.password)
           formData.append("role"  , data.role)
           
           const res =  await axios.post(`${ADMIN_API_END_POINT}/register` , formData , {
            headers:{
                "Content-Type" :  "multipart/form-data"
            },
            withCredentials : true
           })
           if(res.data.success){
               navigate("/login")
               toast.success(res.data.message)
           }
        } catch (error) {
            console.log(error)
           // toast.error(error.response.data.message)
        }finally {
                    
                }
    }

    return (
        <div>
            <Navbar/>
            <div className='flex items-center justify-center max-w-7xl mx-auto' >
                <form onSubmit={submitHandler} className='w-1/2 border border-grey-200 rounded-md p-4 my-10'>
                    <h1 className="font-bold text-xl mb-5">Sign Up</h1>
                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input className="my-1"
                            type="text"
                            value={data.name}
                            name="name"
                            onChange={changeEventHandler}
                            placeholder="enter your name"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input className="my-1"
                            type="email"
                            value={data.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="enter your email"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Phone Number</Label>
                        <Input className="my-1"
                            type="text"
                            name="phoneNumber"
                            value={data.phoneNumber}
                            onChange={changeEventHandler}
                            placeholder="enter your number"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input className="my-1"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={changeEventHandler}
                            placeholder="enter your number"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 my-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="role"
                                    value="Employee"
                                    checked={data.role === 'Employee'}
                                    onChange={changeEventHandler}
                                    className="accent-blue-600 cursor-pointer" />
                                Employee
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="role"
                                    value="Admin"
                                    checked={data.role === 'Admin'}
                                    onChange={changeEventHandler}
                                    className="accent-blue-600 cursor-pointer" />
                                Admin
                            </label>
                        </div>
                        <div className='flex items-center gap-2 '>
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                               
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                    
                            <Button  type="submit" className="w-full my-4 ">Signup</Button>
                        
                    <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-500'>  Login </Link> </span>
                </form>
            </div>
        </div>
    )
}
