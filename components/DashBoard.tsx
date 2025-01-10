"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import supabase from '@/utils/supabase/client'
import { OrderStatus } from '@/app/(dashboard)/order-form/types'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface Order {
  id: string
  customer_name: string
  product: string
  quantity: number
  total_price: number
  order_status: OrderStatus
  created_at: string
}

interface Product {
  id: string
  name: string
  price: number
  inStock: boolean
}

interface RevenueData {
  date: string
  revenue: number
}

export default function DashboardPage() {
  const [totalOrders, setTotalOrders] = useState<number | null>(null)
  const [totalRevenue, setTotalRevenue] = useState<number | null>(null)
  const [productsInStock, setProductsInStock] = useState<number | null>(null)
  const [recentOrders, setRecentOrders] = useState<Order[] | null>(null)
  const [topProducts, setTopProducts] = useState<{ name: string, total: number }[] | null>(null)
  const [revenueData, setRevenueData] = useState<RevenueData[] | null>(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  async function fetchDashboardData() {
    // Fetch total orders and revenue
    const { data: orderData, error: orderError } = await supabase
      .from('brown-switches-table')
      .select('total_price, created_at')

    if (orderError) {
      console.error('Error fetching orders:', orderError)
    } else {
      setTotalOrders(orderData.length)
      setTotalRevenue(orderData.reduce((sum, order) => sum + order.total_price, 0))

      // Process revenue data for the graph
      const revenueByDate = orderData.reduce((acc, order) => {
        const date = new Date(order.created_at).toISOString().split('T')[0]
        acc[date] = (acc[date] || 0) + order.total_price
        return acc
      }, {} as Record<string, number>)

      const sortedRevenueData = Object.entries(revenueByDate)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, revenue]) => ({ date, revenue }))

      setRevenueData(sortedRevenueData)
    }

    // Fetch products in stock
    const { data: productData, error: productError } = await supabase
      .from('products')
      .select('inStock')
      .eq('inStock', true)

    if (productError) {
      console.error('Error fetching products:', productError)
    } else {
      setProductsInStock(productData.length)
    }

    // Fetch recent orders
    const { data: recentOrderData, error: recentOrderError } = await supabase
      .from('brown-switches-table')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)

    if (recentOrderError) {
      console.error('Error fetching recent orders:', recentOrderError)
    } else {
      setRecentOrders(recentOrderData)
    }

    // Fetch top selling products
    const { data: topProductData, error: topProductError } = await supabase
      .from('brown-switches-table')
      .select('product, quantity')

    if (topProductError) {
      console.error('Error fetching top products:', topProductError)
    } else {
      const productCounts = topProductData.reduce((acc, order) => {
        acc[order.product] = (acc[order.product] || 0) + order.quantity
        return acc
      }, {} as Record<string, number>)

      const sortedProducts = Object.entries(productCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([name, total]) => ({ name, total }))

      setTopProducts(sortedProducts)
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {totalOrders === null ? (
              <Skeleton className="h-8 w-[100px]" />
            ) : (
              <div className="text-2xl font-bold">{totalOrders}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            {totalRevenue === null ? (
              <Skeleton className="h-8 w-[100px]" />
            ) : (
              <div className="text-2xl font-bold">₹{totalRevenue.toFixed(2)}</div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products in Stock</CardTitle>
          </CardHeader>
          <CardContent>
            {productsInStock === null ? (
              <Skeleton className="h-8 w-[100px]" />
            ) : (
              <div className="text-2xl font-bold">{productsInStock}</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Growth</CardTitle>
        </CardHeader>
        <CardContent>
          {revenueData === null ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {recentOrders === null ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.customer_name}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>₹{order.total_price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={order.order_status === OrderStatus.PLACED ? "default" : "secondary"}>
                        {order.order_status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          {topProducts === null ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Total Quantity Sold</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

