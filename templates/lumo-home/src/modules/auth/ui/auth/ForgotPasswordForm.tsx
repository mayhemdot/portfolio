"use client";
// import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";
import { useActionState, useState } from "react";
import { toast } from "react-hot-toast";
import { InputField } from "@/shared/components/InputField";
import { Button } from "@/shared/components/ui/button";
// import { useForm } from "react-hook-form";
// import { Form } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { appAuthClient } from "@/shared/lib/auth";
import { forgotPasswordWithPlugin } from "../../actions/forgotPasswordAction";

// import {
//   type ForgotPasswordActionSchema,
//   type ForgotPasswordActionZodFieldErrors,
//   forgotPasswordSchema,
// } from "../../model/schemas";

type ForgotPasswordResponse = {
  success: boolean;
  errors?: any;
};

export function ForgotPasswordForm() {
  const [state, forgotPasswordHandler, isLoading] = useActionState<
    ForgotPasswordResponse,
    any
  >(forgotPasswordWithPlugin, {
    errors: undefined,
    success: false,
  });

  return (
    <form action={forgotPasswordHandler} className="w-full">
      <Input
        name="email"
        type="email"
        placeholder="Enter your email"
        autoComplete="email"
        className="mb-4"
        disabled={isLoading}
      />
      {state.errors?.email && (
        <p className="text-red-600 py-4 max-w-full">
          {state.errors.email.toString()}
        </p>
      )}
      <Button type="submit" className="mt-4 w-full">
        Forgot Password
      </Button>
      {state.errors?.root && (
        <p className="text-red-600 py-4">{state.errors.root.toString()}</p>
      )}
    </form>
  );
}

export function ForgotPasswordFormClient() {
  const [_, setStatus] = useQueryState("status", parseAsString.withDefault(""));

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>();
  const handleForgotPassword = async (value: any) => {
    // const res = await appAuthClient.forgotPassword({
    //   email: value.email,
    // });

    // if (res.isError) {
    //   toast.error(res.message);
    // } else {
    //   toast.success("Password reset email sent! Please check your inbox.");
    //   // form.reset();
    //   router.push("/forgot-password/confirm");
    // }
  };

  return (
    <form onSubmit={handleForgotPassword}>
      <InputField
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        autoComplete="email"
        className="mb-4"
        disabled={isLoading}
      />

      <Button type="submit" disabled={isLoading} className="mt-4 w-full">
        Send Reset Email
      </Button>

      {errors?.root && (
        <p className="text-red-600 py-4">{errors.root.toString()}</p>
      )}
    </form>
  );
}
