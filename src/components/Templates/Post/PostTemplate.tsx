import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { marked } from "marked";
import type { StrapiPost } from "@/lib/strapi/types";
import { PostContent } from "@/components/Clients/PostContent/PostContent";
import styles from "./PostTemplate.module.css";

interface PostTemplateProps {
  post: StrapiPost;
  previewMode?: boolean;
  isLoading?: boolean;
}

export default function PostTemplate({
  post,
  isLoading,
}: Readonly<PostTemplateProps>) {
  // markdownContent 우선 (→ HTML 변환), 없으면 htmlContent 폴백 (계획 §11)
  const hasMarkdown = Boolean(post.markdownContent);
  const hasHtml = Boolean(post.htmlContent) && !hasMarkdown;

  // HTML 헤딩 내 마크다운 prefix(##, ###)가 잔존하는 경우 제거
  function stripMarkdownHeadingPrefixes(html: string): string {
    return html.replace(/(<h[1-6][^>]*>)\s*#{1,6}\s*/gi, "$1");
  }

  const rawContent = hasMarkdown
    ? String(marked(post.markdownContent ?? ""))
    : (post.htmlContent ?? "");
  const renderedContent = stripMarkdownHeadingPrefixes(rawContent);

  return (
    <div className={`w-full flex flex-col flex-1 entry-content ${styles.post}`}>
      <h1 className={`post-title ${styles.title}`}>
        {isLoading ? (
          <div className="placeholder animate-pulse">&nbsp;</div>
        ) : (
          <span
            dangerouslySetInnerHTML={{
              __html: String(marked.parseInline(post.title ?? "")),
            }}
          />
        )}
      </h1>

      <div className={`w-full flex flex-row justify-center ${styles.author}`}>
        {isLoading ? (
          <div className="placeholder animate-pulse min-w-3/12 inline-block">
            &nbsp;
          </div>
        ) : (
          post.author && (
            <Link href="/profile">
              <div className="flex flex-row gap-1 items-center">
                <span>By</span>
                <span>{post.author.nickname ?? post.author.username}</span>
                {post.author.avatar?.url && (
                  <Image
                    src={post.author.avatar.url}
                    alt={post.author.nickname ?? post.author.username ?? "author image"}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
              </div>
            </Link>
          )
        )}
      </div>

      <aside>
        {post.category && (
          <>
            <h4 className="my-3">Categories:</h4>
            <div className={styles.categories}>
              <ul className="flex flex-row gap-2 flex-wrap">
                <li key={post.category.slug}>
                  <Link href={`/categories/${post.category.slug}`}>
                    <span className={styles.category}>{post.category.name}</span>
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </aside>

      <hr className="my-3" />

      {isLoading ? (
        <div className={`${styles.body} post`}>
          {new Array(10).fill(0).map((v, i) => (
            <div key={i + v} className="placeholder animate-pulse my-1">
              &nbsp;
            </div>
          ))}
        </div>
      ) : (hasMarkdown || hasHtml) ? (
        <Suspense
          fallback={
            <div
              className={`${styles.body} post`}
              dangerouslySetInnerHTML={{ __html: renderedContent }}
            />
          }
        >
          <PostContent classNames={`${styles.body} post`} content={renderedContent} />
        </Suspense>
      ) : null}

      <aside>
        <hr className="my-3" />
        {(post.tags?.length ?? 0) > 0 && (
          <>
            <h4 className="my-3">Tags</h4>
            <div className={styles.tags}>
              <ul className="flex flex-row gap-2 flex-wrap">
                {post.tags?.map((tag) => (
                  <li key={tag.slug}>
                    <Link href={`/tags/${tag.slug}`}>
                      <span className={styles.tag}>{tag.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
