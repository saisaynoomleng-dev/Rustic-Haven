import type { Metadata } from 'next';
import './globals.css';
import { garamond, montserrat } from '@/lib/font';

export const metadata: Metadata = {
  title: {
    template: '%s | Rustic Haven',
    default: 'Rustic Haven',
  },
  description:
    'Discover Rustic Haven — a modern platform for renting residential and commercial spaces in Atlantica. Real-time availability, secure bookings, and seamless online payments.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${garamond.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
