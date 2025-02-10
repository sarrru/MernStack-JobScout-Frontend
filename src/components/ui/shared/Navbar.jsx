import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import { Avatar, AvatarImage } from '../avatar'
import { Button } from '../button'
import { LogOut, User, User2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const user = false;
  return (
    <div className='bg-white'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
        <div className='ml-8'>
          <h1 className='text-2xl font-bold'>job<span className='text-[#800080]'>Scout</span></h1>
        </div>
        <div className='flex item-center gap-12'>
          <ul className='flex font-medium items-center gap-5'>
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>
          {
            !user ? (
              <div className='flex items-center gap-2'>
                <Link to="/login"><Button variant="outline">Login</Button></Link>
                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w=80">
                  <div className=''>
                    <div className='flex gap-2 space y-2'>
                      <Avatar className="cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                      </Avatar>
                      <div>
                        <h4 className='font-medium'>Saru MernStack</h4>
                        <p className='text-sm text-muted-foreground'>looool</p>
                      </div>
                    </div>

                    <div className='flex flex-col my-2 text-gray-600 '>
                      <div className='flex w-fit items-center gap-2 cursor pointer'>
                        <User2 />
                        <Button variant="link"> View profile</Button>
                      </div>
                      <div className='flex w-fit items-center gap-2 cursor pointer'>
                        <LogOut />
                        <Button variant="link">Log out</Button>
                      </div>
                    </div>
                  </div>

                </PopoverContent>
              </Popover>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar
