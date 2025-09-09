/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { getSiteSettings } from "@/services";

export default async function Navigation() {
  const settings = await getSiteSettings();

  if (!settings) return null;

  return (
    <nav className="flex justify-between items-center py-4">
      {/* Логотип */}
      <div>
        {settings.logo && (
          <img
            src={`https://steadfast-renewal-d75371361d.media.strapiapp.com/api${settings.logo.url}`}
            alt={settings.logo.alternativeText || "Logo"}
            className="h-8 object-contain"
          />
        )}
      </div>

      {/* Навигация */}
      <ul className="flex gap-6">
        {settings.mainNav.map((item: any) => (
          <li key={item.id}>
            <a
              href={item.href}
              className="text-gray-700 hover:text-blue-600 transition-colors">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
