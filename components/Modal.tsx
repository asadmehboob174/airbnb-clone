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

interface ModalProps {
  children: React.ReactNode,
  className?: string,
  open : boolean,
  setOpen : React.Dispatch<React.SetStateAction<boolean>>,
}
 
const Modal = ({children, className, open , setOpen} : ModalProps) => {
   const userDialogOpen = useModal()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={cn('sm:max-w-[425px]', className)}>
           {children}
      </DialogContent>
    </Dialog>
  )
}

export default Modal;