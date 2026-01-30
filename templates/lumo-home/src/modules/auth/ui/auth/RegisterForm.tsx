"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";
import { InputField } from "@/shared/components/InputField";
import { Button } from "@/shared/components/ui/button";
import { sleep } from "@/shared/utils/timeout";

export function RegisterFormClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    if (password !== repeatPassword) {
      setErrors({ root: "Passwords do not match" });
      return;
    }

    setIsLoading(true);

    await sleep(2000);
   

    toast.success("Account created successfully!");
    setIsLoading(false);
    router.push("/login");
  };

  const handleSignupDebounced = useDebouncedCallback(handleSignup, 2000);

  return (
    <form onSubmit={handleSignupDebounced} className="space-y-4">
      <InputField
        label={"Email"}
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        autoComplete="email"
        disabled={isLoading}
      />

      <InputField
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoComplete="new-password"
        disabled={isLoading}
      />

      <InputField
        label="Repeat password"
        type="password"
        name="repeatPassword"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        placeholder="Password"
        autoComplete="new-password"
        disabled={isLoading}
      />

      <Button type="submit" disabled={isLoading} className="w-full">
        Create Account
      </Button>

      {errors?.root && (
        <p className="text-red-600 py-4">{errors.root.toString()}</p>
      )}
    </form>
  );
}
