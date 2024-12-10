'use client'
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UserPage() {
  const users = [
    { name: "Olivia Martin", email: "olivia.martin@email.com", role: "Admin" },
    { name: "Jackson Lee", email: "jackson.lee@email.com", role: "User" },
    { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", role: "User" },
    { name: "William Kim", email: "william.kim@email.com", role: "User" },
    { name: "Sofia Davis", email: "sofia.davis@email.com", role: "User" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={`/avatars/0${index + 1}.png`} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="ml-auto">
                  <p className="text-sm text-gray-500">{user.role}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

