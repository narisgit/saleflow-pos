
import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import AuthGuard from '@/components/auth-guard';
import { Store } from 'lucide-react';

export const metadata: Metadata = {
  title: 'SaleFlow POS',
  description: 'Efficient Sales & Inventory Management',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <AuthGuard>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                {/* Mobile Header */}
                <header className="flex h-14 items-center gap-4 border-b bg-background px-4 md:hidden">
                  <SidebarTrigger />
                  <div className="flex items-center gap-2 font-bold text-primary">
                    <Store className="h-5 w-5" />
                    <span>SaleFlow</span>
                  </div>
                </header>
                <main className="p-4 md:p-6 lg:p-8">
                  {children}
                </main>
              </SidebarInset>
            </SidebarProvider>
          </AuthGuard>
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
