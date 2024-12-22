import { create } from "zustand";
import { fetchOrders } from "@/services/orderService";
const useOrderStore = create((set) => ({
  orders: [],
  fetchOrders: async () => {
    const orders = await fetchOrders();
    set({ orders });
  },
}));

export default useOrderStore;
