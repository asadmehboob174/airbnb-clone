import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Label } from "./ui/label"
import { useRef } from "react"
import { X } from "lucide-react";
import React from "react";
import useModal from "@/hooks/useModal";
import UserRegisterForm from "./UserRegisterForm";

interface ModalProps {
  className?: string,
  open : boolean,
  setOpen : React.Dispatch<React.SetStateAction<boolean>>,
}
 
const Modal = ({className, open , setOpen} : ModalProps) => {

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={cn('max-w-[425px]', className)}>
           <UserRegisterForm />
      </DialogContent>
    </Dialog>
  )
}

export default Modal;