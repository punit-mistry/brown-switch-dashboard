import supabase from "@/utils/supabase/client";
import { Order as OrderType } from "@/app/(dashboard)/order/types";

export const fetchOrders = async () => {
  const { data, error } = await supabase
    .from("brown-switches-table")
    .select()
    .order("created_at", { ascending: false })
    .limit(5)
    .select();

  if (error) {
    throw new Error("Error fetching orders");
  }
  return data;
};

export const createOrder = async (order: OrderType) => {
  const { data, error } = await supabase
    .from("brown-switches-table")
    .insert(order)
    .select();

  if (error) {
    throw new Error("Error creating order");
  }
  return data;
};

export const updateOrder = async (order: OrderType) => {
  const { data, error } = await supabase
    .from("brown-switches-table")
    .update(order)
    .select();

  if (error) {
    throw new Error("Error updating order");
  }
  return data;
};