import type { Metadata } from "next";
import "@/styles/globals.css";
// import Footer from "@/app/(public)/_components/Footer";
// import BottomNav from "@/app/(public)/_components/BottomNav";
import TopNav from "./_components/TopNav";
import Footer from "./_components/Footer";
import BottomNav from "./_components/BottomNav";

export const metadata: Metadata = {
  title: "Netron",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopNav />
      <div className="container prose min-w-full py-20">{children}</div>
      <Footer />
      <BottomNav />
    </>
  );
}
