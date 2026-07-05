import type { Metadata } from 'next';
import { IBM_Plex_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-primary',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ship peacefully | Shipped',
  description: 'Modern, minimal, clean, and editorial software shipment coordinator.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${ibmPlexSerif.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-secondary text-text antialiased min-h-screen selection:bg-primary selection:text-text">
        {children}
      </body>
    </html>
  );
}