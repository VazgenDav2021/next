/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/app/lib/axios";
import { PageData, StrapiResponse } from "@/types/strapi";

export async function getPageBySlug(slug: string) {
  const res = await api.get<StrapiResponse<PageData>>(
    `/pages?filters[slug][$eq]=${slug}&populate[seo][populate]=*&populate[sections][populate]=*&populate`
  );
  
  return res.data.data[0];
}

/**
 * Получить все logo из секции success-stories
 */
export async function getSuccessStoriesCards(slug: string) {
  const res = await api.get(
    `/pages?filters[slug][$eq]=${slug}` +
      `&populate[sections][on][sections.success-stories][populate][cards][populate][logo][populate]=*`
  );

  const page = res.data.data[0];
  if (!page) return [];

  const successSection = page.sections?.find(
    (sec: any) => sec.__component === "sections.success-stories"
  );

  if (!successSection?.cards) return [];

  return successSection.cards.map((card: any) => ({
    id: card.id,
    title: card.title,
    text: card.text,
    logo: card.logo || [], // массив логотипов с медиа-данными
  }));
}

export async function getSolutionsSection(slug: string) {
  const res = await api.get(
    `/pages?filters[slug][$eq]=${slug}` +
      `&populate[sections][on][sections.solutions][populate][cards][populate][media][populate]=*`
  );

  const page = res.data.data[0];
  if (!page) return null;

  const section = page.sections?.find(
    (sec: any) => sec.__component === "sections.solutions"
  );

  if (!section) return null;

  return {
    title: section.title,
    cards:
      section.cards?.map((card: any) => ({
        id: card.id,
        title: card.title,
        text: card.text,
        media: card.media || [], // массив с медиа и alt
      })) || [],
  };
}



export async function getSiteSettings() {
  const res = await api.get(
    `/site-setting?populate[brandLogo][populate]=*&populate[mainNav][populate]=*`
  );

  if (!res.data?.data) return null;

  const settings = res.data.data;

  return {
    logo: settings.brandLogo?.[0] || null,
    mainNav: settings.mainNav || [],
  };
}
