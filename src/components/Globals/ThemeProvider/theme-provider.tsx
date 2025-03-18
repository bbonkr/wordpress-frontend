"use client";

import { ThemeProvider } from "next-themes";

export default function Theme({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider
      storageKey="mode"
      attribute="class"
      enableColorScheme
      enableSystem
      disableTransitionOnChange={false}
    >
      {children}
    </ThemeProvider>
  );
}
