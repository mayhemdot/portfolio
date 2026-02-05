// "use server";

// import config from "@payload-config";
// import { revalidatePath } from "next/cache";
// import { getPayload } from "payload";
// import {
//   UpdateProfileZodFieldErrors,
//   updateProfileSchema,
// } from "../model/schemas";

// export async function updateUserAccount(_: any, formData: FormData) {
//   const parsedData = updateProfileSchema.safeParse({
//     userId: formData.get("userId"),
//     name: formData.get("username"),
//     email: formData.get("email"),
//     phone: formData.get("phone"),
//   });

//   if (!parsedData.success) {
//     return {
//       success: false,
//       errors: parsedData.error?.flatten().fieldErrors,
//     };
//   }

//   try {
//     const payload = await getPayload({ config });
//     const { userId, name, email, phone } = parsedData.data;

//     // Check if email is already taken by another user
//     // const existingUser = await payload.find({
//     //   collection: "users",
//     //   where: {
//     //     and: [
//     //       {
//     //         email: { equals: email },
//     //       },
//     //       { id: { not_equals: userId } },
//     //     ],
//     //   },
//     // });

//     // if (existingUser.docs.length > 0) {
//     //   return { success: false, error: "Email is already taken" };
//     // }

//     // Handle avatar upload if provided

//     // Prepare update data
//     const updateData: any = {
//       name: name || undefined,
//       email,
//       phone: phone || undefined,
//     };

//     // Update user in Payload
//     const updatedUser = await payload.update({
//       collection: "users",
//       id: userId,
//       data: updateData,
//     });

//     // Revalidate relevant paths
//     revalidatePath("/account");
//     revalidatePath("/account/edit");

//     return {
//       data: updatedUser,
//       success: true,
//       errors: undefined,
//     };
//   } catch (error: unknown) {
//     console.error("Update user error:", error);
//     return {
//       success: false,
//       errors: {
//         root: [error instanceof Error ? error.message : "Something went wrong"],
//       },
//     };
//   }
// }
