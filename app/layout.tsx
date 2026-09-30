import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { SiteShell } from "@/components/layout/site-shell";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const heading = Plus_Jakarta_Sans({
  variable: "--font-heading-family",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sirsa-SaaS — Complete Business Management Software",
  description:
    "Manage stock, billing, customers, suppliers, employees, and multiple businesses from one dashboard.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${heading.variable} h-full scroll-smooth antialiased`}
      // when themeInitScript is executed, it will add the dark class to the html element and below will be class
      // class="__variable_abc __variable_xyz __variable_heading h-full scroll-smooth antialiased dark"
      suppressHydrationWarning 
    >
      <body className="flex min-h-full flex-col">
        <Script id="theme-init" 
          strategy="beforeInteractive" //Runs themeInitScipt function before the page is rendered
        >
          {/* Why calling themeInitScript function here?
          themeInitScript function is used to initialize the theme of the page.
          It is called before the page is rendered so that the theme is initialized before the page is rendered.
          It is also used to add the dark class to the html element so that the theme is initialized before the page is rendered.
          */}
          {themeInitScript}  
        </Script>

        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
