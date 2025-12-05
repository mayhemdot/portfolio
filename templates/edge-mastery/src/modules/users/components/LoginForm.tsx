"use client";

import { Input } from "@heroui/input";
import { addToast } from "@heroui/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { FormError } from "@/modules/common/components/Form/FormError";
import { FormItem } from "@/modules/common/components/Form/FormItem";
import { Message } from "@/modules/common/components/Message";
import { Button, btnVariants } from "@/shared/components/ui/Button";
import { ROUTES } from "@/shared/utils/routes";

type FormData = {
  email: string;
  password: string;
};

export function LoginForm({ locale }: { locale: string }) {
  const searchParams = useSearchParams();
  const t = useTranslations();
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : "";
  const redirect = useRef(searchParams.get("redirect"));
  const router = useRouter();
  const [error, setError] = React.useState<null | string>(null);
  //   const { login } = useAuth();

  const {
    formState: { errors, isLoading },
    handleSubmit,
    register,
  } = useForm<FormData>();

  const onSubmit = useCallback(async (data: FormData) => {
    try {
      // toast({
      //   size: "sm",
      //   color: "success",
      //   title: "Logging in...",
      //   //   title: "Logging in...",
      // });
      // await login(data);
      // if (redirect?.current) router.push(redirect.current);
      // else router.push("/account");
    } catch (_) {
      // setError("There was an error with the credentials provided. Please try again.");
    }
  }, []);

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <Message className="classes.message" error={error} />
      <div className="flex flex-col gap-6">
        <FormItem>
          <Input
            label={t("login.form.labels.email")}
            id="email"
            type="email"
            placeholder={t("login.form.labels.emailPlaceholder")}
            required
            {...register("email", { required: "Email is required." })}
          />
          {errors?.email && <FormError message={errors.email.message} />}
        </FormItem>
        <FormItem>
          <Input
            label={t("login.form.labels.password")}
            id="password"
            type="password"
            placeholder={t("login.form.labels.passwordPlaceholder")}
            required
            {...register("password", { required: "Please provide a password." })}
          />
          {errors?.password && <FormError message={errors.password.message} />}
        </FormItem>

        <div className="mb-4">
          <p className="prose dark:prose-invert prose:hover:text-primary">
            {t("login.form.links.forgot_password_label")}{" "}
            <Link className="hover:underline cursor-pointer text-primary/80" href={ROUTES.forgotPassword(locale)}>
              {/* Click here to reset it */}
              {t("login.form.links.forgot_password_link")}
            </Link>
          </p>
        </div>
      </div>

      {/* <Button className="grow w-full" disabled={isLoading} size="md" type="submit">
        {isLoading ? t("login.form.submit.loading") : t("login.form.submit")}
      </Button> */}
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
        {isLoading ? t("login.form.submit.loading") : t("login.form.submit")}
      </button>
    </form>
  );
}
