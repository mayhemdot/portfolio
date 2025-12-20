// function PasswordSettingsForm() {
//   return (
//     <>
//       {' '}
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className={cn(classes.form, 'min-w-72 mx-auto w-full max-w-[500px]')}
//       >
//         <Message error={error} success={success} className={classes.message} />
//         {changePassword ? (
//           <>
//             <Input
//               name="password"
//               type="password"
//               label="Password"
//               required
//               register={register}
//               error={errors.password}
//             />
//             <Input
//               name="passwordConfirm"
//               type="password"
//               label="Confirm Password"
//               required
//               register={register}
//               validate={(value) => value === password.current || 'The passwords do not match'}
//               error={errors.passwordConfirm}
//             />
//             <Button
//               aria-label="Обновить аккаунт"
//               aria-disabled={isLoading}
//               type="submit"
//               className={buttonVariants({
//                 size: 'lg',
//                 className: 'w-full mt-2',
//               })}
//             >
//               {isLoading && <ReloadIcon className="mr-3 size-4 animate-spin" />}
//               Обновить пароль
//             </Button>
//           </>
//         ) : null}
//       </form>
//     </>
//   )
// }

// export default PasswordSettingsForm
