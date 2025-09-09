/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import Layout from "@/components/Layout";
import HeroSection from "@/components/sections/HeroSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import SuccessStoriesSection from "@/components/sections/SuccessStoriesSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import { getPageBySlug } from "@/services";
import { JSX } from "react";

const slug = "home";

// Функция для генерации метаданных страницы
export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug(slug);

  if (!page?.seo?.[0]) return {};

  const seo = page.seo[0];
  const ogImageUrl = seo.ogImage?.[0]?.url
    ? `https://steadfast-renewal-d75371361d.strapiapp.com/api${seo.ogImage[0].url}`
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

  const sectionMap: Record<
    string,
    (props: any) => JSX.Element | Promise<JSX.Element>
  > = {
    "sections.hero": (props) => <HeroSection {...props} />,
    "sections.achievements": (props) => <AchievementsSection {...props} />,
    "sections.success-stories": (props) => (
      <SuccessStoriesSection {...props} slug={slug} />
    ),
    "sections.solutions": () => <SolutionsSection slug={slug} />,
  };

  return (
    <Layout>
      {page.sections.map((section: any) => {
        const Component = sectionMap[section.__component];
        return Component ? (
          <Component key={section.id} section={section} />
        ) : null;
      })}
    </Layout>
  );
}
