import { ToastContainer } from "react-toastify";
import "./global.css"
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'Campus Click',
  description: 'Sistema de reserva de salas e laboratórios',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={roboto.className}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}