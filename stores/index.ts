import { create } from "zustand";
import { fetchOrders } from "@/services/orderService";
import { Order } from "@/app/(dashboard)/order/types";

interface OrderStore {
  orders: Order[];
  fetchOrders: (userId:string | null,orgId:string) => Promise<void>;
  updateOrder: (updatedOrder: Order) => void;
}

const useOrderStore = create((set) => ({
  orders: [],
  fetchOrders: async (userId:string | null,orgId:string) => {
    const orders = await fetchOrders(userId,orgId);
    set({ orders });
  },
  updateOrder: (updatedOrder:Order) => {
    set((state:OrderStore) => ({
      orders: state.orders.map((order) =>
        order.id === updatedOrder.id ? { ...order, ...updatedOrder } : order
      ),
    }));
  },
}));

export default useOrderStore;
