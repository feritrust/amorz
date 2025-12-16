import "./globals.css";
import BottomNavigation from "../components/layout/BottomNavigation/BottomNavigation";
import ThemeProvider from "@/components/layout/theme-provider/theme-provider";
import Header from "@/components/layout/header/Header";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/layout/footer/Footer";

export const metadata = {
  metadataBase: new URL("https://amorz.ir"),

  title: {
    default: "خدمات بهشت زهرا",
    template: "%s | خدمات بهشت زهرا",
  },

  description:
    "سفارش و رزرو آنلاین خدمات بهشت زهرا شامل تاج گل، سبد گل، میز و صندلی و سایر خدمات مراسم.",

  verification: {
    google: "kxQXx9H3aseOu-3r5_e-rKLKjFePawMkD8d0ZT9iUMc",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    siteName: "خدمات بهشت زهرا",
    locale: "fa_IR",
    type: "website",
    images: [{ url: "/images/haven.jpg", width: 1200, height: 630, alt: "خدمات بهشت زهرا" }],
  },

  twitter: {
    card: "summary_large_image",
    images: ["/images/haven.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};



export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="font-iranYekan antialiased flex flex-col min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <Toaster />
          <main className="flex-grow">{children}</main>
          <Footer />
          <BottomNavigation />
        </ThemeProvider>
      </body>
    </html>
  );
}

