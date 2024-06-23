// layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import NavBar from "@/components/navbar";
import { Providers } from "@/app/providers";
import type { FC, PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CYD - LRMS",
  description: "Silicon Society Project Scaffold",
};

const RootLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta name="description" content="Silicon Society Project Scaffold" />
        <title>Code Your Dreams LRMS</title>
      </head>
      <body
        className={`mx-auto min-h-screen justify-center w-full ${inter.className}`}
      >
        <Providers>
          <NavBar />
          <div className="p-8">{children}</div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;