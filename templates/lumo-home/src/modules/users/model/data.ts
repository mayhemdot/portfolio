import { User } from "@/modules/users/model/types"


export const CUSTOMER: User = {
    id: "cus_01J8Z3M7K5A9G82W4XPK3X9V2B",
    email: "anonymus@example.com",
    first_name: "John",
    last_name: "Doe",
    phone: "+1234567890",
    has_account: true,
    created_at: "2023-12-01T12:44:12.000Z",
    updated_at: "2024-03-02T15:20:10.000Z",
    deleted_at: null,
    role: "customer",
    shipping_addresses: [
      {
        id: "addr_01J8Z3X7Q9PV3C2KT67W9MZ4A1",
        customer_id: "cus_01J8Z3M7K5A9G82W4XPK3X9V2B",
        first_name: "John",
        last_name: "Doe",
        company: null,
        address_1: "321 5th Ave",
        address_2: null,
        city: "New York",
        country_code: "us",
        postal_code: "94016",
        province: "NY",
        phone: "+1234567890",
        created_at: "2023-12-02T11:10:10.000Z",
        updated_at: "2024-01-10T10:30:00.000Z",
      },
    ],

    billing_address_id: null,
    billing_address: null,

    metadata: {},
}

export const ADMIN: User = {
  id: "usr_01J9A2N8L6B0H93X5YQL4W1Z3C",
  email: "admin@example.com",
  first_name: "Admin",
  last_name: "System",
  phone: "+1987654321",
  has_account: true,
  created_at: "2022-01-15T08:30:00.000Z",
  updated_at: "2024-03-10T14:25:45.000Z",
  deleted_at: null,

  role: "super_admin", // admin, moderator, support и т.д.
  permissions: ["all"], // или конкретные права доступа
  is_active: true,
  last_login_at: "2024-03-10T09:15:22.000Z",
  
  // Администраторы обычно не имеют shipping адресов как клиенты
  // но могут иметь контактную информацию

  // Дополнительные поля специфичные для админа
  department: "IT Department",
  job_title: "System Administrator",
  notification_preferences: {
      email_notifications: true,
      sms_notifications: false,
      push_notifications: true,
      report_frequency: "daily" // daily, weekly, monthly
  },

  metadata: {
      two_factor_enabled: true,
      login_attempts: 0,
      timezone: "America/Los_Angeles",
      language: "en"
  },
  
}


// export const ADMIN = { 
//   id: 1, 
//   name: "Admin", 
//   email: "admin@localhost", 
//   phone: "", 
//   avatar: "", 
//   role: "admin" 
// };