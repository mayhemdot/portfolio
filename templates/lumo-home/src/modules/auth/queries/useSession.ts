// import { useEffect, useState } from "react";
// import type { User } from "@/modules/users/model/types";
// import { appAuthClient } from "@/shared/lib/auth";

// export const useSession = () => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [session, setSession] = useState<{
//     data:
//       | {
//           user: User | undefined;
//           isAuthenticated: boolean;
//         }
//       | undefined;
//     message: string;
//     isSuccess: boolean;
//   }>({
//     data: undefined,
//     message: "",
//     isSuccess: false,
//   });

//   useEffect(() => {
//     setLoading(true);
//     const fetchSession = async () => {
//       try {
//         const { data, isSuccess, message } =
//           await appAuthClient.getClientSession();

//         // console.log('fetchSession', data, isSuccess)
//         if (!isSuccess) {
//           setSession({
//             data: undefined,
//             message,
//             isSuccess,
//           });
//         }
//         setSession({
//           data: data as any,
//           message,
//           isSuccess,
//         });
//       } catch (error) {
//         // setLoading(false)
//         console.log(error);
//       }
//       setLoading(false);
//     };
//     fetchSession();
//   }, []);

//   return {
//     loading,
//     ...session,
//   };
// };
