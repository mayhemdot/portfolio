"use server";
import { redirect } from "next/navigation";

export async function processCheckout(prev: any, formData: FormData) {

  const userId = formData.get("user") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const city = formData.get("city") as string;
  const zip = formData.get("zip") as string;
  const items = formData.getAll("items[]") as string[];
  const shippingMethod = formData.get("shippingMethod") as string;

  console.log("[Processing checkout...]");
  console.log("User ID:", userId);
  console.log("Phone Number:", phone);
  console.log("Address:", address);
  console.log("City:", city);
  console.log("Zip:", zip);
  console.log("shippingMethod:", shippingMethod);
  console.log("items:", items);

  const itemsParsed: { product: string; quantity: number }[] = items.map(
    (item) => JSON.parse(item),
  );

  // const payload = await getPayload({ config });
  let confirmationURL: string = "";
  try {
     const order = {
      payment: {
        confirmation: {
          confirmation_url: "https://google.com"
        }
      },
     };
    // const user = await payload.findByID({
    //   collection: "users",
    //   id: userId,
    // });
    // const shipping = await payload.findByID({
    //   collection: "shippings",
    //   id: shippingMethod,
    // });
    // const order = await payload.create({
    //   collection: "orders",
    //   data: {
    //     orderedBy: {
    //       user: Number(user.id),
    //       email: user.email,
    //     },
    //     shippingMethod: shipping,
    //     address,
    //     city,
    //     items: itemsParsed.map(({ product, quantity }) => ({
    //       product: Number(product),
    //       quantity: Number(quantity),
    //     })),
    //     zip,
    //     payment: null,
    //     status: "pending",
    //   },
    // });

    console.log("order", order);
    confirmationURL =
      typeof order.payment === "object"
        ? order.payment?.confirmation.confirmation_url || ""
        : "";

    // return {
    //   success: true,
    //   data: order,
    //   error: "",
    // };
    // console.log("Checkout processed successfully:", order);
    // Redirect to a success page or order confirmation
  } catch (error) {
    console.error("Error processing checkout:", error);
    return {
      success: false,
      data: undefined,
      error: error instanceof Error ? error.message : "Something went wrong",
    };
    // Handle error (e.g., show an error message to the user)
  }
  redirect(confirmationURL);
}
