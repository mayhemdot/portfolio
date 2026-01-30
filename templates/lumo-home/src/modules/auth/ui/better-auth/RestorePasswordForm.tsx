// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import { useTranslations } from "next-intl";
// import { parseAsString, useQueryState } from "nuqs";
// import { useForm } from "react-hook-form";
// import { toast } from "react-hot-toast";
// import { InputField } from "@/shared/components/InputField";
// import { Button } from "@/shared/components/ui/button";
// import { Form } from "@/shared/components/ui/form";
// import { resetPassword } from "@/shared/lib/better-auth/client";
// import {
//   type RestorePasswordActionSchema,
//   restorePasswordSchema,
// } from "../../model/schemas";

// export function RestorePasswordFormBetterAuth() {
//   const t = useTranslations("RestorePasswordFormBetterAuth");

//   const router = useRouter();
//   const [code, _setCode] = useQueryState(
//     "token",
//     parseAsString.withDefault(""),
//   );

//   const form = useForm<RestorePasswordActionSchema>({
//     resolver: zodResolver(restorePasswordSchema),
//     defaultValues: {
//       password: "",
//       repeatPassword: "",
//       code: code || "",
//     },
//   });
//   const { isLoading, isSubmitting, errors } = form.formState;

//   const handleRestorePassword = async (value: RestorePasswordActionSchema) => {
//     const res = await resetPassword({
//       newPassword: value.password,
//       token: value.code,
//     });
//     if (res?.error) {
//       toast.error(res.error.message!);
//     }
//     if (res?.data?.status) {
//       router.push("/");
//       toast.success("Password restored successfully! Please log in.");
//     }
//   };

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(handleRestorePassword)}
//         className="space-y-4"
//       >
//         <InputField<RestorePasswordActionSchema>
//           label={t("form.passwordLabel")}
//           type="password"
//           name="password"
//           register={form.register}
//           placeholder={t("form.passwordPlaceholder")}
//           autoComplete="current-password"
//           disabled={isSubmitting || isLoading}
//         />

//         <InputField<RestorePasswordActionSchema>
//           label={t("form.repeatPasswordLabel")}
//           type="password"
//           name="repeatPassword"
//           register={form.register}
//           placeholder={t("form.repeatPasswordPlaceholder")}
//           autoComplete="current-password"
//           disabled={isSubmitting || isLoading}
//         />

//         <InputField<RestorePasswordActionSchema>
//           label="Code"
//           type="text"
//           name="code"
//           register={form.register}
//           // defaultValue={code}
//           disabled={true}
//         />

//         <Button
//           type="submit"
//           disabled={isSubmitting || isLoading}
//           className="w-full"
//         >
//           {t("submit")}
//         </Button>

//         {errors?.root && (
//           <p className="text-red-600 py-4">
//             {errors.root?.message?.toString()}
//           </p>
//         )}
//       </form>
//     </Form>
//   );
// }
