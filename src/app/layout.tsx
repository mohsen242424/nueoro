import type { Metadata } from "next";
import { Inter, Poppins, Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ weight: ["400", "500", "600", "700", "800", "900"], subsets: ["latin"], variable: "--font-poppins" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "NEURO | The Hashemite University",
  description: "NEURO - The Official Student Initiative at The Hashemite University, Faculty of Applied Medical Sciences. Interactive 3D Anatomy, AI Study Assistant, GPA Calculator, and Academic Services.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${manrope.variable} scroll-smooth`} suppressHydrationWarning>
      <body className={`font-inter antialiased bg-[#FAF7F5] dark:bg-[#080406] text-slate-900 dark:text-rose-100 transition-colors duration-300`}>
        <LanguageProvider>
          <ThemeProvider>
            <AuthProvider>
              <Navbar />
              <main className="min-h-screen pt-20">{children}</main>
              <Footer />
            </AuthProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
