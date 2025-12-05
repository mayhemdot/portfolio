import { LocalizedClientLink } from "@/modules/common/components/LocalizedClientLink";
import { Text } from "@/shared/components/Text";

const SignInPrompt = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Text comp="p" size="xs" variant={"secondary"}>
          Already have an account?
        </Text>
        <p className="fsNormal mt-2">Sign in for a better experience.</p>
      </div>
      <div>
        <LocalizedClientLink data-testid="sign-in-button" href="/login">
          Sign in
        </LocalizedClientLink>
      </div>
    </div>
  );
};

export default SignInPrompt;
