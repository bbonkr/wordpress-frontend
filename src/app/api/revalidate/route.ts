import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

// Strapi webhook payload 구조:
// { event: "entry.publish", model: "post", entry: { id, documentId, slug, ... } }

export async function POST(request: NextRequest) {
  if (
    request.headers.get("X-Headless-Secret-Key") !== process.env.HEADLESS_SECRET
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { model, entry } = body ?? {};

    revalidateTag("strapi", "max");
    revalidatePath("/");

    if (model === "post" && entry?.slug) {
      revalidatePath(`/${entry.slug}`);
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch {
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}
