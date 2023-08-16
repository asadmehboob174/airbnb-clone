import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <Image
      className='hidden md:block cursor-pointer'
      alt="logo"
      width={100}
      height={100}
      src="/images/logo.png"
    />
  )
}

export default Logo