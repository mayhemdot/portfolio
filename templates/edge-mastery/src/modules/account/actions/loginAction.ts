// "server action";
import { retrieveCustomer } from "@/modules/users/actions/retriveCustomer";

export async function login() {
  const { customer } = await retrieveCustomer();
  if (!customer) {
    return {
      success: false,
      user: null,
      fields: undefined,
      errors: {
        email: ["Invalid email or password."],
      },
    };
  }
  return {
    success: true,
    user: customer,
    fields: undefined,
    errors: null,
  };
}
