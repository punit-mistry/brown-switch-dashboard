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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Order as OrderType } from "./types";
import { useCallback, useEffect, useState, useMemo } from "react";
import EditOrder from "@/components/edit-order";
import useOrderStore from "@/stores";
import { useUser, useAuth } from '@clerk/nextjs'

interface OrderStore {
  orders: OrderType[];
  fetchOrders: (userId: string | null, orgId: string) => void;
}

export default function OrderPage() {
  const { user } = useUser();
  const { orgId } = useAuth() || '';
  const { orders, fetchOrders } = useOrderStore() as OrderStore;
  const [currentStatus, setCurrentStatus] = useState<string>('ALL');

  const handleFetchOrders = useCallback(() => {
    if (user?.id && orgId) {
      fetchOrders(user.id, orgId);
    }
  }, [user?.id, orgId, fetchOrders]);

  useEffect(() => {
    handleFetchOrders();
  }, [handleFetchOrders]);

  const uniqueStatuses = useMemo(() => {
    const statuses = new Set(orders.map(order => order.order_status));
    return ['ALL', ...Array.from(statuses)];
  }, [orders]);

  const filteredOrders = useMemo(() => {
    return currentStatus === 'ALL'
      ? orders
      : orders.filter(order => order.order_status === currentStatus);
  }, [orders, currentStatus]);

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
          <Tabs onValueChange={setCurrentStatus} defaultValue="ALL">
            <TabsList className="mb-4">
              {uniqueStatuses.map((status) => (
                <TabsTrigger key={status} value={status}>
                  {status}
                </TabsTrigger>
              ))}
            </TabsList>
            {uniqueStatuses.map((status) => (
              <TabsContent key={status} value={status}>
                <OrderTable orders={filteredOrders} />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function OrderTable({ orders }: { orders: OrderType[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Update</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.customer_name}</TableCell>
            <TableCell>{order.total_price}</TableCell>
            <TableCell>{order.product}</TableCell>
            <TableCell>{order.quantity}</TableCell>
            <TableCell>{order.order_status}</TableCell>
            <TableCell><EditOrder currentOrder={order} /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

