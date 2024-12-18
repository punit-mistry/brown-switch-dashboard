"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", total: 1500 },
  { name: "Feb", total: 3200 },
  { name: "Mar", total: 1600 },
  { name: "Apr", total: 3800 },
  { name: "May", total: 3600 },
  { name: "Jun", total: 4200 },
  { name: "Jul", total: 3400 },
  { name: "Aug", total: 2200 },
  { name: "Sep", total: 1400 },
  { name: "Oct", total: 1800 },
  { name: "Nov", total: 4800 },
  { name: "Dec", total: 3600 },
]

export function OverviewChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="total" fill="#000000" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

