import Link from "next/link";

interface PaginationTemplateProps {
  page: number;
  pageCount: number;
  /**
   * basePath should end with '/'
   * e.g. '/', '/categories/slug/'
   */
  basePath: string;
  isLoading?: boolean;
}

export default function PaginationTemplate({
  page,
  pageCount,
  basePath,
  isLoading,
}: Readonly<PaginationTemplateProps>) {
  const hasPrev = page > 1;
  const hasNext = page < pageCount;

  return (
    <aside className="flex flex-col justify-center items-center py-6">
      <ul className="flex flex-row justify-center items-center gap-3 flex-1">
        {isLoading ? (
          <>
            <li className="placeholder animate-pulse min-w-3/4">&nbsp;</li>
            <li className="placeholder animate-pulse min-w-3/4">&nbsp;</li>
            <li className="placeholder animate-pulse min-w-3/4">&nbsp;</li>
            <li className="placeholder animate-pulse min-w-3/4">&nbsp;</li>
          </>
        ) : (
          <>
            <li>
              {hasPrev ? (
                <Link href={`${basePath}?page=1`}>First</Link>
              ) : (
                <span className="cursor-not-allowed">First</span>
              )}
            </li>
            <li>
              {hasPrev ? (
                <Link href={`${basePath}?page=${page - 1}`}>Previous</Link>
              ) : (
                <span className="cursor-not-allowed">Previous</span>
              )}
            </li>
            <li>
              <span>
                {page} / {pageCount}
              </span>
            </li>
            <li>
              {hasNext ? (
                <Link href={`${basePath}?page=${page + 1}`}>Next</Link>
              ) : (
                <span className="cursor-not-allowed">Next</span>
              )}
            </li>
            <li>
              {hasNext ? (
                <Link href={`${basePath}?page=${pageCount}`}>Last</Link>
              ) : (
                <span className="cursor-not-allowed">Last</span>
              )}
            </li>
          </>
        )}
      </ul>
    </aside>
  );
}
