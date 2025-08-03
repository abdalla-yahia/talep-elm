import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Header from '@/Components/Header/Header';
import Footer from '@/Components/Footer/Footer';
import StoreProvider from './StoreProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Amiri } from 'next/font/google';

const amiri = Amiri({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "الموقع الرسمي لطالب العلم الشرعي على منهج الكتاب والسنه النبوية",
  description: "الموقع الرسمي لطالب العلم الشرعي على منهج الكتاب والسنه النبوية , يحتوي على المنهج العلمي لكل طالب علم يسعى إلى الإرتقاء في  سلم طلب العلم الشرعي وفق منهج علمي على الكتاب والسنة",
  openGraph: {
    title: "الموقع الرسمي لطالب العلم الشرعي على منهج الكتاب والسنه النبوية",
    description: "الموقع الرسمي لطالب العلم الشرعي على منهج الكتاب والسنه النبوية , يحتوي على المنهج العلمي لكل طالب علم يسعى إلى الإرتقاء في  سلم طلب العلم الشرعي وفق منهج علمي على الكتاب والسنة",
    images: [
      {
        url: "/Salaf_Logo.png",
        width: 1200,
        height: 630,
        alt: "Salaf Logo",
      },
    ],
    url: "https://talep-elm.vercel.app",
    siteName: "الموقع الرسمي لطالب العلم الشرعي على منهج الكتاب والسنه النبوية",
    type: "website",
    locale: "ar_AR",

  },
  twitter: {
    card: "summary_large_image",
    title: "الموقع الرسمي لطالب العلم الشرعي على منهج الكتاب والسنه النبوية",
    description: "الموقع الرسمي لطالب العلم الشرعي على منهج الكتاب والسنه النبوية , يحتوي على المنهج العلمي لكل طالب علم يسعى إلى الإرتقاء في  سلم طلب العلم الشرعي وفق منهج علمي على الكتاب والسنة",
    images: ["/images/Title_Logo.webp"],
  },
  keywords: [
    "طالب علم شرعي",
    "المنهج العلمي",
    "طلب العلم الشرعي",
    "الكتاب والسنة",
    "علوم شرعية",
    "تعليم إسلامي",
    "الدورات العلمية",
    "منهج طالب العلم الشرعي",
    "منهج السالكين",
    "منهج السلف الصالح",
    "منهج أهل السنة والجماعة",
    "منهج أهل الحديث",
    "منهج أهل العلم",
    "العلوم الشرعيه",
    "تدريس",
    "دروس",
    "خطب",
    "محاضرات",
    "الشيخ",
  ],
  
  icons: {
    icon: "/favicon.ico",
    apple: "/icon/apple-touch-icon.png",
    shortcut: "/icon/favicon-16x16.png",
    other: [
      {
        rel: "icon",
        url: "/icon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/icon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/icon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  themeColor: "#ffffff",
  manifest: "/manifest.json",
  applicationName: "الموقع الرسمي لطالب العلم الشرعي على منهج الكتاب والسنه النبوية",
  authors: [
    {
      name: "م/ عبدالله يحيى",
      url: "https://www.linkedin.com/in/abdalla-yahia",
    },
  ],
  creator: "م/ عبدالله يحيى",
  publisher: "م/ عبدالله يحيى",
  colorScheme: "light dark",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  alternates: {
    canonical: "https://talep-elm.vercel.app",
    languages: {
      "ar": "/ar",
      "en": "/en",
    }
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "الموقع الرسمي لطالب العلم الشرعي على منهج الكتاب والسنه النبوية",
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    noimageindex: false,
    noarchive: false,
    nosnippet: false,
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ar' dir='rtl'>
      <body suppressHydrationWarning className='bg-second_background_color dark:bg-black text-text_color'>
        <StoreProvider>
          <Header />
          <div className={`${amiri.className}  min-h-fit  select-none`}>
            {children}
            </div>
          <Footer />
        </StoreProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
