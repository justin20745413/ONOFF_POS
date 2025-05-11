// API Types based on the database schema

export interface User {
  user_id: number;
  username: string;
  password: string;
  phone: string;
  email: string;
  user_type: 'customer'  | 'admin' | 'pos';
  is_active: boolean;
  created_at: string;
  store_id?: number;
}

export interface PointsLog {
  id: number;
  user_id: number;
  change: number;
  source_type: 'order' | 'manual' | 'in_store';
  description: string;
  operator_id: number;
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image_url: string | null;
  is_available_online: boolean;
  is_available_in_store: boolean;
  created_at: string;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  is_available_in_store: boolean;
  created_at: string;
}

export interface Store {
  id: number;
  code: string;
  name: string;
  location: string;
  phone: string;
  description: string | null;
  open_time: string;
  close_time: string;
  is_active: boolean;
  created_at: string;
}

export interface AdminUser {
  id: number;
  username: string;
  role: 'admin' | 'manager' | 'staff';
  is_active: boolean;
  created_at: string;
}

export interface Coupon {
  id: number;
  code: string;
  description: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_amount: number;
  valid_from: string;
  valid_to: string;
  usage_limit: number;
  used_count: number;
  is_active: boolean;
  created_at: string;
}

export interface Order {
  id: number;
  user_id: number | null;
  channel: 'online' | 'store';
  store_id: number;
  coupon_id: number | null;
  total_price: number;
  status: 'pending' | 'paid' | 'cancelled' | 'refunded' | 'shipped' | 'delivered';
  created_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  item_type: 'product' | 'menu';
  item_id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface SalesReportStore {
  id: number;
  store_id: number;
  report_date: string;
  total_orders: number;
  total_revenue: number;
  total_points_used: number;
  operator_id: number;
  created_at: string;
}

export interface SalesReportStoreItem {
  id: number;
  report_id: number;
  item_type: 'product' | 'menu';
  item_id: number;
  name: string;
  quantity: number;
  total_amount: number;
}

export interface SalesReportOnline {
  id: number;
  report_date: string;
  total_orders: number;
  total_revenue: number;
  total_points_used: number;
  operator_id: number;
  created_at: string;
}

export interface SalesReportOnlineItem {
  id: number;
  report_id: number;
  order_id: number;
  item_type: 'product' | 'menu';
  item_id: number;
  name: string;
  quantity: number;
  total_amount: number;
  order_status: 'pending' | 'paid' | 'shipped' | 'delivered';
}

// API Response interfaces
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
  };
}

// Cart types for the POS system
export interface CartItem {
  id: number;
  type: 'product' | 'menu';
  name: string;
  price: number;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  customer?: User | null;
  coupon?: Coupon | null;
  notes?: string;
  pointsToUse?: number;
}

export type AnyUser = AdminUser | User;