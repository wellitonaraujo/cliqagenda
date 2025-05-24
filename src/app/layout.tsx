import { AppProviders } from '@/context/AppProviders';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="h-full overflow-hidden">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
