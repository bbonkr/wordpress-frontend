import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getPostByDocumentId } from "@/lib/strapi/client";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const documentId = searchParams.get("documentId");

  if (secret !== process.env.HEADLESS_SECRET || !documentId) {
    return new Response("Invalid token", { status: 401 });
  }

  const post = await getPostByDocumentId(documentId);

  if (!post) {
    return new Response("Invalid documentId", { status: 401 });
  }

  const draftModeValue = await draftMode();
  draftModeValue.enable();

  redirect(`/preview/${documentId}`);
}
