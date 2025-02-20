import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Header from '@/Components/Header/Header';
import Footer from '@/Components/Footer/Footer';
import { Container, Row } from 'react-bootstrap';
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
  description: 'الموقع عبارة عن مكتبة متكاملة لطالب العلم الشرعي',
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
          <Container>
            <Row>
              <div className={`${amiri.className} min-h-screen  select-none`}>{children}</div>
            </Row>
          </Container>
          <Footer />
        </StoreProvider>
        <ToastContainer />
        <a href='https://visitorbadge.io/status?path=https%3A%2F%2Ftalep-elm.vercel.app%2F'>
          <img src='https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Ftalep-elm.vercel.app%2F&countColor=%23263759' alt='img-vesitors' width={150} height={50}/>
        </a>
      </body>
    </html>
  );
}
