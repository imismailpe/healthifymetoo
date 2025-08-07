import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Header from "@/components/Header";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "HealthyBeing",
  description: "Your path to natural wellness",
  openGraph: {
    title: "HealthyBeing",
    description: "Your path to natural wellness",
    url: "https://healthybeingonline.netlify.app/",
    type: "website",
    images: [
      {
        url: "https://healthybeingonline.netlify.app/images/bg1.jpg",
        width: 1200,
        height: 630,
        alt: "Your path to natural wellness",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
