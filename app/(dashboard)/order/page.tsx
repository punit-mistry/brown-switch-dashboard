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
import { Order as OrderType } from "./types";
import { useCallback, useEffect } from "react";
import EditOrder from "@/components/edit-order";
import useOrderStore from "@/stores";
import { useUser,useAuth } from '@clerk/nextjs'
interface OrderStore {
  orders: OrderType[];
  fetchOrders: (userId:string | null,orgId:string) => void;
}
export default function OrderPage() {
  const { user } =  useUser()
  const { orgId } = useAuth() || ''
  // const [orders, setOrders] = useState<OrderType[]>([]);
  const { orders , fetchOrders } = useOrderStore()as OrderStore;

  const handleFetchOrders = useCallback(() => {
    if (user?.id && orgId) {
      fetchOrders(user.id, orgId);
    }
  }, [user?.id, orgId, fetchOrders]);

  useEffect(() => {
    handleFetchOrders();
  }, [handleFetchOrders]);
  

  const handleOrderUpdate = () => {
    // setOrders((prevOrders) =>
    //   prevOrders.map((order) =>
    //     order.id === updatedOrder.id ? updatedOrder : order
    //   )
    // );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Orders for {user?.firstName}</h1>
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
              {orders?.map((order) => (
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
