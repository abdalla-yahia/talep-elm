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
  title: 'طالب علم شرعي',
  description: "موقع طالب علم يقدم لك القرآن الكريم بأفضل التلاوات، بالإضافة إلى مكتبة متكاملة من الدروس والخطب العلميه. زر الآن واحصل على محتوى إسلامي مميز.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ar' dir='rtl'>
      <meta name="google-site-verification" content="c9AugZow630pVaeWVCuxRnRorLoauZc9CqyIBL9TVcA" />
      <body suppressHydrationWarning className='bg-second_background_color dark:bg-black text-text_color'>
        <StoreProvider>
          <Header />
          <main className={`${amiri.className} container min-h-fit  select-none`}>
            {children}
            </main>
          <Footer />
        </StoreProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
