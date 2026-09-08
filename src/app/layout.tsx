import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sans = localFont({
  src: [
    {
      path: "../../public/fonts/dm-sans-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/dm-sans-semibold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});
const hand = localFont({
  src: "../../public/fonts/caveat-semibold.ttf",
  variable: "--font-hand",
  display: "swap",
});
const script = localFont({
  src: "../../public/fonts/nothing-you-could-do.ttf",
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Faiz Hashim — Websites + useful systems",
  description:
    "Fresh Information Content Management graduate from UiTM. I build simple websites and useful business systems, with Codex along the way.",
  icons: {
    icon: "/icon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body className={`${sans.variable} ${hand.variable} ${script.variable}`}>
        {children}
      </body>
    </html>
  );
}
