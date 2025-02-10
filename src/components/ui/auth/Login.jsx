import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../label';
import { Input } from '../input';
import { RadioGroup,  } from '../radio-group';
import { Button } from '../button';
import { Link } from 'react-router-dom';


export const Login = () => {

  const [input,setInput]= useState({
      email:"",
      password:"",
      role:"",
    });

    const chageEventHandler = (e) => {
      setInput({ ...input, [e.target.name]: e.target.value });
    }
  const submitHandler = async (e) => {
      e.preventDefault();
      console.log(input);
    }  

  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Login</h1>
          <div className='my-2'>
            <Label>Email</Label>
            <Input
               type="email"
               value={input.email}
               name="email"
               onChange= {chageEventHandler}
               placeholder="saru@gmail.com"
            />
          </div>
        
          <div className='my-2'>
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange= {chageEventHandler}
              placeholder="********"
            />
          </div>
          <div className='flex items-center justify-between '>
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
               <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role='recruiter'}
               onChange={chageEventHandler}
                className="cursor-pointer"
               />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
              <Input
               type="radio"
               name="role"
               value="recruiter"
               checked={input.role = 'recruiter'}
               onChange={chageEventHandler}
               className="cursor-pointer"
               />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
         
          </div>
          <Button type="submit" className="w-full my-4">Login</Button>
          <span className='text-sm'>Don't have an account?<Link to="/signup" className='text-blue-600'>Signup</Link></span>


        </form>
      </div>

    </div>
  );
};


