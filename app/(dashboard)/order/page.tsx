"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import supabase from "@/utils/supabase/client";
import { Order as OrderType } from "./types";
import { useEffect, useState } from "react";
import EditOrder from "@/components/edit-order";
export default function OrderPage() {
  const { toast } = useToast();
  const [allOrders, setOrders] = useState<OrderType[]>([]);
  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("brown-switches-table")
      .select()
      .order("created_at", { ascending: false })
      .limit(5)
      .select();

    if (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
      return;
    }
    setOrders(data);
    console.log("Orders:", data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOrderUpdate = (updatedOrder: OrderType) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Orders</h1>
        <Button asChild>
          <Link href="/order-form">New Order</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Update </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allOrders?.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer_name}</TableCell>
                  <TableCell>{order.total_price}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.order_status}</TableCell>
                  <TableCell ><EditOrder currentOrder={order} onOrderUpdate={handleOrderUpdate}/> </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}
