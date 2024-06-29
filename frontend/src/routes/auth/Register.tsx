import Logo from "@/components/logo";
import { RegisterSchema, RegisterTypeSchema } from "@/schema/authentication";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ContainerWrapper from "@/components/container-wrapper";
import { CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import apiRequest from "@/lib/apiService";
import { useNavigate } from "react-router-dom";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const form = useForm<RegisterTypeSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      contactNumber: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterTypeSchema) => {
    try {
      setIsLoading(true);
      setError("");
      const res = await apiRequest.post("/auth/register", values);
      console.log(res.data);
      navigate("/login");
    } catch (err: any) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <ContainerWrapper
        backButtonLabel="Already have an account?"
        backButtonHref="/login"
        showSocial
      >
         <CardHeader>
          <div className="text-3xl font-bold pt-6 flex  flex-col items-start mb-4">
            <span className="flex gap-2 flex-wrap w-full justify-center items-center">
              Welcome to{" "}
              <span>
                <Logo />
              </span>
            </span>
            <span className="text-[1rem] mt-2 font-light text-gray-700 justify-center flex w-full">
              Please Register New Account
            </span>
          </div>
        </CardHeader>

        <CardContent >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name={"username"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-1xl">Name</FormLabel>
                    <FormControl>
                      <Input
                        className="py-6"
                        defaultValue={""}
                        {...field}
                        placeholder="John45"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"email"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-1xl">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="py-6"
                        defaultValue={""}
                        {...field}
                        placeholder="John45@gmail.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"contactNumber"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-1xl">Contact Number</FormLabel>
                    <FormControl>
                      <Input
                        className="py-6"
                        defaultValue={""}
                        {...field}
                        placeholder="09687252806"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={"password"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-1xl">Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        className="py-6"
                        type="password"
                        defaultValue={""}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <div className=" bg-destructive/15 p-3 mt-4 rounded-md flex items-center gap-x-2 text-sm text-destructive">
                  <FaExclamationTriangle className="h-4 w-4" />
                  <p>{error}</p>
                </div>
              )}

              <Button
                className="w-full py-7 text-1xl mt-6"
                type="submit"
                disabled={isLoading}
              >
                  {
                isLoading
                 ? "Signin in..."
                  : "Login"
 
               }
              </Button>
            </form>
          </Form>
        </CardContent>
      </ContainerWrapper>
    </div>
  );
}

export default Register;
