import { cn } from '@/lib/utils'
import { FC } from 'react'

interface HeadingProps {
  children: string
  className?: string
}

const Heading: FC<HeadingProps> = ({children, className}) => {
  return (
    <div className={cn('text-lg font-semibold leading-none tracking-tight ', className)}>
      {children}
    </div>
  )
}

export default Heading