import "./globals.css";
import BottomNavigation from "../components/layout/BottomNavigation/BottomNavigation";
import ThemeProvider from "@/components/layout/theme-provider/theme-provider";
import Header from "@/components/layout/header/Header";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/layout/footer/Footer";

export const metadata = {
  title: "خدمات بهشت زهرا | رزرو آنلاین گل، تاج گل، میز و صندلی",
  description:
    "سفارش و رزرو آنلاین تمامی خدمات بهشت زهرا شامل تاج گل، سبد گل، میز و صندلی و سایر خدمات مراسم ختم با پشتیبانی و تحویل مطمئن.",
  verification: {
    google: "kxQXx9H3aseOu-3r5_e-rKLKjFePawMkD8d0ZT9iUMc",
  },
  metadataBase: new URL("https://amorz.ir"),
  alternates: {
    canonical: "https://amorz.ir",
  },
  openGraph: {
    title: "خدمات بهشت زهرا | رزرو آنلاین خدمات",
    description:
      "رزرو آنلاین خدمات بهشت زهرا؛ گل، تاج گل، میز و صندلی و سایر خدمات مراسم.",
    url: "https://amorz.ir",
    siteName: "خدمات بهشت زهرا",
    images: [
      {
        url: "/images/haven.jpg", // با metadataBase میشه آدرس کامل
        width: 1200,
        height: 630,
        alt: "خدمات بهشت زهرا", 
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "خدمات بهشت زهرا",
    description:
      "تمامی خدمات بهشت زهرا را به صورت آنلاین رزرو کنید.",
    images: ["/images/haven.jpg"],
    // اگر توییتر نداری می‌تونی creator رو کلاً حذف کنی
    // creator: "@yourTwitterHandle",
  },
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

