// import {
//   IsPending,
//   IsWaitingForCapture,
// } from "@/collections/Orders/helpers/checkStatus";
// // import type { CollectionConfig } from "payload";
// // import type { Order } from "@/payload-types";
// import { admins } from "@/shared/access/admins";
// import { checkboxField } from "@/shared/fields/lockable-checkbox";
// import { paymentNotificationHandler } from "./endpoints/paymentNotificationHandler";
// import { calculateTotalPrice } from "./helpers/calculateTotalPrice";
// import { adminsAndOrderedBy } from "./hooks/adminsAndOrderedBy";
// import { createPayment } from "./hooks/createYooPayment";
// import {
//   paymentAmountPreview,
//   paymentPaidPreview,
//   paymentStatusPreview,
// } from "./hooks/paymentDisplayFields";
// import {
//   sendEmailOnComplete,
//   sendRefundNotification,
//   sendToTelegramOnComplete,
// } from "./hooks/sendEventsOnComplete";

// const Orders: CollectionConfig = {
//   slug: "orders",
//   admin: {
//     useAsTitle: "createdAt",
//     defaultColumns: [
//       "payment",
//       "createdAt",
//       "paymentData.paymentStatus",
//       "paymentData.paymentAmount",
//     ],
//   },
//   access: {
//     read: adminsAndOrderedBy,
//     create: adminsAndOrderedBy,
//     update: admins,
//     delete: admins,
//   },
//   endpoints: [
//     {
//       // Add to yookassa url
//       // /api/orders/notifications
//       path: "/notifications",
//       method: "post",
//       handler: paymentNotificationHandler,
//     },
//   ],
//   hooks: {
//     afterChange: [createPayment, sendEmailOnComplete, sendToTelegramOnComplete], //sendRefundNotification
//   },
//   timestamps: true,
//   fields: [
//     {
//       name: "Order operations",
//       type: "group",
//       admin: {
//         condition: (data: Partial<Order>) =>
//           Boolean(data?.id) &&
//           (data?.status === "waiting_for_capture" ||
//             data?.status === "pending"),
//       },
//       fields: [
//         {
//           // Должен появляться, когда у товара есть статус "waiting_for_capture"
//           // это возможно когда
//           label: "Confirm the order payment",
//           name: "Confirming",
//           type: "ui",
//           admin: {
//             components: {
//               Field: "@/collections/Orders/ui/CapturePaymentButton",
//             },
//             condition: (data: Partial<Order>) =>
//               data?.status === "waiting_for_capture",
//           },
//         },
//         {
//           label: "Cancel the order payment",
//           name: "Canceling",
//           type: "ui",
//           admin: {
//             components: {
//               Field: "@/collections/Orders/ui/CancelPaymentButton",
//             },
//             condition: (data: Partial<Order>) =>
//               data?.status === "waiting_for_capture" ||
//               data?.status === "pending",
//           },
//         },
//       ],
//     },
//     {
//       label: "Payment",
//       name: "payment",
//       type: "relationship",
//       relationTo: "payments",
//       access: {
//         create: () => true,
//         read: () => true,
//         update: ({ req }: any) => admins({ req }),
//       },
//       admin: {
//         // readOnly: true,
//         components: {
//           Description: "@/collections/Orders/ui/PaymentDescription",
//         },
//       },
//       // hooks: {
//       //   beforeValidate: [
//       //     ({ originalDoc, data }) => {
//       //       // если документ уже существует, защищаем поле от мануального изменения
//       //       if (originalDoc && data) {
//       //         data.payment = originalDoc.payment
//       //       }
//       //       return data
//       //     },
//       //   ],
//       // },
//       required: false,
//     },
//     {
//       label: "Payment Details",
//       name: "paymentData",
//       type: "group",
//       admin: {
//         position: "sidebar",
//         readOnly: true,
//         condition: (data: Partial<Order>) => Boolean(data?.id),
//       },
//       fields: [
//         {
//           label: "Payment Status",
//           name: "paymentStatus",
//           type: "text",
//           virtual: true,
//           admin: {
//             readOnly: true,
//           },
//           hooks: {
//             afterRead: [paymentStatusPreview],
//           },
//         },
//         {
//           label: "Payment Amount",
//           name: "paymentAmount",
//           type: "text",
//           admin: {
//             readOnly: true,
//           },
//           virtual: true,
//           hooks: {
//             afterRead: [paymentAmountPreview],
//           },
//         },
//         {
//           label: "Payment Paid",
//           name: "paymentPaid",
//           type: "checkbox",
//           admin: {
//             readOnly: true,
//           },
//           virtual: true,
//           hooks: {
//             afterRead: [paymentPaidPreview],
//           },
//         },
//       ],
//       // hooks: {
//       //   beforeChange: [
//       //     ({ siblingData }) => {
//       //       // ensures data is not stored in DB
//       //       delete siblingData["paymentData"];
//       //     },
//       //   ],
//       // },
//     },
//     {
//       name: "orderedBy",
//       type: "group",
//       admin: {
//         readOnly: true,
//       },
//       hooks: {
//         beforeChange: [
//           async ({ operation, value, req }) => {
//             // TODO: Пользователь в req взят из adminUsers
//             if (!req.user) return value;
//             console.log("orderedBy:user", req.user.id, value.user);
//             return {
//               user: Number(value.user),
//               email: req.user?.email,
//               name: req.user?.name,
//             };
//           },
//         ],
//       },
//       fields: [
//         {
//           name: "user",
//           type: "relationship",
//           relationTo: "users",
//           hasMany: false,
//         },
//         {
//           name: "name",
//           type: "text",
//         },
//         {
//           name: "email",
//           type: "text",
//         },
//       ],
//     },
//     {
//       name: "items",
//       type: "array",
//       admin: {
//         readOnly: true,
//       },
//       hooks: {
//         beforeChange: [calculateTotalPrice],
//       },
//       fields: [
//         {
//           label: "Product",
//           name: "product",
//           type: "relationship",
//           relationTo: "products",
//           hasMany: false,
//         },
//         {
//           label: "Total price",
//           name: "totalPrice",
//           type: "number",
//         },
//         {
//           label: "Quantity",
//           name: "quantity",
//           type: "number",
//         },
//       ],
//       minRows: 1,
//       maxRows: 10,
//     },

//     {
//       label: "Address",
//       name: "address",
//       type: "text",
//       required: true,
//     },
//     {
//       label: "City",
//       name: "city",
//       type: "text",
//       required: true,
//     },
//     {
//       label: "Zip",
//       name: "zip",
//       type: "text",
//       required: true,
//     },
//     {
//       label: "Phone",
//       name: "phone",
//       type: "text",
//     },
//     {
//       label: "Order Status",
//       name: "status",
//       type: "select",

//       admin: {
//         description:
//           "Do not manually modify this selector to cancel an order. Use the 'Cancel order' button or Refund.",
//         // description:  "Для отмены заказа не вносите изменения в данный селектор вручную, используйте кнопку 'Отменить заказ' или Payback",
//         position: "sidebar",
//         // disabled: (data: Partial<Order>) => {
//         //   return data?.status === "paid" || data?.status === "cancelled";
//         // },
//         disableListFilter: true,
//         // disabled: (data: Partial<Order>) => data?.status === "paid",
//       },
//       options: [
//         // Ожидание оплаты
//         "pending", //or created
//         // Ожидание подтверждения товара
//         "waiting_for_capture",
//         // Оплачен и подтвержден
//         "paid",
//         // Подготовка к отправке
//         "preparing",
//         // Осуществляется доставка
//         "delivering",
//         // Доставлено
//         "shipped",
//         //  Отменен
//         "cancelled",
//         // Возврат запрошен
//         "refund_requested",
//       ],
//       defaultValue: "pending",
//       required: true,
//     },
//     {
//       label: "Shipping method",
//       name: "shippingMethod",
//       type: "relationship",
//       relationTo: "shippings",
//       required: true,
//       // hooks: {
//       //   beforeChange: [
//       //     async ({ operation, value, req }) => {
//       //       try {
//       //         const shipping = await req.payload.findByID({
//       //           collection: 'shippings',
//       //           id: value,
//       //           depth: 0, // Не нужно вытаскивать вложенности
//       //         })
//       //         return shipping
//       //       } catch (err) {
//       //         console.error('Shipping not found:', err)
//       //         return value
//       //       }
//       //     },
//       //   ],
//       // },
//     },

//     {
//       label: "Payback", // 'Оформить возврат',
//       name: "payback",
//       type: "ui",
//       admin: {
//         position: "sidebar",
//         components: {
//           Field: "@/collections/Orders/ui/PaybackButton",
//         },
//         condition: ({ isRefunded, status, paymentData }) =>
//           !isRefunded &&
//           !IsWaitingForCapture(status) &&
//           !IsPending(status) &&
//           paymentData.paymentPaid,
//       },
//     },
//     ...checkboxField({
//       checkboxLockOverrides: {
//         defaultValue: true,
//         admin: {
//           condition: ({ status }) =>
//             !IsWaitingForCapture(status) && !IsPending(status),
//         },
//       },
//       checkboxOverrides: {
//         // defaultValue: true,
//         admin: {
//           condition: ({ status, paymentData }) =>
//             !IsWaitingForCapture(status) &&
//             !IsPending(status) &&
//             paymentData.paymentPaid,
//         },
//       },
//     }),

//     // {
//     //   name: "stripeInvoiceID",
//     //   type: "text",
//     //   admin: {
//     //     readOnly: true,
//     //     position: "sidebar",
//     //   },
//     // },
//     // {
//     //   name: "stripePaymentIntentID",
//     //   type: "text",
//     //   admin: {
//     //     readOnly: true,
//     //     position: "sidebar",
//     //   },
//     // },

//     // {
//     //   type: "checkbox",
//     //   name: "isRefunded",
//     //   defaultValue: false,
//     //   admin: {
//     //     // readOnly: true,
//     //     position: "sidebar",
//     //     components: {
//     //       Field: "@/collections/Orders/ui/IsRefundedField",
//     //     },
//     //   },
//     //   // hooks: {
//     //   //   beforeChange: [
//     //   //     ({ data, value }) => {
//     //   //       if (data && value === true) {
//     //   //         data.status = "cancelled";
//     //   //       }
//     //   //       return value;
//     //   //     },
//     //   //   ],
//     //   // },
//     //   access: {
//     //     update: ({ req }) => admins({ req }),
//     //   },
//     // },
//   ],
//   defaultSort: "-createdAt",
// };

// export default Orders;
