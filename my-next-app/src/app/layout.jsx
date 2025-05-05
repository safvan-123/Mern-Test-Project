"use client";

import { createContext, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import MyNavbar from "@/components/Header";
import ProtectedRoute from "@/components/ProtectedRoute";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pagecontext = createContext();

export default function RootLayout({ children }) {
  const [pages, setpages] = useState();
  const [searchTerm, setsearchTerm] = useState("");
  const pathname = usePathname(); // get current route

  // dashboard protected routes
  const protectedRoutes = [
    "/dashboard",
    "/users",
    "/createuser",
    "/updateuser",
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <html lang="en">
      <pagecontext.Provider
        value={{ pages, setpages, searchTerm, setsearchTerm }}
      >
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <MyNavbar />
          {isProtected ? (
            <ProtectedRoute>{children}</ProtectedRoute> // wrap if protected
          ) : (
            children
          )}
        </body>
      </pagecontext.Provider>
    </html>
  );
}
export { pagecontext };
