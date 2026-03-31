import type {
  StrapiListResponse,
  StrapiResponse,
  StrapiPost,
  StrapiCategory,
  StrapiTag,
} from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const API_TOKEN = process.env.STRAPI_API_TOKEN;

async function fetchStrapi<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  if (!BASE_URL) {
    // 빌드 시 환경 변수 미설정인 경우 빈 응답 반환 (SSG 안전 처리)
    console.warn("NEXT_PUBLIC_STRAPI_API_URL is not defined, returning empty response");
    return { data: [], meta: { pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 } } } as unknown as T;
  }

  const url = `${BASE_URL}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (API_TOKEN) {
    headers["Authorization"] = `Bearer ${API_TOKEN}`;
  }

  const res = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...(options?.headers as Record<string, string>),
    },
    next: { tags: ["strapi"] },
  });

  if (!res.ok) {
    throw new Error(`Strapi fetch failed: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

function buildQuery(params: Record<string, unknown>): string {
  const parts: string[] = [];

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;

    if (key === "filters" && typeof value === "object") {
      const encodeFilters = (obj: Record<string, unknown>, prefix: string) => {
        for (const [k, v] of Object.entries(obj)) {
          const fullKey = `${prefix}[${k}]`;
          if (Array.isArray(v)) {
            v.forEach((item, i) => {
              if (typeof item === "object" && item !== null) {
                encodeFilters(item as Record<string, unknown>, `${fullKey}[${i}]`);
              } else {
                parts.push(`${encodeURIComponent(`${fullKey}[${i}]`)}=${encodeURIComponent(String(item))}`);
              }
            });
          } else if (typeof v === "object" && v !== null) {
            encodeFilters(v as Record<string, unknown>, fullKey);
          } else {
            parts.push(`${encodeURIComponent(fullKey)}=${encodeURIComponent(String(v))}`);
          }
        }
      };
      encodeFilters(value as Record<string, unknown>, "filters");
    } else if (key === "pagination" && typeof value === "object") {
      for (const [pk, pv] of Object.entries(value as Record<string, unknown>)) {
        parts.push(`pagination[${pk}]=${encodeURIComponent(String(pv))}`);
      }
    } else if (key === "populate" && Array.isArray(value)) {
      (value as string[]).forEach((p, i) => {
        parts.push(`populate[${i}]=${encodeURIComponent(p)}`);
      });
    } else if (key === "fields" && Array.isArray(value)) {
      (value as string[]).forEach((f, i) => {
        parts.push(`fields[${i}]=${encodeURIComponent(f)}`);
      });
    } else if (key === "sort") {
      parts.push(`sort=${encodeURIComponent(String(value))}`);
    }
  }

  return parts.length > 0 ? `?${parts.join("&")}` : "";
}

// ──────────────────────────── Posts ────────────────────────────

export interface GetPostsParams {
  page?: number;
  pageSize?: number;
  filters?: Record<string, unknown>;
  populate?: string[];
  sort?: string;
  fields?: string[];
  previewMode?: boolean;
}

export async function getPosts(
  params?: GetPostsParams
): Promise<StrapiListResponse<StrapiPost>> {
  const {
    page = 1,
    pageSize = 10,
    filters = {},
    populate = ["author", "category", "featuredImage", "tags"],
    sort = "published:desc",
    fields,
    previewMode = false,
  } = params ?? {};

  const mergedFilters = previewMode
    ? filters
    : { state: { $eq: "Published" }, ...filters };

  const query = buildQuery({
    pagination: { page, pageSize },
    filters: mergedFilters,
    populate,
    sort,
    ...(fields ? { fields } : {}),
  });

  return fetchStrapi<StrapiListResponse<StrapiPost>>(`/api/posts${query}`);
}

export async function getPostBySlug(
  slug: string,
  previewMode = false
): Promise<StrapiPost | null> {
  const filters: Record<string, unknown> = { slug: { $eq: slug } };
  if (!previewMode) {
    filters.state = { $eq: "Published" };
  }

  const query = buildQuery({
    filters,
    populate: ["author", "category", "featuredImage", "tags", "seo"],
  });

  const res = await fetchStrapi<StrapiListResponse<StrapiPost>>(
    `/api/posts${query}`
  );
  return res.data[0] ?? null;
}

export async function getPostByDocumentId(
  documentId: string
): Promise<StrapiPost | null> {
  const query = buildQuery({
    populate: ["author", "category", "featuredImage", "tags", "seo"],
  });

  const res = await fetchStrapi<StrapiResponse<StrapiPost>>(
    `/api/posts/${documentId}${query}`
  );
  return res.data ?? null;
}

export async function getAllPostSlugs(): Promise<string[]> {
  const first = await getPosts({ page: 1, pageSize: 100, fields: ["slug"], populate: [] });
  const slugs = first.data.map((p) => p.slug);
  const { pageCount } = first.meta.pagination;

  if (pageCount <= 1) return slugs;

  const remaining = await Promise.all(
    Array.from({ length: pageCount - 1 }, (_, i) =>
      getPosts({ page: i + 2, pageSize: 100, fields: ["slug"], populate: [] })
    )
  );
  for (const res of remaining) {
    slugs.push(...res.data.map((p) => p.slug));
  }

  return slugs;
}

// ──────────────────────────── Categories ────────────────────────────

export interface GetCategoriesParams {
  page?: number;
  pageSize?: number;
  populate?: string[];
  filters?: Record<string, unknown>;
}

export async function getCategories(
  params?: GetCategoriesParams
): Promise<StrapiListResponse<StrapiCategory>> {
  const {
    page = 1,
    pageSize = 10,
    populate = ["parent", "categories"],
    filters,
  } = params ?? {};

  const query = buildQuery({
    pagination: { page, pageSize },
    populate,
    ...(filters ? { filters } : {}),
  });

  return fetchStrapi<StrapiListResponse<StrapiCategory>>(
    `/api/categories${query}`
  );
}

export async function getCategoryBySlug(
  slug: string
): Promise<StrapiCategory | null> {
  const query = buildQuery({
    filters: { slug: { $eq: slug } },
    populate: ["parent", "categories"],
  });

  const res = await fetchStrapi<StrapiListResponse<StrapiCategory>>(
    `/api/categories${query}`
  );
  return res.data[0] ?? null;
}

// ──────────────────────────── Tags ────────────────────────────

export async function getTags(
  page = 1,
  pageSize = 20,
  filters?: Record<string, unknown>
): Promise<StrapiListResponse<StrapiTag>> {
  const query = buildQuery({
    sort: "name:asc",
    pagination: { page, pageSize },
    ...(filters ? { filters } : {}),
  });
  return fetchStrapi<StrapiListResponse<StrapiTag>>(`/api/tags${query}`);
}

export async function getTagBySlug(
  slug: string
): Promise<StrapiTag | null> {
  const query = buildQuery({
    filters: { slug: { $eq: slug } },
  });

  const res = await fetchStrapi<StrapiListResponse<StrapiTag>>(
    `/api/tags${query}`
  );
  return res.data[0] ?? null;
}
