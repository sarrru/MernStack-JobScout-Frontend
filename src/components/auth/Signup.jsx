// import React, { useEffect, useState } from 'react'
// import Navbar from '../shared/Navbar'
// import { Label } from '../ui/label'
// import { Input } from '../ui/input'
// import { RadioGroup } from '../ui/radio-group'
// import { Button } from '../ui/button'
// import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { USER_API_END_POINT } from '@/utils/constant'
// import { toast } from 'sonner'
// import { useDispatch, useSelector } from 'react-redux'
// import { setLoading } from '@/redux/authSlice'
// import { Loader2 } from 'lucide-react'

// const Signup = () => {

//     const [input, setInput] = useState({
//         fullname: "",
//         email: "",
//         phoneNumber: "",
//         password: "",
//         role: "",
//         file: ""
//     });
//     const {loading,user} = useSelector(store=>store.auth);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const changeEventHandler = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value });
//     }
//     const changeFileHandler = (e) => {
//         setInput({ ...input, file: e.target.files?.[0] });
//     }
//     const submitHandler = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();    //formdata object
//         formData.append("fullname", input.fullname);
//         formData.append("email", input.email);
//         formData.append("phoneNumber", input.phoneNumber);
//         formData.append("password", input.password);
//         formData.append("role", input.role);
//         if (input.file) {
//             formData.append("file", input.file);
//         }

//         try {
//             dispatch(setLoading(true));
//             const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
//                 headers: { 'Content-Type': "multipart/form-data" },
//                 withCredentials: true,
//             });
//             if (res.data.success) {
//                 navigate("/login");
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response.data.message);
//         } finally{
//             dispatch(setLoading(false));
//         }
//     }

//     // useEffect(()=>{
//     //     if(user){
//     //         navigate("/");
//     //     }
//     // },[user]);
//     return (
//         <div>
//             <Navbar />
//             <div className='flex items-center justify-center max-w-7xl mx-auto'>
//                 <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
//                     <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
//                     <div className='my-2'>
//                         <Label>Full Name</Label>
//                         <Input
//                             type="text"
//                             value={input.fullname}
//                             name="fullname"
//                             onChange={changeEventHandler}
//                             placeholder="saru"
//                         />
//                     </div>
//                     <div className='my-2'>
//                         <Label>Email</Label>
//                         <Input
//                             type="email"
//                             value={input.email}
//                             name="email"
//                             onChange={changeEventHandler}
//                             placeholder="saru@gmail.com"
//                         />
//                     </div>
//                     <div className='my-2'>
//                         <Label>Phone Number</Label>
//                         <Input
//                             type="text"
//                             value={input.phoneNumber}
//                             name="phoneNumber"
//                             onChange={changeEventHandler}
//                             placeholder="8080808080"
//                         />
//                     </div>
//                     <div className='my-2'>
//                         <Label>Password</Label>
//                         <Input
//                             type="password"
//                             value={input.password}
//                             name="password"
//                             onChange={changeEventHandler}
//                             placeholder="Enter your password"
//                         />
//                     </div>
//                     <div className='flex items-center justify-between'>
//                         <RadioGroup className="flex items-center gap-4 my-5">
//                             <div className="flex items-center space-x-2">
//                                 <Input
//                                     type="radio"
//                                     name="role"
//                                     value="student"
//                                     checked={input.role === 'student'}
//                                     onChange={changeEventHandler}
//                                     className="cursor-pointer"
//                                 />
//                                 <Label htmlFor="r1">Student</Label>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                                 <Input
//                                     type="radio"
//                                     name="role"
//                                     value="recruiter"
//                                     checked={input.role === 'recruiter'}
//                                     onChange={changeEventHandler}
//                                     className="cursor-pointer"
//                                 />
//                                 <Label htmlFor="r2">Recruiter</Label>
//                             </div>
//                         </RadioGroup>
//                         <div className='flex items-center gap-2'>
//                             <Label>Profile</Label>
//                             <Input
//                                 accept="image/*"
//                                 type="file"
//                                 onChange={changeFileHandler}
//                                 className="cursor-pointer"
//                             />
//                         </div>
//                     </div>
//                     {
//                         loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Signup</Button>
//                     }
//                     <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Signup



import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const { loading } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });

            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong.");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div>
            <Navbar />
            {/* Added margin-top for spacing */}
            <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 ">
                <div className="flex max-w-5xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
                    
                    {/* Left Side - Image */}
                    <div className="hidden md:block w-1/2">
                        <img 
                            src="https://img.freepik.com/free-vector/businessman-businesswoman-with-laptop_24877-56022.jpg?t=st=1739798929~exp=1739802529~hmac=87d8079a42976edb638423eaf1c9aa60a58a5e59073c55eb6b443aca6246e485&w=740"
                            alt="Signup Illustration"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Right Side - Signup Form */}
                    <div className="w-full md:w-1/2 p-10">
                        <h1 className="font-bold text-3xl text-center mb-2 text-gray-800">Create an Account</h1>
                        <p className="text-gray-600 text-center mb-6 text-lg">Sign up to get started</p>

                        <form onSubmit={submitHandler}>
                            <div className="mb-4">
                                <Label>Full Name</Label>
                                <Input type="text" value={input.fullname} name="fullname" onChange={changeEventHandler} placeholder="John Doe" />
                            </div>

                            <div className="mb-4">
                                <Label>Email</Label>
                                <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="john.doe@gmail.com" />
                            </div>

                            <div className="mb-4">
                                <Label>Phone Number</Label>
                                <Input type="text" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} placeholder="1234567890" />
                            </div>

                            <div className="mb-4">
                                <Label>Password</Label>
                                <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="Enter your password" />
                            </div>

                            {/* Role Selection & Profile Upload in Same Line */}
                            <div className="flex items-center justify-between mb-5">
                                {/* Role Selection */}
                                <div className="w-1/2 pr-4">
                                    <Label>Select Your Role</Label>
                                    <div className="flex items-center gap-6 mt-2">
                                        <label className="flex items-center space-x-3">
                                            <input type="radio" name="role" value="student" checked={input.role === 'student'} onChange={changeEventHandler} /> 
                                            <span>Student</span>
                                        </label>
                                        <label className="flex items-center space-x-3">
                                            <input type="radio" name="role" value="recruiter" checked={input.role === 'recruiter'} onChange={changeEventHandler} /> 
                                            <span>Recruiter</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Profile Upload */}
                                <div className="w-1/2">
                                    <Label>Profile Picture</Label>
                                    <Input accept="image/*" type="file" onChange={changeFileHandler} className="cursor-pointer" />
                                </div>
                            </div>

                            <div className="mt-6">
                                {loading ? (
                                    <Button className="w-full bg-black text-white py-2 rounded-lg flex items-center justify-center">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-2 rounded-lg transition">
                                        Sign Up
                                    </Button>
                                )}
                            </div>

                            <p className="text-center text-gray-600 mt-4 text-sm">
                                Already have an account? <Link to="/login" className="text-blue-600 hover:underline ml-1">Log in</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
