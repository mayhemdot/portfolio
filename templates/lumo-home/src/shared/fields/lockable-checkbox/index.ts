// import type { CheckboxField } from 'payload'

// type Overrides = {
//   checkboxLockOverrides?: Partial<CheckboxField>
//   checkboxOverrides?: Partial<CheckboxField>
// }

// type Slug = (overrides?: Overrides) => [CheckboxField, CheckboxField]

// export const checkboxField: Slug = (overrides = {}) => {
//   const { checkboxLockOverrides, checkboxOverrides } = overrides

//   const checkBoxLockField: CheckboxField = {
//     name: 'checkboxLock',
//     type: 'checkbox',
//     hidden: true,
//     // defaultValue: false,
//     admin: {
//       position: 'sidebar',
//       ...(checkboxLockOverrides?.admin || {}),
//       hidden: true,
//     },
//     ...checkboxLockOverrides,
//   }

//   const checkboxField: CheckboxField = {
//     type: 'checkbox',
//     name: 'isRefunded',
//     // defaultValue: false,
//     ...(checkboxOverrides || {}),
//     admin: {
//       position: 'sidebar',
//       components: {
//         Field: {
//           path: '@/collections/Orders/ui/IsRefundedField',
//           clientProps: {
//             checkboxLockFieldPath: checkBoxLockField.name,
//           },
//         },
//       },
//       ...(checkboxOverrides?.admin || {}),
//     },
//   }
//   return [checkboxField, checkBoxLockField]
// }
