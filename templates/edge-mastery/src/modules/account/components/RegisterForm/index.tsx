"use client";

import { addToast } from "@heroui/react";
import { useTranslations } from "next-intl";
import { useActionState, useEffect, useState } from "react";
import ErrorMessage from "@/modules/common/components/Form/ErrorMessage";
import Input from "@/modules/common/components/Input";
import { LocalizedClientLink } from "@/modules/common/components/LocalizedClientLink";
import { getCountryCodeFromLocale } from "@/modules/common/lib/get-region";
import { btnVariants } from "@/shared/components/ui/Button";
import { ROUTES } from "@/shared/utils/routes";
import { login } from "../../actions/loginAction";

export default function RegisterForm({ locale }: { locale: string }) {
  const t = useTranslations();
  const countryCode = getCountryCodeFromLocale(locale);

  const [state, formAction, isPending] = useActionState(login, {
    success: true,
    user: null,
    fields: undefined,
    errors: null,
  } as any);

  const [errors, setErrors] = useState<any>(state.errors);

  useEffect(() => {
    setErrors(state.errors);
  }, [state.errors]);

  return (
    <form className="w-full space-y-3" action={formAction} onChange={() => setErrors(null)}>
      <input type="hidden" name="countryCode" value={countryCode} />
      <div className="flex gap-3">
        <Input
          label={t("register.form.labels.firstName")}
          placeholder={t("register.form.labels.firstNamePlaceholder")}
          name="first_name"
          autoComplete="given-name"
          data-testid="first-name-input"
          defaultValue={state?.fields?.first_name || ""}
          errors={errors}
        />
        <Input
          label={t("register.form.labels.lastName")}
          placeholder={t("register.form.labels.lastNamePlaceholder")}
          name="last_name"
          autoComplete="family-name"
          data-testid="last-name-input"
          defaultValue={state?.fields?.last_name || ""}
          errors={errors}
        />
      </div>

      <Input
        label={t("register.form.labels.email")}
        placeholder={t("register.form.labels.emailPlaceholder")}
        name="email"
        type="email"
        required={true}
        autoComplete="email"
        data-testid="email-input"
        defaultValue={state?.fields?.email || ""}
        errors={errors}
      />
      <Input
        label={t("register.form.labels.phone")}
        placeholder={t("register.form.labels.phonePlaceholder")}
        name="phone"
        type="string"
        required={true}
        autoComplete="tel"
        data-testid="phone-input"
        defaultValue={state?.fields?.phone || ""}
        errors={errors}
      />
      <Input
        label={t("register.form.labels.password")}
        placeholder={t("register.form.labels.passwordPlaceholder")}
        name="password"
        type="password"
        required={true}
        autoComplete="new-password"
        data-testid="password-input"
        defaultValue={state?.fields?.password || ""}
        errors={errors}
      />

      <ErrorMessage error={errors?.root?.[0]} data-testid="register-error" />
      <div className="text-left font-normal py-4 fl-text-12/16">
        {/* By creating an account, you agree to our store */}
        {t("register.form.links.privacy_policy_confirm_label")} {/* &apos;s{" "} */}
        {/* <br /> */}
        <LocalizedClientLink href={ROUTES.privacyPolicy()} className="hover:underline cursor-pointer text-primary/80">
          {/* Privacy Policy */}
          {t("register.form.links.privacy_policy_confirm_link")}
        </LocalizedClientLink>
        {" and "}
        <LocalizedClientLink href={ROUTES.termOfUse()} className="hover:underline cursor-pointer text-primary/80">
          {/* Terms of Use */}
          {t("register.form.links.privacy_policy_terms_of_use_link")}
        </LocalizedClientLink>
        .
      </div>
      {/* <Button
        className="w-full"
        size="md"
        color="secondary"
        variant="glow"
        data-testid="register-button"
        isLoading={isPending}
      >
        {t("register.form.submit")}
      </Button> */}
      <button
        type="button"
        data-testid="checkout-button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addToast({
            title: t("messages.demo.register"),
            color: "warning",
            variant: "bordered",
          });
        }}
        className={btnVariants({ size: "md", variant: "glow", className: "grow w-full" })}
      >
        {t("register.form.submit")}
      </button>
    </form>
  );
}
