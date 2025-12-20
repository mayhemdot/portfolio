// const create = useCallback<Create>(async (args) => {
//   try {
//     // create a new user
//     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
//       method: 'POST',
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email: args.email,
//         password: args.password,
//         passwordConfirm: args.passwordConfirm,
//       }),
//     })

//     if (res.ok) {
//       const { data, errors } = await res.json()
//       if (errors) throw new Error(errors[0].message)
//       setUser(data?.loginUser?.user)
//       setStatus('loggedIn')
//     } else {
//       throw new Error('Invalid login')
//     }
//   } catch (e) {
//     throw new Error(e)
//   }
// }, [])
// const login = useCallback<Login>(async (args) => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/login`, {
//       method: 'POST',
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email: args.email,
//         password: args.password,
//       }),
//     })

//     if (res.ok) {
//       const { user, errors } = await res.json()
//       if (errors) throw new Error(errors[0].message)
//       setUser(user)
//       setStatus('loggedIn')
//       return user
//     }

//     throw new Error('Invalid login')
//   } catch (e) {
//     throw new Error('An error occurred while attempting to login.')
//   }
// }, [])
