import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'

const Search = () => {
  return (
    <div className='border-[1px] w-full md:w-auto rounded-full shadow-sm hover:shadow-md py-[6px] cursor-pointer transition'>
      <div className='flex items-center justify-between'>
       <div className='text-sm font-semibold px-6'>Anywhere</div>
       <div className='text-sm font-semibold flex-1 border-x-[1px] px-6 hidden sm:block'>Any week</div>
       <div className='flex items-center text-sm text-gray-600 gap-3 pl-6 pr-2'>
          <div className='hidden sm:block'>Add Guests</div>
          <div className='bg-rose-500 rounded-full text-white p-2'>
            <IoSearchOutline size={18} className='' />
          </div>
       </div>
    </div>
    </div>
  )
}

export default Search