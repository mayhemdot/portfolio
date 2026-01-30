// "use client";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useTranslations } from "next-intl";
// import { useForm } from "react-hook-form";
// import { toast } from "react-hot-toast";
// import { InputField } from "@/shared/components/InputField";
// import { Button } from "@/shared/components/ui/button";
// import { Form } from "@/shared/components/ui/form";
// import { forgetPassword } from "@/shared/lib/better-auth/client";
// import { cn } from "@/shared/lib/utils";
// import {
//   type ForgotPasswordActionSchema,
//   forgotPasswordSchema,
// } from "../../model/schemas";

// export function ForgotPasswordFormBetterAuth() {
//   // const [_, setStatus] = useQueryState('status', parseAsString.withDefault(''))
//   const t = useTranslations("ForgotPasswordFormBetterAuth");

//   const form = useForm<ForgotPasswordActionSchema>({
//     resolver: zodResolver(forgotPasswordSchema),
//     defaultValues: {
//       email: "",
//     },
//   });
//   const { isLoading, isSubmitting, errors } = form.formState;

//   const handleForgotPassword = async (value: ForgotPasswordActionSchema) => {
//     const res = await forgetPassword({
//       email: value.email,
//       redirectTo: "/restore-password",
//     });

//     if (res?.error) {
//       toast.error(res.error.message);
//     } else {
//       toast.success("Password reset email sent! Please check your inbox.");
//       form.reset();
//       console.log("res", res);
//       // router.push('/forgot-password/confirm')
//     }
//   };

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(handleForgotPassword)}
//         className={cn("w-full", {
//           // hidden: isSent,
//         })}
//       >
//         <InputField<ForgotPasswordActionSchema>
//           label={t("form.emailLabel")}
//           name="email"
//           type="email"
//           placeholder={t("form.emailPlaceholder")}
//           autoComplete="email"
//           className="mb-4"
//           disabled={isLoading}
//           // register={form.register}
//         />

//         <Button
//           type="submit"
//           disabled={isSubmitting || isLoading}
//           className="mt-4 w-full"
//           size={"lg"}
//         >
//           {t("reset")}
//         </Button>

//         {errors?.root && (
//           <p className="text-red-600 py-4">{errors.root.toString()}</p>
//         )}
//       </form>
//     </Form>
//   );
// }
