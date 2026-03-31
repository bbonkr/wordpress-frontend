// Strapi v5 REST 응답 래퍼
export interface StrapiResponse<T> {
  data: T;
  meta: { pagination?: StrapiPagination };
}

export interface StrapiListResponse<T> {
  data: T[];
  meta: { pagination: StrapiPagination };
}

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

// 미디어
export interface StrapiMedia {
  id: number;
  documentId: string;
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  formats?: Record<string, { url: string; width: number; height: number }>;
}

// SEO 컴포넌트 (repeatable → 배열, 접근: seo?.[0])
export interface StrapiMetaSocial {
  socialNetwork: "Facebook" | "Twitter";
  title: string;
  description: string;
  image?: StrapiMedia;
}

export interface StrapiSeo {
  metaTitle: string;
  metaDescription: string;
  metaImage?: StrapiMedia;
  metaSocial?: StrapiMetaSocial[];
  keywords?: string;
  metaRobots?: string;
  metaViewport?: string;
  canonicalURL?: string;
  structuredData?: object;
}

// 유저 (flat 구조)
export interface StrapiUser {
  id: number;
  documentId: string;
  username: string;
  email: string;
  nickname?: string;
  avatar?: StrapiMedia;
  bio?: string;
}

// 카테고리
export interface StrapiCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  parent?: StrapiCategory;
  categories?: StrapiCategory[]; // children
  posts?: StrapiPost[]; // M-024: 관계 확장 시 사용 (populate 필요)
}

// 태그
export interface StrapiTag {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  posts?: StrapiPost[]; // M-024: 관계 확장 시 사용 (populate 필요)
}

// 포스트
export interface StrapiPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  markdownContent?: string; // 렌더링 1순위
  htmlContent?: string; // 렌더링 2순위 (markdownContent 없을 시 폴백)
  excerpt?: string;
  state: "Published" | "Draft" | "Private";
  published: string; // ISO datetime
  createdAt: string;
  updatedAt: string;
  featuredImage?: StrapiMedia;
  seo?: StrapiSeo[]; // repeatable component → 배열, 접근: seo?.[0]
  author?: StrapiUser; // flat 구조
  category?: StrapiCategory;
  tags?: StrapiTag[];
}
