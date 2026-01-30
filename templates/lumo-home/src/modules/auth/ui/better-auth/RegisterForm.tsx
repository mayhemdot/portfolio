// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import { useTranslations } from "next-intl";
// import { useForm } from "react-hook-form";
// import { toast } from "react-hot-toast";
// import { InputField } from "@/shared/components/InputField";
// import { Button } from "@/shared/components/ui/button";
// import { Form } from "@/shared/components/ui/form";
// import { signUp } from "@/shared/lib/better-auth/client";
// import { type RegisterActionSchema, registerSchema } from "../../model/schemas";

// export function RegisterFormBetterAuth() {
//   const t = useTranslations("RegisterFormBetterAuth");

//   const router = useRouter();

//   const form = useForm<RegisterActionSchema>({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//       repeatPassword: "",
//     },
//   });
//   const { isLoading, isSubmitting, errors } = form.formState;

//   const handleSignup = async (value: RegisterActionSchema) => {
//     const res = await signUp.email({
//       email: value.email,
//       password: value.password,
//       name: value.email.split("@")[0],
//       image: "",
//     });

//     console.log("res", res);
//     if (res?.error) {
//       toast.error(res.error.message!);
//     }

//     if (res?.data) {
//       router.push("/login");
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-4">
//         <InputField<RegisterActionSchema>
//           label={t("form.emailLabel")}
//           type="text"
//           name="email"
//           register={form.register}
//           placeholder={t("form.emailPlaceholder")}
//           autoComplete="email"
//           disabled={isSubmitting || isLoading}
//         />

//         <InputField<RegisterActionSchema>
//           label={t("form.passwordLabel")}
//           type="password"
//           name="password"
//           register={form.register}
//           placeholder={t("form.passwordPlaceholder")}
//           autoComplete="current-password"
//           disabled={isSubmitting || isLoading}
//         />

//         <InputField<RegisterActionSchema>
//           label={t("form.repeatPasswordLabel")}
//           type="password"
//           name="repeatPassword"
//           register={form.register}
//           placeholder={t("form.repeatPasswordPlaceholder")}
//           autoComplete="current-password"
//           disabled={isSubmitting || isLoading}
//         />

//         <Button
//           type="submit"
//           size={"lg"}
//           disabled={isSubmitting || isLoading}
//           className="w-full"
//         >
//           {t("submit")}
//         </Button>

//         {errors?.root && (
//           <p className="text-red-600 py-4">{errors.root.toString()}</p>
//         )}
//       </form>
//     </Form>
//   );
// }
