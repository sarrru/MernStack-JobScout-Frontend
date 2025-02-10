import React from 'react'
import { Button } from './button'
import { Search } from 'lucide-react'

export const HeroSection = () => {
  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
        <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#f83002] font-medium'>The Best Place to Find Jobs</span>
        <h1 className='text-5xl font-bold'>Smart tools for<br/> Smarter <span className='text-[#6A38C2]'>career decisions</span></h1>
        <p>JobScout a place where talent and opportunity come together, making job searches and hiring easier for everyone.</p>
        <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
            <input
            type="text"
            placeholder='Find your dream jobs'
            className='Outline-none border-none w-full'

            />
            < Button  className='bg-[#6A38C2] px-4 py-2 rounded-md flex items-center justify-center'>
                <Search className='h-5 w-5'/>
            </Button>
        </div>

        </div>
        
    </div>
  )
}
