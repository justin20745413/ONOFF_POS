import { create } from 'zustand';
import { Cart, CartItem, Coupon, User } from '@/types/api';

// 購物車狀態管理介面
interface CartStore {
  cart: Cart;                    // 購物車資料
  addItem: (item: Omit<CartItem, 'quantity'>) => void;  // 新增商品
  updateItemQuantity: (itemId: number, itemType: 'product' | 'menu', quantity: number) => void;  // 更新數量
  removeItem: (itemId: number, itemType: 'product' | 'menu') => void;  // 移除商品
  setCustomer: (customer: User | null) => void;  // 設定客戶
  setCoupon: (coupon: Coupon | null) => void;    // 設定優惠券
  setPointsToUse: (points: number) => void;      // 設定使用點數
  clearCart: () => void;                         // 清空購物車
  getSubtotal: () => number;                     // 計算小計
  getDiscount: () => number;                     // 計算折扣
  getTotal: () => number;                        // 計算總計
  setNotes: (notes: string) => void;             // 設定備註
}

// 創建購物車狀態管理
export const useCartStore = create<CartStore>((set, get) => ({
  // 初始購物車狀態
  cart: {
    items: [],
    customer: null,
    coupon: null,
    pointsToUse: 0,
    notes: '',
  },
  
  // 新增商品到購物車
  addItem: (item) => {
    set((state) => {
      const existingItemIndex = state.cart.items.findIndex(
        (i) => i.id === item.id && i.type === item.type
      );
      
      if (existingItemIndex !== -1) {
        // 商品已存在，增加數量
        const updatedItems = [...state.cart.items];
        updatedItems[existingItemIndex].quantity += 1;
        
        return {
          cart: {
            ...state.cart,
            items: updatedItems,
          }
        };
      } else {
        // 新商品，數量設為 1
        return {
          cart: {
            ...state.cart,
            items: [...state.cart.items, { ...item, quantity: 1 }],
          }
        };
      }
    });
  },
  
  // 更新商品數量
  updateItemQuantity: (itemId, itemType, quantity) => {
    set((state) => {
      const updatedItems = state.cart.items.map((item) => {
        if (item.id === itemId && item.type === itemType) {
          return { ...item, quantity };
        }
        return item;
      });
      
      return {
        cart: {
          ...state.cart,
          items: updatedItems,
        }
      };
    });
  },
  
  // 移除商品
  removeItem: (itemId, itemType) => {
    set((state) => ({
      cart: {
        ...state.cart,
        items: state.cart.items.filter(
          (item) => !(item.id === itemId && item.type === itemType)
        ),
      }
    }));
  },
  
  // 設定客戶
  setCustomer: (customer) => {
    set((state) => ({
      cart: {
        ...state.cart,
        customer,
      }
    }));
  },
  
  // 設定優惠券
  setCoupon: (coupon) => {
    set((state) => ({
      cart: {
        ...state.cart,
        coupon,
      }
    }));
  },
  
  // 設定使用點數
  setPointsToUse: (points) => {
    set((state) => ({
      cart: {
        ...state.cart,
        pointsToUse: points,
      }
    }));
  },
  
  // 設定備註
  setNotes: (notes) => {
    set((state) => ({
      cart: {
        ...state.cart,
        notes,
      }
    }));
  },
  
  // 清空購物車
  clearCart: () => {
    set({
      cart: {
        items: [],
        customer: null,
        coupon: null,
        pointsToUse: 0,
        notes: '',
      }
    });
  },
  
  // 計算小計
  getSubtotal: () => {
    const { items } = get().cart;
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },
  
  // 計算折扣
  getDiscount: () => {
    const { cart } = get();
    const subtotal = get().getSubtotal();
    let discount = 0;
    
    // 計算優惠券折扣
    if (cart.coupon) {
      if (cart.coupon.discount_type === 'percentage') {
        discount += subtotal * (cart.coupon.discount_value / 100);
      } else {
        discount += cart.coupon.discount_value;
      }
    }
    
    // 計算點數折扣（假設 1 點 = 1 元）
    if (cart.pointsToUse && cart.pointsToUse > 0) {
      discount += cart.pointsToUse;
    }
    
    return discount;
  },
  
  // 計算總計
  getTotal: () => {
    const subtotal = get().getSubtotal();
    const discount = get().getDiscount();
    return Math.max(subtotal - discount, 0); // 確保總計不會為負數
  }
}));