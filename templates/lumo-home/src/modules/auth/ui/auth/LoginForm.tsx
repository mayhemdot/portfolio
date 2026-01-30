"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { toast } from "react-hot-toast";
import { loginUserWithPlugin } from "@/modules/auth/actions/loginAction";
import { InputField } from "@/shared/components/InputField";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { sleep } from "@/shared/utils/timeout";
import { GoogleLoginButton } from "../better-auth/GoogleLoginButton";

type LoginFormProps = {
  data?: any;
  errors?: any;
  success: boolean;
};

// export function LoginForm() {
//   const [state, loginAction, isLoading] = useActionState<LoginFormProps, any>(
//     loginUserWithPlugin,
//     {
//       data: undefined,
//       errors: undefined,
//       success: false,
//     },
//   );

//   return (
//     <form action={loginAction}>
//       <Input
//         name="email"
//         type="email"
//         placeholder="Email"
//         autoComplete="email"
//         className="mb-4"
//         disabled={isLoading}
//       />
//       {state.errors?.email && (
//         <p className="text-red-600 py-4">{state.errors.email.toString()}</p>
//       )}
//       <Input
//         name="password"
//         type="password"
//         placeholder="Password"
//         autoComplete="current-password"
//         disabled={isLoading}
//       />
//       {state.errors?.password && (
//         <p className="text-red-600 py-4">{state.errors.password.toString()}</p>
//       )}

//       <Button type="submit" disabled={isLoading} className="mt-4 w-full">
//         Login
//       </Button>

//       <GoogleLoginButton />

//       {state.errors?.root && (
//         <p className="text-red-600 py-4">{state.errors.root.toString()}</p>
//       )}
//     </form>
//   );
// }

export function LoginFormClient() {
  const router = useRouter();
  const [errors, setErrors] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSignin = async (e:any) => {
    toast.success("You are logged in!");
    e.preventDefault();
    setErrors({});

    if (!password) {
      setErrors({ root: "Passwords do not match" });
      return;
    }
    if(!email) {
      setErrors({ root: "Email is required" });
      return;
    }

    setIsLoading(true);

    await sleep(2000);

    setErrors({});
    toast.success("Account created successfully!");
    
    setIsLoading(false);
    router.push("/login");
  };

  return (
    <form onSubmit={handleSignin} className="space-y-4">
      <InputField<any>
        label={"Email"}
        type="text"
        name="email"
        placeholder="Email"
        autoComplete="email"
        disabled={isLoading}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div>
        <div className="flex items-center grow w-full">
          <Link
            href="/forgot-password"
            className={buttonVariants({
              variant: "link",
              className: "ml-auto",
            })}
          >
            Forgot your password?
          </Link>
        </div>
        <InputField<any>
          label="Password"
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          disabled={isLoading}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        Log in
      </Button>

      {errors?.root?.message && (
        <p className="text-red-600 py-4">{errors.root.message}</p>
      )}
    </form>
  );
}
