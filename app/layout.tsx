import ToasterProvider from '@/components/ToastProvider/ToasterProvider';
import './globals.css'
import { Metadata } from 'next'
import Navbar from '@/components/NavigationBar/Navbar';
import getCurrentUser from '@/lib/getCurrentUser';
import Providers from '@/lib/SessionProvider';

export const metadata: Metadata = {
  title: 'Check Returns',
  icons: {
    icon: '/logo.png'
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  return (
    <Providers>
      <html lang="en">
        <body>
          <ToasterProvider />
          <Navbar currentUser={user} />
          {children}
        </body>
      </html>
    </Providers>
  )
}
