import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod";
import {FcGoogle} from 'react-icons/fc' 
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Heading from "./ui/Heading"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"


interface UserRegisterFormProps {
  // closeDialog : () => void
}

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().min(7, {
    message: "email must be at least 7 characters.",
  }),
  password: z.string().min(8, {
    message: "password must be 8 charecter long",
  }),
})

const UserRegisterForm: FC<UserRegisterFormProps> = ({}) => {

const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

 const  onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

   return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader className="">
              <DialogTitle className="text-center">Register</DialogTitle>
            </DialogHeader>
            <div className="py-1">
                  <hr className="" />
                </div>
              <Heading className=" text-xl font-bold">Welcome to Airbnb</Heading>
              <p className="text-sm font-normal !mt-1 text-gray-500">Create an account!</p>
              <div className="grid grid-cols-1 items-center gap-3">
                <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                
              )}
            />
              </div>
            <footer className="grid grid-cols-1 items-center gap-2 !mt-8">
               <Button variant={"default"} className="border-red-800 bg-red-500 hover:bg-red-600" type="submit">Submit</Button>
                <div className="py-2">
                  <hr className="" />
                </div>
               <Button variant={"outline"} className="border-gray-800" type="button">
                 <FcGoogle />
                 Continue with Google
               </Button>
               <Button variant={"outline"} className="border-gray-800" type="button">Continue with Github</Button>
            </footer>
          </form>
        </Form>
      
   )
    
}

export default UserRegisterForm