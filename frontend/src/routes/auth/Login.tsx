import Logo from "@/components/logo";
import { LoginSchema, LoginTypeSchema } from "@/schema/authentication";
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
import { CardContent, CardHeader } from "@/components/ui/card";
import CardWrapper from "@/components/container-wrapper";
import apiRequest from "@/lib/apiService";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { AuthContext } from "@/context/AuthContextProvider";
import { Loader2 } from "lucide-react";

function Login() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginTypeSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const { updateUser } = authContext;

  const onSubmit = async (values: LoginTypeSchema) => {
    try {
      const res = await apiRequest.post("/auth/login", values);
      setIsLoading(true);
      setError("");
      console.log(res.data.user);

      updateUser(res.data)
      navigate("/")
    } catch (err: any) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <CardWrapper
        backButtonLabel="Dont have an account?"
        backButtonHref="/register"
      >
       
       <CardHeader>
          <div className="text-3xl font-bold pt-6 flex  flex-col items-start mb-4">
            <span className="flex gap-2 flex-wrap w-full justify-center items-center">
              Welcome Back to{" "}
              <span>
                <Logo />
              </span>
            </span>
            <span className="text-[1rem] mt-2 font-light text-gray-700 justify-center flex w-full">
              Please Login your Account
            </span>
          </div>
        </CardHeader>


        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="gap-10 flex flex-col"
            >
              <FormField
                control={form.control}
                name={"username"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-1xl">Username</FormLabel>
                    <FormControl>
                      <Input
                        className="py-6"
                        defaultValue={""}
                        {...field}
                        placeholder="john@example.com"
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
                <div className=" bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
                  <FaExclamationTriangle className="h-4 w-4" />
                  <p>{error}</p>
                </div>
              )}

              <Button
                
                className="w-full py-7 text-1xl"
                type="submit"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="animate-spin" />}
                {isLoading ? "Loggin in.." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </CardWrapper>
    </div>
  );
}

export default Login;
