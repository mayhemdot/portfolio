"use client";

import { Input } from "@heroui/input";
import { addToast } from "@heroui/react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React, { Fragment, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { FormError } from "@/modules/common/components/Form/FormError";
import { FormItem } from "@/modules/common/components/Form/FormItem";
import { Message } from "@/modules/common/components/Message";
import { Text } from "@/shared/components/Text";
import { Button, btnVariants } from "@/shared/components/ui/Button";
import { ROUTES } from "@/shared/utils/routes";

type FormData = {
  email: string;
};

export function ForgotPasswordForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const t = useTranslations();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormData>();

  const onSubmit = useCallback(async (data: FormData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (response.ok) {
      setSuccess(true);
      setError("");
    } else {
      setError("There was a problem while attempting to send you a password reset email. Please try again.");
    }
  }, []);

  return (
    <Fragment>
      {!success && (
        <React.Fragment>
          <div className="flex flex-col grow">
            <Text comp="h1" size="md" variant="gradient" className="mb-4">
              {/* Forgot Password */}
              {t("forgotPassword.title")}
            </Text>
            <Text comp="p" size="xxs" variant="secondary" className="mb-2 font-extralight">
              {t("forgotPassword.description")}
              {/* {`Please enter your email below. You will receive an email message with instructions on
              how to reset your password. To manage your all users, `} */}
            </Text>
            <Link className="hover:underline cursor-pointer text-primary/80 mb-8" href={ROUTES.login()}>
              login to the admin dashboard
            </Link>
          </div>

          <form className="max-w-lg" onSubmit={handleSubmit(onSubmit)}>
            <Message className="mb-8" error={error} />
            <FormItem className="mb-8">
              <Input
                label="Email address"
                id="email"
                {...register("email", { required: "Please provide your email." })}
                type="email"
              />
              {errors?.email && <FormError message={errors.email.message} />}
            </FormItem>

            <button
              type="button"
              data-testid="checkout-button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToast({
                  title: t("messages.demo.login"),
                  color: "warning",
                  variant: "bordered",
                });
              }}
              className={btnVariants({ size: "md", variant: "glow", className: "grow w-full" })}
            >
              {t("forgotPassword.form.submit")}
              {/* Forgot Password */}
              {/* {isLoading ? t("login.form.submit.loading") : t("login.form.submit")} */}
            </button>
          </form>
        </React.Fragment>
      )}
      {success && (
        <React.Fragment>
          <Text comp="h1" size="md" variant="gradient" className="mb-4">
            Request submitted
          </Text>
          <Text comp="p" size="xs">
            Check your email for a link that will allow you to securely reset your password.
          </Text>
        </React.Fragment>
      )}
    </Fragment>
  );
}
