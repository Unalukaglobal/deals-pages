import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Unaluka Deals - Las Mejores Ofertas de Internet",
    template: "%s | Unaluka Deals",
  },
  description:
    "Encuentra las mejores ofertas curadas de internet. Tecnologia, gaming, audio y mas con precios en soles peruanos y envio a Peru.",
  openGraph: {
    title: "Unaluka Deals - Las Mejores Ofertas de Internet",
    description:
      "Ofertas curadas de tecnologia, gaming, audio y mas. Precios en soles con envio a Peru.",
    siteName: "Unaluka Deals",
    type: "website",
  },
  icons: {
    icon: "/icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
