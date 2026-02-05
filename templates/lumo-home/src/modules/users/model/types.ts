
// import { CUSTOMER } from "@/modules/users/model/data";

export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  has_account: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  role: "customer" | "super_admin" | "admin" | "moderator" | "support" | "manager";
  
  // Поля, специфичные для customer (опциональные)
  shipping_addresses?: Array<{
    id: string;
    customer_id: string;
    first_name: string;
    last_name: string;
    company: string | null;
    address_1: string;
    address_2: string | null;
    city: string;
    country_code: string;
    postal_code: string;
    province: string;
    phone: string;
    created_at: string;
    updated_at: string;
  }>;
  
  billing_address_id?: string | null;
  billing_address?: {
    id: string;
    customer_id: string;
    first_name: string;
    last_name: string;
    company: string | null;
    address_1: string;
    address_2: string | null;
    city: string;
    country_code: string;
    postal_code: string;
    province: string;
    phone: string;
    created_at: string;
    updated_at: string;
  } | null;
  
  // Поля, специфичные для admin (опциональные)
  permissions?: string[];
  is_active?: boolean;
  last_login_at?: string;
  
  department?: string;
  job_title?: string;
  notification_preferences?: {
    email_notifications: boolean;
    sms_notifications: boolean;
    push_notifications: boolean;
    report_frequency: "daily" | "weekly" | "monthly";
  };
  
  // Общие метаданные
  metadata: Record<string, any> | {
    two_factor_enabled?: boolean;
    login_attempts?: number;
    timezone?: string;
    language?: string;
    [key: string]: any;
  };
};