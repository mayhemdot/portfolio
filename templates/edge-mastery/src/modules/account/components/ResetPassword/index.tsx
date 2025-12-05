"use client";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Mail } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import ErrorMessage from "@/modules/common/components/Form/ErrorMessage";
import Input from "@/modules/common/components/Input";
import { LocalizedClientLink } from "@/modules/common/components/LocalizedClientLink";
import { SubmitButton } from "@/modules/common/components/SubmitButton";
import { Button } from "@/shared/components/ui/Button";

export function ResetPasswordForm({
  token,
  email,
  countryCode,
}: {
  email: string;
  token: string;
  countryCode: string;
}) {
  const [state, formAction, isPending] = useActionState(
    () => {
      return {} as any;
    },
    {
      success: false,
      errors: null,
      fields: {
        token: token,
        countryCode: countryCode,
        password: "",
        repeatPassword: "",
      },
    },
  );

  const [errors, setErrors] = useState<any>(state.errors);

  useEffect(() => {
    setErrors(state.errors);
  }, [state.errors]);

  return (
    <form action={formAction} onChange={() => setErrors(null)}>
      <div className="flex flex-col w-full gap-y-3 md:min-w-96">
        <Input label="Token" name="token" type="hidden" value={token} />
        <Input label="Country Code" name="countryCode" type="hidden" value={state.fields.countryCode} errors={errors} />
        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          data-testid="password-input"
          errors={errors}
        />

        <Input
          label="Repeat Password"
          name="repeatPassword"
          type="password"
          required
          data-testid="password-input"
          errors={errors}
        />
      </div>
      <ErrorMessage error={errors?.root?.[0]} data-testid="reset-password-error-message max-w-full" />
      <Button
        className="w-full"
        size="md"
        color="secondary"
        variant="glow"
        data-testid="register-button"
        isLoading={isPending}
      >
        Reset password
      </Button>
    </form>
  );
}

export function ResetPasswordSuccess() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="w-[360px] xl:w-[420px] p-4">
        <CardHeader className="flex flex-col gap-1">
          <div className="flex justify-center mb-2">
            <Mail className="size-12" />
          </div>
          <h2 className="text-2xl font-bold text-center">Check Your Email</h2>
          <p className="text-center py-1">We've sent password reset instructions to your email</p>
        </CardHeader>
        <CardBody>
          <p className="text-sm text-muted-foreground text-center">
            If you don't see the email, check your spam folder or try resending the request.
          </p>
        </CardBody>
        <CardFooter className="flex justify-center">
          <LocalizedClientLink href="/" className="">
            Return to home
          </LocalizedClientLink>
        </CardFooter>
      </Card>
    </div>
  );
}
