import { notFound, redirect } from "next/navigation";
import { draftMode } from "next/headers";
import type { Metadata } from "next";
import { getPostByDocumentId } from "@/lib/strapi/client";
import PostTemplate from "@/components/Templates/Post/PostTemplate";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

type Props = {
  params: Promise<{ documentId: string }>;
};

export default async function PreviewPage({ params }: Readonly<Props>) {
  const { isEnabled } = await draftMode();

  if (!isEnabled) {
    redirect("/");
  }

  const { documentId } = await params;
  const post = await getPostByDocumentId(documentId);

  if (!post) return notFound();

  return <PostTemplate post={post} previewMode />;
}
