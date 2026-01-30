// "use client";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import { useTranslations } from "next-intl";
// import { useForm } from "react-hook-form";
// import { toast } from "react-hot-toast";
// import { InputField } from "@/shared/components/InputField";
// import { Button } from "@/shared/components/ui/button";
// import { Form } from "@/shared/components/ui/form";
// import { signIn } from "@/shared/lib/better-auth/client";
// import { type LoginActionSchema, loginSchema } from "../../model/schemas";

// export function LoginFormBetterAuth() {
//   const router = useRouter();
//   const t = useTranslations("LoginFormBetterAuth");

//   const form = useForm<LoginActionSchema>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const { isLoading, isSubmitting, errors } = form.formState;

//   const handleSignin = async (value: LoginActionSchema) => {
//     const res = await signIn.email({
//       email: value.email,
//       password: value.password,
//     });
//     console.log("res", res);
//     if (res?.error) {
//       toast.error(res.error.message! || "Something went wrong");
//     }
//     if (res?.data) {
//       form.reset();
//       router.push("/");
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(handleSignin)} className="space-y-4">
//         <InputField<LoginActionSchema>
//           label={t("form.emailLabel")}
//           type="text"
//           name="email"
//           register={form.register}
//           placeholder={t("form.emailPlaceholder")}
//           autoComplete="email"
//           disabled={isSubmitting || isLoading}
//         />
//         <InputField<LoginActionSchema>
//           label={t("form.passwordLabel")}
//           type="password"
//           name="password"
//           register={form.register}
//           placeholder={t("form.passwordPlaceholder")}
//           autoComplete="current-password"
//           disabled={isSubmitting || isLoading}
//         />

//         <Button type="submit" size="lg" disabled={isLoading} className="w-full">
//           {t("submit")}
//         </Button>

//         {errors?.root?.message && (
//           <p className="text-red-600 py-4">{errors.root.message}</p>
//         )}
//       </form>
//     </Form>
//   );
// }
