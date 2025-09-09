/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { getSolutionsSection } from "@/services";
import React from "react";

interface SolutionsSectionProps {
  slug: string;
}

export default async function SolutionsSection({
  slug,
}: SolutionsSectionProps) {
  const solutions = await getSolutionsSection(slug);

  if (!solutions) return null;

  return (
    <section className="py-8 bg-white text-black">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">
          {solutions.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {solutions.cards.map((card) => {
            return (
              <div
                key={card.id}
                className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition">
                  <img
                    src={`https://steadfast-renewal-d75371361d.strapiapp.com/api${card.media?.[0].image.url}`}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                <p>{card.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
