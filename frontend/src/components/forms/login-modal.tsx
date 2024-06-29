import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { ReactNode, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../logo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginTypeSchema } from "@/schema/authentication";
import apiRequest from "@/lib/apiService";
import { AuthContext } from "@/context/AuthContextProvider";
import { FaExclamationTriangle } from "react-icons/fa";
import { Loader2 } from "lucide-react";

function LoginModal({ trigger }: { trigger: ReactNode }) {
  const [open, setOpen] = useState(false);
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

      updateUser(res.data);
      navigate("/");
      setOpen(false);  
    } catch (err: any) {
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="pt-8">
          <Logo />
        </DialogHeader>
        <Card className="p-8 pb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name={"username"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel >Username</FormLabel>
                      <FormControl>
                        <Input
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
                      <FormLabel >Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="********"
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
                  <div className="bg-destructive/15 p-3 my-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
                    <FaExclamationTriangle className="h-4 w-4" />
                    <p>{error}</p>
                  </div>
                )}

                <Button
                  className="w-full py-6 text-1xl mt-4"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="animate-spin" />}
                  {isLoading ? "Logging in.." : "Login"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="self-start">
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="underline" onClick={() => setOpen(false)}>
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
