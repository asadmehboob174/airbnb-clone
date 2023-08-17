'use client';

import Image from 'next/image';
import React from 'react'

const Avatar = () => {
  return (
    <Image 
      alt='avatar'
      className='cursor-pointer rounded-full'
      width={30}
      height={30}
      src='/images/placeholder.jpg'

    />
  )
}

export default Avatar