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
      <body>
        <Header />
        <main className="bg-gray-200 font-mono">
          <Provider store={store}>{children}</Provider>
        </main>
      </body>
    </html>
  );
}
