import { draftMode } from "next/headers";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import "@/app/globals.css";
import "@/app/prism.css";

import Navigation from "@/components/Globals/Navigation/Navigation";
import { PreviewNotice } from "@/components/Globals/PreviewNotice/PreviewNotice";
import Theme from "@/components/Globals/ThemeProvider/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode();

  return (
    <html lang="en" data-theme="cerberus" suppressHydrationWarning>
      <body className={inter.className}>
        <NextTopLoader />
        <Theme>
          <div className="flex flex-col min-h-screen">
            {isEnabled && <PreviewNotice />}
            <Navigation />
            {children}
          </div>
        </Theme>
      </body>
    </html>
  );
}
