import React from "react";

interface HeroSectionProps {
  section: any;
}

export default function HeroSection({ section }: HeroSectionProps) {
  return (
    <section
      className="w-full h-[600px] bg-cover bg-center flex items-center"
      style={{
        backgroundImage: `url("https://steadfast-renewal-d75371361d.strapiapp.com/api${section.backgroundImage?.url}")`,
      }}>
      <div className="container mx-auto px-4">
        {section.showTitle && (
          <h2 className="text-3xl max-w-100 font-bold mb-4 text-black">
            {section.title}
          </h2>
        )}
        {section.showText && (
          <p className="mb-4 text-black max-w-3xl">{section.text}</p>
        )}
        {section.showButton &&
          section.button?.length &&
          section.button.map((el: any) => (
            <a
              key={el.href}
              href={el.href}
              className="inline-block px-6 py-3 bg-orange-400 text-white font-semibold rounded transition">
              {el.label}
            </a>
          ))}
      </div>
    </section>
  );
}
