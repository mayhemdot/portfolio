"use client";
import { useTranslations } from "next-intl";
import { useActionState } from "react";
import ErrorMessage from "@/modules/common/components/Form/ErrorMessage";
import Input from "@/modules/common/components/Input";
import { LocalizedClientLink } from "@/modules/common/components/LocalizedClientLink";
import { ROUTES } from "@/shared/utils/routes";
import { login } from "../../actions/loginAction";
// import { SubmitButton } from "@/modules/common/components/SubmitButton";

export function LoginForm({ locale }: { locale: string }) {
  const t = useTranslations();

  const [state, formAction, isPending] = useActionState<any>(login, {
    success: false,
    errors: {},
    fields: {
      email: "",
      password: "",
    },
  });

  return (
    <form action={formAction} className={"w-full space-y-3"}>
      <Input
        label="Email"
        name="email"
        type="email"
        title="Enter a valid email address."
        autoComplete="email"
        defaultValue={state.fields.email}
        required
        data-testid="email-input"
        className="flex-1"
        errors={state.errors}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        defaultValue={state.fields.password}
        required
        errors={state.errors}
        data-testid="password-input"
      />
      <LocalizedClientLink
        href={ROUTES.forgotPassword(locale)}
        className="underline cursor-pointer"
        data-testid="register-button"
      >
        {t("login.form.forgotPassword")}
        {/* Forgot your password? */}
      </LocalizedClientLink>

      <ErrorMessage error={state.errors?.root?.[0]} data-testid="login-error-message max-w-full" />
      {/* <SubmitButton
        data-testid="login-in-button"
        className="w-full mt-6"
        color="secondary"
        variant="shadow"
        isLoading={isPending}
      >
        Log in
      </SubmitButton> */}
      <LocalizedClientLink href={ROUTES.termOfUse(locale)} className="underline">
        Terms of Use
      </LocalizedClientLink>
    </form>
  );
}
