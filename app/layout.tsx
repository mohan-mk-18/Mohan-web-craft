import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohan's WebCraft | Fast, Affordable Single-Page Websites",
  description:
    "Freelance web developer from Salem, Tamil Nadu. I build clean, fast single-page websites for small businesses in 72 hours. Starter pricing. AI-assisted delivery.",
  keywords: [
    "freelance web developer Salem",
    "affordable website Tamil Nadu",
    "single page website India",
    "small business website Salem",
    "web developer Salem Tamil Nadu",
  ],
  openGraph: {
    title: "Mohan's WebCraft — Web Developer",
    description: "Fast single-page websites. Delivered in 72 hours.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
