// "use client";
// import { Loader2, LogOut } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useTranslations } from "next-intl";
// import { useState } from "react";
// import { Button } from "@/shared/components/ui/button";
// import { signOut } from "@/shared/lib/better-auth/client";
// import { cn } from "@/shared/lib/utils";

// type Props = {
//   className?: string;
//   disabled?: boolean;
//   size?: "sm" | "lg" | "xl" | "default";
//   variant?: "default" | "secondary";
// };

// export function LogoutButtonBetterAuth({
//   className,
//   disabled,
//   size,
//   variant,
// }: Props) {
//   // const handleSignOut = async () => await signOut()
//   const router = useRouter();
//   const [isSignOut, setIsSignOut] = useState<boolean>(false);
//   const t = useTranslations("LogoutButtonBetterAuth");
//   // return (
//   //   <form onSubmit={handleSignOut}>
//   //     <Button
//   //       type="submit"
//   //       className={cn('w-full', className)}
//   //       disabled={disabled}
//   //     >
//   //       Logout <LogOut />
//   //     </Button>
//   //     {/* {state.error && <p className="text-red-600 py-4">{state.error}</p>} */}
//   //   </form>
//   // )

//   return (
//     <Button
//       type="button"
//       size={size}
//       variant={variant}
//       disabled={disabled}
//       onClick={async () => {
//         setIsSignOut(true);
//         await signOut({
//           fetchOptions: {
//             onSuccess() {
//               router.push("/");
//             },
//           },
//         });
//         router.refresh(); // или window.location.reload()
//         router.push("/");
//         setIsSignOut(false);
//       }}
//       className={cn(className, "grow-0 lg:grow")}
//     >
//       {t("signOut")}
//       {isSignOut ? (
//         <Loader2 className="size-3 lg:size-4 animate-spin" />
//       ) : (
//         <LogOut className="size-3 lg:size-4" />
//       )}
//     </Button>
//   );
// }
