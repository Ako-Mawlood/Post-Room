import type { Metadata } from "next";
import "../globals.css";
import Navbar from "../components/Navbar";
export const metadata: Metadata = {
  title: "Welcome | Post-Room",
  description: "Generated by create next app",
};

export default function MainPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-background text-foreground selection:bg-foreground selection:text-background">
      <Navbar />
      {children}
    </div>
  );
}
