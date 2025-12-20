"use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { Controller, useForm } from 'react-hook-form'
import toast from "react-hot-toast";
// import { remapErrors } from "@/app/_providers/Auth";
import { Card, CardContent } from "@/components/elements/Card";
import { Input } from "@/components/Input";
import { Icons } from "@/components/icons/Icons";
import { LinkButton } from "@/components/LinkButton";
import { Message } from "@/components/Message";
import { TextArea } from "@/components/TextArea";
import { CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	QuestionSchema,
	type QuestionType,
	useCreateFeedback,
} from "./queries";

const CATEGORIES = [
	{
		value: "feedback",
		label: "Feedback",
	},
	{
		value: "bug",
		label: "Bug",
	},
	{
		value: "question",
		label: "Question",
	},
];

function QuestionsPage({ layout }: { layout: any }) {
	// const { mutate: createFeedback, isPending } = useCreateFeedback();

	// const {
	// 	register,
	// 	handleSubmit,
	// 	setError,
	// 	control,
	// 	formState: { errors, isLoading, isSubmitted },
	// } = useForm<QuestionType>({
	// 	resolver: zodResolver(QuestionSchema),
	// });
	const isSubmitted = false;

	const onSubmit = async (data: QuestionType | any) => {
		console.log(data);
	};
	// createFeedback(data, {
	//   onSuccess: (resp) => {
	//     if (!resp?.errors?.length) {
	//       toast.success(data?.message || 'Successfully subscribed.')
	//     } else {
	//       remapErrors(resp, setError, ['email', 'message'])
	//       toast.error(data?.errors?.[0].message || 'An error occurred while subscribing.')
	//     }
	//   },
	// })

	return (
		<div>QuestionsPage</div>
		// <>
		// 	{!isSubmitted ? (
		// 		<Card className='h-fit max-w-[600px] rounded-2xl'>
		// 			<CardHeader>
		// 				<div className={"fsH2 relative flex items-center"}>
		// 					<div className='relative mb-2 hidden md:block'>
		// 						<Icons.logo width={"4rem"} height={"4rem"} />
		// 					</div>
		// 					<div className='mx-auto flex basis-5/6 flex-col items-center justify-center'>
		// 						<h1 className={"fsMiddle"}>Отправить сообщение</h1>
		// 						<span className='fsSmall text-zinc-500'>
		// 							Мы свяжемся с вами в ближайшее время
		// 						</span>
		// 					</div>
		// 					<div></div>
		// 				</div>
		// 			</CardHeader>
		// 			<CardContent className='fsNormal !pt-0'>
		// 				<form onSubmit={onSubmit} className='space-y-2'>
		// 					<div>
		// 						<Label className='fsSmall text-zinc-500' htmlFor='category'>
		// 							Them of message
		// 						</Label>
		// 						<Controller
		// 							control={control}
		// 							{...register("category")}
		// 							render={({ field }) => (
		// 								<Select
		// 									name='category'
		// 									defaultValue={CATEGORIES[0].value}
		// 									onValueChange={(value: string) => field.onChange(value)}
		// 								>
		// 									<SelectTrigger
		// 										className={"fsNormal h-12 rounded-2xl bg-beige-color"}
		// 									>
		// 										<SelectValue placeholder='Выберите тему обращение' />
		// 									</SelectTrigger>
		// 									<SelectContent className={"bg-beige-color"}>
		// 										{CATEGORIES?.map(category => (
		// 											<SelectItem
		// 												key={category.label}
		// 												value={category.value}
		// 												className='fsNormal'
		// 											>
		// 												{category.label}
		// 											</SelectItem>
		// 										))}
		// 									</SelectContent>
		// 								</Select>
		// 							)}
		// 						></Controller>
		// 					</div>
		// 					<Input name='email' label='Email Address' required type='email' />
		// 					<Input name='subject' label='Subject' required type='text' />
		// 					<TextArea
		// 						label={"Description"}
		// 						name={"description"}
		// 						// register={register}
		// 						// error={errors.description}
		// 						required={true}
		// 					/>
		// 					<div className='flex w-full items-center justify-between pt-2'>
		// 						<LinkButton
		// 							type='submit'
		// 							className='flex-auto'
		// 							disabled={isLoading || isPending}
		// 						>
		// 							Sent message
		// 						</LinkButton>
		// 					</div>
		// 				</form>
		// 			</CardContent>
		// 		</Card>
		// 	) : (
		// 		<Message
		// 			success={"Message was sent successfully. We will contact you soon "}
		// 		/>
		// 	)}
		// </>
	);
}

export default QuestionsPage;

// const handleSubmit = (e: React.FormEvent) => {
//   e.preventDefault()
//   // Здесь будет логика отправки формы
//   console.log('Form submitted:', { name, email, message })
//   // Очистка формы после отправки
//   setName('')
//   setEmail('')
//   setMessage('')
//   setShowForm(false)
// }

// const toggleForm = () => setShowForm(!showForm)
{
	/* <div>
              <Label htmlFor="name">Имя</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div> */
}
{
	/* <div>
              <Label htmlFor="email">Email</Label>
              <Input name="email" required register={register} error={errors.email} type="email" />
            </div>
            <div>
              <Label htmlFor="message">Сообщение</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between">
              <Button type="submit" className="fsNormal flex-grow h-12 rounded-2xl">
                Отправить
              </Button>
            </div> */
}
{
	/* <Textarea
                name="description"
                required
                {...register('description', { required: true })}
                // error={errors.message}
              /> */
}
<span></span>;
