import toast from "react-hot-toast";
// import z from "zod";
import { restApi } from "@/lib/restApi";

// export const QuestionSchema = z.object({
// 	email: z.string().email({ message: "Please enter a valid email address" }),
// 	subject: z
// 		.string()
// 		.min(2, { message: "Subject must be at least 2 characters long" }),
// 	description: z
// 		.string()
// 		.min(10, { message: "Description must be at least 10 characters long" }),
// 	category: z.string().optional(),
// });

// export type QuestionType = z.infer<typeof QuestionSchema>;

export function useCreateFeedback() {
	// return useMutation<any, any, QuestionType>({
	//   mutationFn: async (data) =>
	//     restApi('/api/support-tickets', {
	//       method: 'POST',
	//       body: JSON.stringify({
	//         email: data.email,
	//         description: data.description,
	//         subject: data.subject,
	//         category: data.category,
	//       }),
	//     }),
	// })

	toast.success("Successfully subscribed.");
}
