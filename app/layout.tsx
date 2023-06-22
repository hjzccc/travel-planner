"use client";
import { Provider } from "react-redux";
import "./globals.css";
import store from "@/store/store";
import Header from "@/components/header";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-200">
        <Header />
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
