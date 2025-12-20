"use client";

import { Avatar } from "@radix-ui/react-avatar";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import Link from "next/link";
import type React from "react";
import { useState } from "react";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/modules/users/queries";
import classes from "./AccountForm.module.scss";
import BaseSettingsForm from "./BaseSettingsForm";

const AccountForm: React.FC = () => {
	const [changePassword, setChangePassword] = useState(false);
	const { user, logout, login } = useAuth();

	return (
		<div className='grid grid-cols-1 gap-4 lg:grid-cols-2 '>
			<Card className='h-fit shrink-0 grow lg:max-w-[500px]'>
				<CardHeader className='mx-auto'>
					<CardTitle>Базовые настройки</CardTitle>
					<CardDescription>
						<span className='fsNormal flex gap-4 py-2'>
							<Avatar className='size-12'>
								<AvatarImage src={`${"/images/avatar.png"}`} alt='user icon' />
								<AvatarFallback className='bg-dark-beige-color leading-tight'>
									{user?.name?.slice(0, 1) || user?.email.slice(0, 1)}
								</AvatarFallback>
							</Avatar>
							<span className='flex flex-col space-y-1'>
								<span className='leading-tight'>Customer account</span>
								<span className='fsSmallest leading-tight text-gray-500'>
									from{" "}
									{user?.createdAt &&
										format(parseISO(user?.createdAt), "dd MMMM yyyy", {
											locale: ru,
										})}
								</span>
							</span>
						</span>
					</CardDescription>
				</CardHeader>
				<CardContent className='h-fit'>
					{user && <BaseSettingsForm user={user} />}
				</CardContent>
			</Card>
			<Card className='h-fit shrink grow lg:max-w-[500px]'>
				<CardHeader>
					{!changePassword ? (
						<span className='fsNormal max-w-prose'>
							{"Change your account details below, or "}
							<button
								type='button'
								className={classes.changePassword}
								onClick={() => setChangePassword(!changePassword)}
							>
								click here
							</button>
							{" to change your password."}
						</span>
					) : (
						<span className='fsNormal max-w-prose'>
							{"Change your password below, or "}
							<button
								type='button'
								className={classes.changePassword}
								onClick={() => setChangePassword(!changePassword)}
							>
								cancel
							</button>
							.
						</span>
					)}
				</CardHeader>
				<CardContent className='space-x-2'>
					{/* <PasswordSettingsForm/> */}
					<Link
						href='/recover-password'
						className={buttonVariants({ variant: "secondary" })}
					>
						Смена пароля
					</Link>
					<button
						type='button'
						onClick={logout}
						className={buttonVariants({ variant: "secondary" })}
					>
						Logout
					</button>
					{!user && (
						<button
							type='button'
							onClick={login}
							className={buttonVariants({ variant: "default" })}
						>
							Login
						</button>
					)}
				</CardContent>
			</Card>

			{/* <Card className="h-fit shrink-0 grow">
        <CardHeader className="">Address</CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className={cn(classes.form, 'min-w-64 w-full')}>
            <Message error={error} success={success} className={classes.message} />

            <Input
              name="street"
              type="text"
              label="Street"
              required={false}
              register={register}
              error={errors?.street}
            />
            <Input
              name="city"
              type="text"
              label="City"
              required={false}
              register={register}
              error={errors?.city}
            />
            <div className="flex gap-2 items-center">
              <div>
                <Input
                  name="floor"
                  type="text"
                  label="Floor"
                  required={false}
                  register={register}
                  error={errors?.floor}
                />
              </div>
              <div>
                <Input
                  name="home"
                  type="text"
                  label="Home"
                  required={false}
                  register={register}
                  error={errors?.home}
                />
              </div>
            </div>

            <Button
              aria-label="Обновить адрес"
              aria-disabled={isLoading}
              type="submit"
              className={buttonVariants({
                size: 'lg',
                className: 'w-full mt-2',
              })}
            >
              {isLoading && <ReloadIcon className="mr-3 size-4 animate-spin" />}
              Обновить адрес
            </Button>
          </form>
        </CardContent>
      </Card> */}
		</div>
	);
};

export default AccountForm;

// import PasswordSettingsForm from './PasswordSettingsForm'

// type FormData = {
//   email: string
//   name: string
//   password: string
//   passwordConfirm: string
// }
// const {
//   register,
//   handleSubmit,
//   formState: { errors, isLoading },
//   reset,
//   watch,
// } = useForm<FormData>()

// const password = useRef({})
// password.current = watch('password', '')
// console.log('updated user', user)
{
	/* <Card className="h-fit w-2/5">
<CardHeader>
  <CardTitle>Base Settings</CardTitle>
  <CardDescription>
    {!changePassword ? (
      <span className="fsNormal">
        {'Change your account details below, or '}
        <button
          type="button"
          className={classes.changePassword}
          onClick={() => setChangePassword(!changePassword)}
        >
          click here
        </button>
        {' to change your password.'}
      </span>
    ) : (
      <span className="fsNormal">
        {'Change your password below, or '}
        <button
          type="button"
          className={classes.changePassword}
          onClick={() => setChangePassword(!changePassword)}
        >
          cancel
        </button>
        .
      </span>
    )}
  </CardDescription>
</CardHeader>
<CardContent className="h-fit">
  <form onSubmit={handleSubmit(onSubmit)} className={cn(classes.form, 'max-w-[500px]')}>
    <Message error={error} success={success} className={classes.message} />
    {!changePassword ? (
      <Fragment>
        <Input
          name="email"
          label="Email Address"
          required
          register={register}
          error={errors.email}
          type="email"
        />
        <Input name="name" label="Name" register={register} error={errors.name} />
      </Fragment>
    ) : (
      <Fragment>
        <Input
          name="password"
          type="password"
          label="Password"
          required
          register={register}
          error={errors.password}
        />
        <Input
          name="passwordConfirm"
          type="password"
          label="Confirm Password"
          required
          register={register}
          validate={(value) => value === password.current || 'The passwords do not match'}
          error={errors.passwordConfirm}
        />
      </Fragment>
    )}
    <Button
      aria-label="Войти в аккаунт"
      aria-disabled={isLoading}
      type="submit"
      className={buttonVariants({
        variant: 'default',
        size: 'lg',
        className: 'w-full mt-2',
      })}
    >
      {isLoading && <ReloadIcon className="mr-3 size-4 animate-spin" />}
      Обновить данные
    </Button>
  </form>
</CardContent>
</Card> */
}
