import React from 'react'
import  Image from 'next/image';

const Avatar = () => {
  return (
    <Image
     className='hidden md:block cursor-pointer h-[30px] rounded-full'
     src='/images/placeholder.jpg'
     alt='airbnb logo'
     width={30}
     height={30}
    />
  )
}

export default Avatar