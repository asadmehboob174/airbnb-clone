import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { RegisterRequest, RegisterValidator } from "@/lib/validators/register";
import { toast } from "./ui/use-toast";
import { Form,FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { FC } from "react";
import { ToastAction } from "./ui/toast";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Heading from "./ui/Heading";

interface RegisterFormProps {
}


const RegisterForm: FC<RegisterFormProps> = ({}) => {
  const form = useForm<RegisterRequest>({
    resolver: zodResolver(RegisterValidator),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { mutate: registerUser, isLoading, isSuccess } = useMutation({
    mutationFn: async (values: RegisterRequest) => {
      const { data } = await axios.post('/api/register', values);
      return data as string;
    },
    onSuccess : (data) => {
          toast({
              title : 'User created',
              variant: "default"
           })
    },
    onError : (error) => {
      if(error instanceof AxiosError) {
         if(error.response?.status === 409) {
           return toast({
              title : 'username or email already exists',
              description : 'Please choose a different username or email',
              variant : 'destructive'
           })
         }
         if(error.response?.status === 422) {
           return toast({
              title : 'Invalid username',
              variant : 'destructive'
           })
         }
         if(error.response?.status === 401) {
           return (
            toast({
              title: "Scheduled: Catch up ",
              description: "Friday, February 10, 2023 at 5:57 PM",
              action: (
                <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
              ),
        })
           )
         }
         return toast({
              title : 'Error Ocurred',
              description : 'Please try again',
              variant : 'destructive'
           })
      }
    }
  });

  const onSubmit = (values: RegisterRequest) => {
    registerUser(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* ... rest of the form ... */}

        <h3 className="text-center font-semibold text-base">Register</h3>
            <div className="py-1">
                  <hr className="" />
                </div>
              <Heading className=" text-xl font-bold">Welcome back</Heading>
              <p className="text-sm font-normal !mt-1 text-gray-500">Register an account!</p>
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
                {/* {error && <p>{error.message}</p>} */}
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} />
                {/* {error && <p>{error.message}</p>} */}
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
                {/* {error && <p>{error.message}</p>} */}
              </FormControl>
            </FormItem>
          )}
        />

        <footer className="grid grid-cols-1 items-center gap-2 !mt-8">
               <Button variant={"default"} className="border-red-800 bg-red-500 hover:bg-red-600" type="submit">Submit</Button>
                <div className="py-2">
                  <hr className="" />
                </div>
               <Button variant={"outline"} className="border-gray-800 flex items-center justify-start gap-[85px]" type="button">
                 <FcGoogle size={18} />
                 <span className="">Continue with Google</span>
               </Button>
               <Button variant={"outline"} className="border-gray-800 flex items-center justify-start gap-[85px]" type="button">
                 <FaGithub size={18}  />
                 <span className="">Continue with Github</span>
               </Button>
            </footer>
      </form>
    </Form>
  );
};

export default RegisterForm;
