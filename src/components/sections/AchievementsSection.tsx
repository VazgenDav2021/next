import React from "react";

interface AchievementsSectionProps {
  section: any;
}

export default function AchievementsSection({
  section,
}: AchievementsSectionProps) {
  return (
    <section className="p-8 rounded-lg bg-gray-800 text-white mb-6">
      <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
      {section.cards?.length ? (
        <div className="grid md:grid-cols-3 gap-6">
          {section.cards.map((card: any) => (
            <div key={card.id} className="bg-gray-700 p-4 rounded-lg shadow">
              {card.title && (
                <h3 className="font-bold text-lg mb-2">{card.title}</h3>
              )}
              {card.text && <p>{card.text}</p>}
            </div>
          ))}
        </div>
      ) : (
        <p>Нет достижений</p>
      )}
    </section>
  );
}
