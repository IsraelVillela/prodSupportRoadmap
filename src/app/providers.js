"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="class"      // adds "class" to <html> (e.g., class="dark")
      defaultTheme="system"  // follow OS theme initially
      enableSystem={true}    // allow system theme
    >
      {children}
    </ThemeProvider>
  );
}
