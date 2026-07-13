import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n/request";
import { Toaster } from "react-hot-toast";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Aevon",
    default: "Aevon - Premium Software Company",
  },
  description: "Building the Future, One Digital Product at a Time. Aevon is an award-winning premium software development agency.",
  metadataBase: new URL("https://aevon.com"),
  openGraph: {
    title: "Aevon - Premium Software Company",
    description: "Building the Future, One Digital Product at a Time.",
    url: "https://aevon.com",
    siteName: "Aevon",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aevon Digital Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aevon - Premium Software Company",
    description: "Building the Future, One Digital Product at a Time.",
    creator: "@aevon",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { ThemeProvider } from "@/components/theme-provider";

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="min-h-screen bg-background text-foreground flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Toaster position="bottom-right" toastOptions={{
            style: {
              background: 'var(--toast-bg, #0a0a0a)',
              color: 'var(--toast-color, #fff)',
              border: '1px solid var(--toast-border, rgba(255,255,255,0.1))',
            }
          }} />
          <NextIntlClientProvider messages={messages}>
            <div className="noise-overlay"></div>
            <LoadingScreen />
            <SmoothScrollProvider>
              <CustomCursor />
              <Navbar />
              <main className="flex-grow pt-24">{children}</main>
              <Footer />
              <ScrollToTop />
            </SmoothScrollProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

