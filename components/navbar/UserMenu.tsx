'use client'

import { FC, useRef, useState } from 'react'
import { HiOutlineMenu } from 'react-icons/hi'
import Avatar from '../Avatar';
import {DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import RegisterForm from '../RegisterForm';
import React from 'react';
import Modal from '../Modal';
import LoginForm from '../LoginForm';

interface UserMenuProps {
  
}

const footer = () => {
  return (
    <Button type="submit">Save changes</Button>
  )
}

const UserMenu: FC<UserMenuProps> = ({}) => {

  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const openRegisterForm = () => {
    setOpen(true);
  }

  const openLoginForm = () => {
    setOpenLogin(true);
  }

  return <div className=''>
    <div className='flex items-center justify-between gap-3 max-md:gap-0'>
      <div className='hidden md:block px-3 py-[10px] hover:bg-zinc-100 text-sm font-semibold cursor-pointer rounded-full hover:shadow-sm transition'>Airbnb your home</div>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <div className='border-[1px] p-4 md:px-2 md:py-[4px] shadow-sm hover:shadow-md rounded-full cursor-pointer'>
            <div className='flex items-center gap-3'>
              <div>
                <HiOutlineMenu size={18} className=''  />
              </div>
              <div className='hidden md:block'>
                <Avatar />
                {/* <UserPopover /> */}
              </div>
          </div>
        </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 absolute -right-5 md:-right-10 cursor-pointer p-0">
            <DropdownMenuLabel className='hover:bg-zinc-100 py-3 px-4 text-sm font-semibold' onClick={openLoginForm}>Login</DropdownMenuLabel>
            <DropdownMenuLabel className='hover:bg-zinc-100 py-3 px-4 text-sm font-semibold' onClick={openRegisterForm}>
                Sign Up
            </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
      
    </div>
  
    <Modal open={open} setOpen={setOpen}>
      <RegisterForm />
    </Modal>

    <Modal open={openLogin} setOpen={setOpenLogin}>
      <LoginForm />
    </Modal>
  </div>
}

export default UserMenu