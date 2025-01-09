import supabase from "@/utils/supabase/client";
import { Order as OrderType } from "@/app/(dashboard)/order/types";
import { useAuth } from "@clerk/nextjs";

export const fetchOrders = async (userId:string | null,orgId:string) => {
  const { data, error } = await supabase
    .from("brown-switches-table")
    .select()
    .order("created_at", { ascending: false })
    .limit(5)
    .eq('organizationId', orgId)
    .eq('customer_id', userId)

  if (error) {
    throw new Error("Error fetching orders");
  }
  return data;
};

export const createOrder = async (order: OrderType) => {

  const { data, error } = await supabase
    .from("brown-switches-table")
    .insert({...order})
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