import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrolling } from "@/components/layout/SmoothScrolling";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bombino Express — International Courier Services from India",
  description:
    "India's trusted international courier since 1995. Air, sea, and express delivery to USA, UK, UAE, Canada, Australia, and 150+ countries worldwide.",
  keywords: [
    "international courier",
    "India courier",
    "express delivery",
    "air freight",
    "ocean freight",
    "ecommerce shipping",
  ],
  openGraph: {
    title: "Bombino Express — International Courier Services from India",
    description:
      "India's trusted international courier since 1995. Get a rate in seconds.",
    url: "https://www.bombinoexp.com",
    siteName: "Bombino Express",
    locale: "en_IN",
    type: "website",
  },
}

export const viewport: Viewport = {
  themeColor: "#112330",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="flex flex-col min-h-full bg-freight-paper text-foreground">
        <SmoothScrolling>
          <Header />
          <main id="main-content" className="flex-1 w-full min-w-0">
            {children}
          </main>
          <Footer />
        </SmoothScrolling>
      </body>
    </html>
  );
}
