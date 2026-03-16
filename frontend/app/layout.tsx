import type { Metadata } from "next";
import "./globals.css";
import { ProfileProvider } from "./contexts/ProfileContext";
export const metadata: Metadata = {
  title: "Shop",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <ProfileProvider>
        <body className="antialiased">
          {children}
        </body>
      </ProfileProvider>

    </html>
  );
}
