/* eslint-disable @typescript-eslint/no-explicit-any */
export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
}

export interface SeoMeta {
  id: number;
  metaTitle: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: StrapiImage[]; // Strapi возвращает массив медиа, а не один объект
  canonicalURL?: string;
  noindex?: boolean;
  nofollow?: boolean;
  metaJSONLD?: Record<string, any> | null;
}


export interface HeroButton {
  id: number;
  label: string;
  href: string;
  newTab: boolean;
  hidden: boolean;
}

export interface HeroBackground {
  id: number;
  alt?: string;
  hidden?: boolean;
  image?: StrapiImage[];
}

export interface HeroSection {
  id: number;
  __component: "sections.hero";
  backgroundColor?: string;
  title?: string;
  text?: string;
  showTitle?: boolean;
  showText?: boolean;
  showButton?: boolean;
  hidden?: boolean;
  background?: HeroBackground[];
  button?: HeroButton[];
}

export interface Card {
  id: number;
  title?: string;
  text?: string;
  hidden?: boolean;
  media?: StrapiImage[];
}

export interface Sollutions {
  id: number;
  __component: "sections.solutions";
  title?: string;
  hidden?: boolean;
  cards?: Card[];
}

export interface SolutionCard {
  id: number;
  title: string;
  text: string;
  image: StrapiImage;
}

export interface SolutionsSection {
  id: number;
  __component: "sections.solutions";
  title: string;
  hidden?: boolean;
  cards: SolutionCard[];
}

export type PageSection =
  | HeroSection
  | Sollutions
  | SolutionsSection;

export interface PageData {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo: SeoMeta[];
  sections: PageSection[];
}

export interface StrapiResponse<T> {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
