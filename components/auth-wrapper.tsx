'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLogged') === 'true'
    const publicRoutes = ['/signin', '/signup', '/order-form']
    const isDashboardRoute =['/', '/user', '/order']
    console.log("user effect is runing !!",!isLoggedIn)
    if (!isLoggedIn && !publicRoutes.includes(pathname) && isDashboardRoute) {
      router.push('/signin')
    } else {
      setIsLoading(false)
    }
  }, [pathname, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}

