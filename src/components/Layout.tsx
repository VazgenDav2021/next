import React from "react";
import Navigation from "./Navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <header className="p-4 border-b border-gray-200">
        <div className="container mx-auto">
          <Navigation />
        </div>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="border-t border-gray-200 text-center text-gray-600">
        © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
