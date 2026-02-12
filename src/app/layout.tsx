import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { CheckoutProvider } from '@/context/CheckoutContext';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppFooter } from '@/components/layout/AppFooter';

export const metadata: Metadata = {
  title: "CP-Pharma Valentine's Shop",
  description: 'Exclusive Valentine-themed cosmetic gift packages.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased flex flex-col h-full" suppressHydrationWarning>
        <CheckoutProvider>
          <AppHeader />
          <main className="flex-grow">{children}</main>
          <AppFooter />
          <Toaster />
        </CheckoutProvider>
      </body>
    </html>
  );
}
