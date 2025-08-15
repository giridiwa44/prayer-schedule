import { Barlow, Roboto_Mono } from "next/font/google";
import "./globals.css";

const barlowSans = Barlow({
  variable: "--font-barlow-sans",
  weight: '400',
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  weight: '400',
  subsets: ["latin"],
});

export const metadata = {
  title: "Jadwal Sholat Real-time dengan Notifikasi",
  description: "Aplikasi jadwal sholat berbasis Next.js dengan notifikasi real-time",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${barlowSans.variable} ${robotoMono} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
