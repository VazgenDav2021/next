 
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSuccessStoriesCards } from "@/services";
import React from "react";

interface SuccessStoriesSectionProps {
  section: any;
  slug: string;
}

interface SuccessStoryCard {
  id: string | number;
  logo: Array<{
    image?: {
      url?: string;
    };
  }>;
  title?: string;
  text?: string;
}

export default async function SuccessStoriesSection({
  section,
  slug,
}: SuccessStoriesSectionProps) {
  const cards: SuccessStoryCard[] = await getSuccessStoriesCards(slug);

  return (
    <section key={Date.now()} className="py-8 bg-gray-100 text-black">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">{section.title}</h2>

        {cards.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {cards.map((card: SuccessStoryCard) => {
              const bgImage =
                card.logo.length > 0
                  ? `url("https://steadfast-renewal-d75371361d.media.strapiapp.com/api${card.logo[0]?.image?.url}")`
                  : "none";

              return (
                <div
                  key={card.title}
                  className="relative rounded-lg shadow overflow-hidden flex items-center justify-center h-64"
                  style={{
                    backgroundImage: bgImage,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}>
                  <div className="bg-white/80 p-6 rounded-lg text-center max-w-[90%]">
                    {card.title && (
                      <h3 className="font-bold text-lg mb-2 text-black">
                        {card.title}
                      </h3>
                    )}
                    {card.text && <p className="text-black">{card.text}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p>Нет карточек</p>
        )}
      </div>
    </section>
  );
}
