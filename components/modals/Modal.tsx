'use client'

import { FC, useCallback, useEffect, useState } from 'react';
import { IoMdClose} from 'react-icons/io';
import Button from '../Button';
import { FcGoogle} from 'react-icons/fc';

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  title? : string
  body? : React.ReactElement
  actionLabel : string
  disabled? : boolean
  secondaryAction? : () => void
  secondaryLabel? : string
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryLabel
}) => {
   const [showModal, setShowModal] = useState<boolean>(isOpen)
  
   useEffect(() => {
      setShowModal(isOpen);
   }, [isOpen]) 

   const handleClose = useCallback(() => {
    if(disabled) return;

    setShowModal(false)
    setTimeout(() => {
       onClose()
    }, 300);
   
   }, [disabled, onClose])

   const handleSubmit = useCallback(() => {
     if(disabled) return;

     setTimeout(() => {
       onSubmit()
     }, 300);
   }, [disabled, onSubmit])

   const handleSecondaryAction = useCallback(() => {
     if(disabled || !secondaryAction) return;

     setTimeout(() => {
       secondaryAction()
     }, 300);
   }, [disabled, secondaryAction])
   

   if(!isOpen) {
    return null;
   }

  return (
    <>
      <div className='flex justify-center items-center overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70'>
          <div className='relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg-h-auto md:h-auto '>
            {/* content */}
            <div className={`translate dura tion-300 h-full ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
               <div className='translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                  {/* Header */}
                   <div className='flex items-center justify-center p-6 rounded-t relative border-b-[1px]'>
                      <button onClick={handleClose} className='p-1 border-0 hover:opacity-70 transition absolute left-5'>
                          <IoMdClose size={18} />
                      </button>
                      <div className='text-lg font-semibold'>
                          {title}
                      </div>
                   </div>
                   {/* Body */}
                   <div className='relative p-6 flex-auto'>
                      {body}
                   </div>
                   {/* Footer */}
                   <div className='flex flex-col gap-2 p-6'>
                      <div className='flex flex-row items-center gap-4 w-full'>
                         {
                          secondaryAction && secondaryLabel &&
                          <Button outline disabled={disabled} onClick={handleSecondaryAction} label={secondaryLabel} />
                         }
                         <Button disabled={disabled} onClick={handleSubmit} icon={FcGoogle} label={actionLabel} />
                      </div>
                   </div>
               </div>
            </div>
          </div>
      </div>
      
    </>
  )
}

export default Modal