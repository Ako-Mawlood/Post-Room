import type { Metadata } from "next";
import "./globals.css";
import TanstackProvider from "./providers/TanstackProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { Toaster } from "@/app/components/ui/toaster";
export const metadata: Metadata = {
  title: "Welcome | Post-Room",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          ></meta>
        </head>
        <body className="bg-background text-foreground selection:bg-foreground selection:text-background">
          <TanstackProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              {children}
            </ThemeProvider>
          </TanstackProvider>
        </body>
      </html>
    </>
  );
}
