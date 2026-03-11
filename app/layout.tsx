import type { Metadata } from "next";
import { Geist_Mono, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themeProvider";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Helply — Trusted Pet Care",
  description:
    "Connect with experienced, verified pet caregivers in your area.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nunitoSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          storageKey="helply-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
