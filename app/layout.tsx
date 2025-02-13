import type { Metadata } from 'next';
import { Space_Mono, Inter } from 'next/font/google';
import './globals.css';

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: '400',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Solar System',
  description: 'Demonstration of animations in the Solar System',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${spaceMono.variable} ${inter.variable} antialiased remove-scrollbar relative`}
      >
        {children}
        {modal}
      </body>
    </html>
  );
}
