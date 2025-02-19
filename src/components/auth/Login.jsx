// import React, { useEffect, useState } from 'react';
// import Navbar from '../shared/Navbar';
// import { Label } from '../ui/label';
// import { Input } from '../ui/input';
// import { RadioGroup } from '../ui/radio-group';
// import { Button } from '../ui/button';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { USER_API_END_POINT } from '@/utils/constant';
// import { toast } from 'sonner';
// import { useDispatch, useSelector } from 'react-redux';
// import { setLoading, setUser } from '@/redux/authSlice';
// import { Loader2 } from 'lucide-react';

// const Login = () => {
//     const [input, setInput] = useState({
//         email: "",
//         password: "",
//         role: "",
//     });
//     const { loading, user } = useSelector(store => store.auth);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const changeEventHandler = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value });
//     };

//     const submitHandler = async (e) => {
//         e.preventDefault();

//         if (!input.role) {
//             toast.error("Please select a role.");
//             return;
//         }

//         try {
//             dispatch(setLoading(true));

//             const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
//                 headers: { "Content-Type": "application/json" },
//                 withCredentials: true,
//             });

//             if (res.data.success) {
//                 dispatch(setUser(res.data.user));
//                 navigate("/");
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             console.error("Login Error:", error);
//             toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
//         } finally {
//             dispatch(setLoading(false));
//         }
//     };

//     useEffect(() => {
//         if (user) {
//             navigate("/");
//         }
//     }, [user, navigate]);

//     return (
//         <div>
//             <Navbar />
//             <div className='flex items-center justify-center max-w-7xl mx-auto'>
//                 <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
//                     <h1 className='font-bold text-xl mb-5'>Login</h1>
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
//                                 <Label>Student</Label>
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
//                                 <Label>Recruiter</Label>
//                             </div>
//                         </RadioGroup>
//                     </div>
//                     {
//                         loading ? (
//                             <Button className="w-full my-4"> 
//                                 <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait 
//                             </Button>
//                         ) : ( 
//                             <Button type="submit" className="w-full my-4">Login</Button>
//                         )
//                     }
//                     <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;

import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { USER_API_END_POINT } from '@/utils/constant';

const Login = () => {
    const [input, setInput] = useState({ email: "", password: "", role: "" });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            navigate("/"); // Redirect to home page
        }
    }, [user, navigate]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.role) {
            toast.error("Please select a role.");
            return;
        }

        try {
            dispatch(setLoading(true));

            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            if (res.data.success) {
                localStorage.setItem("token", res.data.token); // Store token
                dispatch(setUser(res.data.user));
                navigate("/"); // Redirect to home page after login
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
                <div className="flex max-w-5xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
                    
                    {/* Left Side - Image */}
                    <div className="hidden md:block w-1/2">
                        <img 
                            src="https://img.freepik.com/free-vector/flat-design-busy-office-illustration_23-2151093404.jpg?uid=R153774001&ga=GA1.1.631286253.1736426643&semt=ais_hybrid"
                            alt="Login Illustration"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="w-full md:w-1/2 p-10">
                        {/* Title */}
                        <h1 className="font-bold text-3xl text-center mb-2 text-gray-800">Welcome Back</h1>
                        <p className="text-gray-600 text-center mb-6 text-lg">Log in to continue</p>  {/* Added this line */}

                        <form onSubmit={submitHandler}>
                            <div className="mb-4">
                                <Label>Email</Label>
                                <Input 
                                    type="email" 
                                    value={input.email} 
                                    name="email" 
                                    onChange={changeEventHandler} 
                                    placeholder="saru@gmail.com"
                                />
                            </div>

                            <div className="mb-4">
                                <Label>Password</Label>
                                <Input 
                                    type="password" 
                                    value={input.password} 
                                    name="password" 
                                    onChange={changeEventHandler} 
                                    placeholder="Enter your password"
                                />
                            </div>

                            {/* Role Selection */}
                            <div className="mb-5">
                                <Label>Select Your Role</Label>
                                <div className="flex items-center gap-6 mt-2">
                                    <label className="flex items-center space-x-3">
                                        <input 
                                            type="radio" 
                                            name="role" 
                                            value="student" 
                                            checked={input.role === 'student'} 
                                            onChange={changeEventHandler}
                                        /> 
                                        <span>Student</span>
                                    </label>
                                    <label className="flex items-center space-x-3">
                                        <input 
                                            type="radio" 
                                            name="role" 
                                            value="recruiter" 
                                            checked={input.role === 'recruiter'} 
                                            onChange={changeEventHandler}
                                        /> 
                                        <span>Recruiter</span>
                                    </label>
                                </div>
                            </div>

                            <div className="mt-6">
                                {loading ? (
                                    <Button className="w-full bg-black text-white py-2 rounded-lg flex items-center justify-center">
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-2 rounded-lg transition">
                                        Login
                                    </Button>
                                )}
                            </div>

                            <p className="text-center text-gray-600 mt-4 text-sm">
                                Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline ml-1">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
