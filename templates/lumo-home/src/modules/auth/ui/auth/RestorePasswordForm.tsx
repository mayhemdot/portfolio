// import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { InputField } from "@/shared/components/InputField";
import { Button } from "@/shared/components/ui/button";
import { appAuthClient } from "@/shared/lib/auth";
import { sleep } from "@/shared/utils/timeout";


type RestorePasswordResponse = {
  success: boolean;
  data?: any;
  errors?: any;
};



export function RestorePasswordFormClient() {
  const router = useRouter();

  const [code] = useQueryState(
    "restore_code",
    parseAsString.withDefault("")
  );

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleRestorePassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setErrors({});

    if (!password || !repeatPassword) {
      setErrors({ root: "All fields are required" });
      return;
    }

    if (password !== repeatPassword) {
      setErrors({ root: "Passwords do not match" });
      return;
    }

    if (!code) {
      setErrors({ root: "Invalid or missing restore code" });
      return;
    }

    setIsLoading(true);

    await sleep(2000)

    setIsLoading(false);

    toast.success("Password restored successfully! Please log in.");
    router.push("/");
  };

  return (
    <form onSubmit={handleRestorePassword} className="space-y-4">
      <InputField
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter new password"
        autoComplete="new-password"
        disabled={isLoading}
      />

      <InputField
        label="Repeat password"
        type="password"
        name="repeatPassword"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        placeholder="Repeat your password"
        autoComplete="new-password"
        disabled={isLoading}
      />

      <InputField
        label="Code"
        type="text"
        name="code"
        value={code}
        disabled
      />

      <Button type="submit" disabled={isLoading} className="w-full">
        Restore Password
      </Button>

      {errors?.root && (
        <p className="text-red-600 py-4">{errors.root}</p>
      )}
    </form>
  );
}