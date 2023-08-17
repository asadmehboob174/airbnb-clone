'use client';

import {AiOutlineMenu} from 'react-icons/ai'

import React, { useCallback } from 'react'
import Avatar from '../Avatar';
import MenuItem from './MenuItem';

const UserMenu = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((value) => !value);
   }, [isOpen])

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
          <div onClick={() => {}} className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
            Airbnb your home
          </div>
          <div onClick={toggleMenu} className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 rounded-full flex items-center gap-3 cursor-pointer hover:shadow-md transition'>
             <AiOutlineMenu />
             <div className='hidden md:block'>
                <Avatar />
             </div>
          </div>
      </div>

      {isOpen ? (
        <div className='absolute right-0 top-12 rounded-lg border-[1px] border-zinc-200 shadow-md z-[100] w-[40vw] md:w-3/4 bg-white overflow-hidden text-sm'>
            <div className='flex flex-col cursor-pointer'>
              <>
                 <MenuItem label='Login' onClick={() => {}} />
                 <MenuItem label='Sign Up' onClick={() => {}} />
              </>
            </div>
        </div>
      ) : null}
    </div>
  )
}

export default UserMenu