"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Response } from "@/types";
import { useAppDispatch } from "@/lib/hooks";
import { setToken } from "@/lib/slices/userSlice";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z.string().min(2, {
    message: "Invalid password",
  }),
});

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, [router]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios<Response>({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
        data: values,
        headers: { "Content-Type": "application/json" },
      });

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        localStorage.setItem("token", response?.data?.data?.token);
        dispatch(setToken(response?.data?.data?.token));
        router.push("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("User cannot be registered.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.email?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.password?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-slate-700 hover:bg-slate-600"
            >
              Login
            </Button>
            <div className="text-center">
              <Link href="/auth/register" className="hover:underline">
                Don{`'`}t have an account? Register
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
