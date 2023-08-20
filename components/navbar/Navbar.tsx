import { FC } from 'react'
import Logo from './Logo'
import Container from '../Container'
import Search from './Search'
import UserMenu from './UserMenu'

interface NavbarProps {
  
}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <div className='fixed w-full py-[15px] shadow-sm dark:bg-gray-800 border-b-[1px] border-gray-200'>
       <Container>
          <div className='flex items-center justify-between gap-3 md:gap-0'>
              <Logo />
              <Search />
              <UserMenu />
          </div>
       </Container>
    </div>
  )
}

export default Navbar