import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { AuthWrapper } from "@/components/auth-wrapper"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dashboard",
  description: "A modern dashboard built with Next.js and shadcn/ui",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthWrapper>{children}</AuthWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}

