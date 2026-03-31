export async function extractPageNumber(
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
): Promise<number> {
  const params = await searchParams;
  const raw = params?.page;
  const value = Number(Array.isArray(raw) ? raw[0] : (raw ?? 1));
  return isNaN(value) || value < 1 ? 1 : value;
}

export async function extractDecodedSlug(
  params: Promise<{ slug: string }>
): Promise<string> {
  const { slug } = await params;
  return decodeURIComponent(slug);
}
