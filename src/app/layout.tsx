import { AppProviders } from '@/context/AppProviders';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="h-full overflow-hidden">
        <AppProviders>{children}</AppProviders>
        <ToastContainer position="top-right" autoClose={3000} />
      </body>
    </html>
  );
}
