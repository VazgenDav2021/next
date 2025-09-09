/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import Layout from "@/components/Layout";
import HeroSection from "@/components/sections/HeroSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import SuccessStoriesSection from "@/components/sections/SuccessStoriesSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import { getPageBySlug } from "@/services";

const slug = "home";

// Генерация метаданных страницы
export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug(slug);

  if (!page?.seo?.[0]) return {};

  const seo = page.seo[0];
  const ogImageUrl = seo.ogImage?.[0]?.url
    ? `https://steadfast-renewal-d75371361d.strapiapp.com${seo.ogImage[0].url}`
    : undefined;

  return {
    title: seo.metaTitle || seo.ogTitle || "",
    description: seo.metaDescription || seo.ogDescription || "",
    openGraph: {
      title: seo.ogTitle || seo.metaTitle || "",
      description: seo.ogDescription || seo.metaDescription || "",
      images: ogImageUrl ? [{ url: ogImageUrl }] : [],
    },
    robots: {
      index: !seo.noindex,
      follow: !seo.nofollow,
    },
    alternates: {
      canonical: seo.canonicalURL || undefined,
    },
  };
}

export default async function HomePage() {
  const page = await getPageBySlug(slug);

  if (!page) {
    return (
      <Layout>
        <p>Страница не найдена</p>
      </Layout>
    );
  }

  // Вместо функций храним ссылки на компоненты
  const sectionMap: Record<string, React.ComponentType<any>> = {
    "sections.hero": HeroSection,
    "sections.achievements": AchievementsSection,
    "sections.success-stories": SuccessStoriesSection,
    "sections.solutions": SolutionsSection,
  };

  return (
    <Layout>
      {page.sections.map((section: any) => {
        const Component = sectionMap[section.__component];
        if (!Component) return null;

        // Для success-stories пробрасываем slug дополнительно
        if (section.__component === "sections.success-stories") {
          return <Component key={section.id} section={section} slug={slug} />;
        }

        // Для solutions пробрасываем только slug
        if (section.__component === "sections.solutions") {
          return <Component key={section.id} slug={slug} />;
        }

        // Для hero и achievements пробрасываем только section
        return <Component key={section.id} section={section} />;
      })}
    </Layout>
  );
}
