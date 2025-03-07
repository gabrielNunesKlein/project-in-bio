import { Red_Hat_Display } from "next/font/google";
import "./globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";

const readHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"]
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${readHatDisplay.className} bg-background-primary text-content-body antialiased`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId="G-FYJ0K94P2M" />
    </html>
  );
}
