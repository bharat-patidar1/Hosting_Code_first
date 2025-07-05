import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import Navbar from '../shared/Navbar'
import { ADMIN_API_END_POINT, Employee_API_END_POINT } from '@/utils/constant'
import { setLoading } from '@/redux/loadSlice'
import { useDispatch, useSelector } from 'react-redux'


// named export
export const Login = () => {

    const [input, setInput] = useState({
        email: "",
        password: "",
        role: ""
    })
    const { loading } = useSelector(store => store.load);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            if (input.role == 'Admin') {
                const res = await axios.post(`${ADMIN_API_END_POINT}/login`, input, {
                    headers: {
                        "Content-Type": "application/json "
                    },
                    withCredentials: true
                })
                if (res.data.success) {

                    navigate("/admin/dashboard")
                    toast.success(res.data.message)
                }
            } else {
                 const res = await axios.post(`${Employee_API_END_POINT}/login`, input, {
                    headers: {
                        "Content-Type": "application/json "
                    },
                    withCredentials: true
                })
                if (res.data.success) {

                    navigate("/employee/dashboard")
                    toast.success(res.data.message)
                }
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            dispatch(setLoading(false));
        }
    }


    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto' >
                <form onSubmit={submitHandler} className='w-1/2 border border-grey-200 rounded-md p-4 my-10'>
                    <h1 className="font-bold text-xl mb-5">Login</h1>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input className="my-1"
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            placeholder="enter your email"
                        />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input className="my-1"
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            placeholder="enter your pass"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 my-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="role"
                                    value="Student"
                                    checked={input.role === 'Student'}
                                    onChange={changeEventHandler}
                                    className="accent-blue-600 cursor-pointer" />
                                Employee
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="role"
                                    value="Recruiter"
                                    checked={input.role === 'Recruiter'}
                                    onChange={changeEventHandler}
                                    className="accent-blue-600 cursor-pointer" />
                                Admin
                            </label>
                        </div>
                    </div>

                    {
                        loading ? (
                            <Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait</Button>

                        ) : (
                            <Button type="submit" className="w-full my-4 ">Login</Button>
                        )
                    }


                    <span className='text-sm'>Don't remember password <Link to={'/employee/forgetPassword'} className='text-blue-500'>Forget Password</Link> </span>
                </form>
            </div>
        </div>
    )
}
