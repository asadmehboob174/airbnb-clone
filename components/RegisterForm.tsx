import { zodResolver } from "@hookform/resolvers/zod"
import { Form, useForm } from "react-hook-form"
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { RegisterRequest, RegisterValidator } from "@/lib/validators/register";
import { toast } from "./ui/use-toast";
import { FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { FC } from "react";
import { ToastAction } from "./ui/toast";

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

        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
                {error && <p>{error.message}</p>}
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
                {error && <p>{error.message}</p>}
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
                {error && <p>{error.message}</p>}
              </FormControl>
            </FormItem>
          )}
        />

        {/* ... rest of the form ... */}
      </form>
    </Form>
  );
};

export default RegisterForm;
