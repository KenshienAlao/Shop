import type { Metadata } from "next";
import "./globals.css";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Shop",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ProfileProvider>
          {children}
          <Toaster position="top-center" />
        </ProfileProvider>
      </body>
    </html>
  );
}
