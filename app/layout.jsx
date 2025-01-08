import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from 'next/font/google'
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Dashboard',
  description: 'Order tracking and inventory management',
}
export default function RootLayout({
  children,
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}