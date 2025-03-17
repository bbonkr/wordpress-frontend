"use client";

import { ThemeProvider } from "next-themes";

export default function Theme({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider
      attribute="data-theme"
      enableSystem
      themes={["cerberus", "vintage"]}
      enableColorScheme
    >
      {children}
    </ThemeProvider>
  );
}
