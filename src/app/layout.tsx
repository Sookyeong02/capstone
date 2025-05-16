import '@/styles/globals.css';
import { pretendard } from './fonts';
import type { Metadata } from 'next';
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'BuildFolio',
  description: '포트폴리오 플랫폼',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
