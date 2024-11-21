import HeaderAuth from "@/src/components/header-auth";
import { ThemeSwitcher } from "@/src/components/theme-switcher";
import Navbar from "@/src/components/navbar";
import MainFooter from "@/src/components/footer";
import { HeartIcon, LockClosedIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";

import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              <Navbar />

              <div className="container flex flex-col gap-20 mt-16 px-0">
                {children}
              </div>
              <MainFooter />

            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
