import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adi Prasad",
  description: "Personal website of Adi Prasad",
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png' }],
    apple: [{ url: '/icon.png', type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
