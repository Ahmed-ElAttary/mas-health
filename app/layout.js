import { Inter } from "next/font/google";
import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/vela-orange/theme.css";
// import "primereact/resources/themes/arya-orange/theme.css";
// import "primereact/resources/themes/soho-dark/theme.css";

import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Health",
  description: "by Ahmed Elattary",
};

export default function RootLayout({ children }) {
  return (
    <PrimeReactProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </PrimeReactProvider>
  );
}
