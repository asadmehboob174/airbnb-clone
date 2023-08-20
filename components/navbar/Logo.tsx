import React from 'react';
import  Image from 'next/image';

const Logo = () => {
  return (
    <Image
     className='hidden md:block cursor-pointer h-[30px]'
     src='/images/logo.png'
     alt='airbnb logo'
     width={100}
     height={100}
    />
  )
}

export default Logo