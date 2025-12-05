"use client";

import { Input } from "@heroui/input";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type React from "react";
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FormError } from "@/modules/common/components/Form/FormError";
import { FormItem } from "@/modules/common/components/Form/FormItem";
import { Message } from "@/modules/common/components/Message";
import { Button } from "@/shared/components/ui/Button";
import { retrieveCustomer } from "../actions/retriveCustomer";

type FormData = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export function CreateAccountForm() {
  const searchParams = useSearchParams();
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : "";
  const user = retrieveCustomer();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<FormData>();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = useCallback(
    async (data: FormData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (!response.ok) {
        const message = response.statusText || "There was an error creating the account.";
        setError(message);
        return;
      }

      const redirect = searchParams.get("redirect");

      const timer = setTimeout(() => {
        setLoading(true);
      }, 1000);

      try {
        // await login(data);
        clearTimeout(timer);
        if (redirect) router.push(redirect);
        else router.push(`/account?success=${encodeURIComponent("Account created successfully")}`);
      } catch (_) {
        clearTimeout(timer);
        setError("There was an error with the credentials provided. Please try again.");
      }
    },
    [router, searchParams],
  );

  return (
    <form className="max-w-lg py-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="prose dark:prose-invert mb-6">
        <p>
          {`This is where new customers can signup and create a new account. To manage all users, `}
          <Link href="/admin/collections/users" className="hover:underline cursor-pointer text-primary/80">
            login to the admin dashboard
          </Link>
          .
        </p>
      </div>

      <Message error={error} />

      <div className="flex flex-col gap-8 mb-8">
        <FormItem>
          <Input
            label="Email Address"
            id="email"
            {...register("email", { required: "Email is required." })}
            type="email"
          />
          {errors.email && <FormError message={errors.email.message} />}
        </FormItem>
        <FormItem>
          <Input
            label="New password"
            id="password"
            {...register("password", { required: "Password is required." })}
            type="password"
          />
          {errors.password && <FormError message={errors.password.message} />}
        </FormItem>
        <FormItem>
          <Input
            label="Confirm Password"
            id="passwordConfirm"
            {...register("passwordConfirm", {
              required: "Please confirm your password.",
              validate: (value) => value === password.current || "The passwords do not match",
            })}
            type="password"
          />
          {errors.passwordConfirm && <FormError message={errors.passwordConfirm.message} />}
        </FormItem>
      </div>
      <Button disabled={loading} type="submit">
        {loading ? "Processing" : "Create Account"}
      </Button>

      <div className="prose dark:prose-invert mt-8">
        <p>
          {"Already have an account? "}
          <Link href={`/login${allParams}`} className="hover:underline cursor-pointer text-primary/80">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}
