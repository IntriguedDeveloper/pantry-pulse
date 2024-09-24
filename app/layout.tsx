import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react"; // Import ReactNode for typing children

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pantry Pulse",
  description: "By Ankit",
};

// Define the props type with strict typing
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Sunshiney&display=swap"
          rel="stylesheet"
        ></link>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Truculenta:opsz,wght@12..72,100..900&display=swap"
          rel="stylesheet"
        ></link>
      </head>

      <body className={inter.className}>{children}</body>
    </html>
  );
}
