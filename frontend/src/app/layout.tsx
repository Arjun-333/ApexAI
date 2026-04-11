import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { TelemetryProvider } from "@/context/TelemetryContext";
import QueryProvider from "@/providers/QueryProvider";
import BackgroundAtmosphere from "@/components/BackgroundAtmosphere";
import { NeuralHUD } from "@/components/NeuralHUD";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apex | Neural Fitness Interface",
  description: "Elite performance tracking and nutritional synchronization",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-background text-foreground min-h-screen selection:bg-primary selection:text-background font-sans">
        <QueryProvider>
          <ThemeProvider>
            <TelemetryProvider>
            <BackgroundAtmosphere />
            <NeuralHUD />
            <main className="relative z-10">
              {children}
            </main>
          </TelemetryProvider>
        </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
