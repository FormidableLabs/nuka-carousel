import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nuka Demo App",
  description: "Demo application for helping develop Nuka Carousel",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
