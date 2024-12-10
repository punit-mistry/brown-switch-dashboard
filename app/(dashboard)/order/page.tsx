'use client'
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function OrderPage() {
  const orders = [
    { id: "ORD001", customer: "Olivia Martin", total: "$199.00", status: "Completed" },
    { id: "ORD002", customer: "Jackson Lee", total: "$39.00", status: "Processing" },
    { id: "ORD003", customer: "Isabella Nguyen", total: "$299.00", status: "Pending" },
    { id: "ORD004", customer: "William Kim", total: "$99.00", status: "Completed" },
    { id: "ORD005", customer: "Sofia Davis", total: "$599.00", status: "Processing" },
  ]

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
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}

