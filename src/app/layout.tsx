import { draftMode } from "next/headers";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import Navigation from "@/components/Globals/Navigation/Navigation";
import { PreviewNotice } from "@/components/Globals/PreviewNotice/PreviewNotice";
import Theme from "@/components/Globals/ThemeProvider/theme-provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

import "@/app/globals.css";
import "@/app/prism.css";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode();

  const mediaUrl = process.env.NEXT_PUBLIC_MEDIA_URL;
  /* 
    <meta name="apple-mobile-web-app-title" content="VoTogether" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="#BE0000" />
  */

  const appleTouchIconSizes = [57, 60, 72, 76, 114, 120, 144, 152, 180];
  const iconSizes = [192, 32, 96, 16];

  const gaId = process.env.GA_ID ?? "";
  const clarityId = process.env.CLARITY_ID ?? "";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {gaId && (
          <link rel="preconnect" href="https://www.googletagmanager.com" />
        )}
        {clarityId && <link rel="preconnect" href="https://www.clarity.ms" />}
        {mediaUrl && (
          <>
            <link rel="preconnect" href={mediaUrl} />
            {appleTouchIconSizes.map((s) => (
              <link
                key={`apple-touch-icon-size-${s}`}
                rel="apple-touch-icon"
                sizes={`${s}x${s}`}
                type="image/png"
                href={`${mediaUrl}/wordpress/bbon-icon-${s}.png`}
              />
            ))}
            {iconSizes.map((s) => (
              <link
                key={`icon-size-${s}`}
                rel="icon"
                sizes={`${s}x${s}`}
                type="image/png"
                href={`${mediaUrl}/wordpress/bbon-icon-${s}.png`}
              />
            ))}
          </>
        )}
      </head>
      <body className={inter.className}>
        <Theme>
          <NextTopLoader />
          <div className="flex flex-col min-h-screen">
            {isEnabled && <PreviewNotice />}
            <Navigation />
            {children}
          </div>
        </Theme>
        <Analytics />
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
      {clarityId && (
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `}
        </Script>
      )}
    </html>
  );
}
