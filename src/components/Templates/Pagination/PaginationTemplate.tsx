import { PageInfo } from "@/gql/graphql";
import Link from "next/link";
import Constants from "@/constants";

interface PaginationTemplateProps {
  pageInfo: PageInfo | undefined;
  /**
   * Route should end with '/'
   */
  route: string | undefined;
  showIndicator?: boolean;
  isLoading?: boolean;
}

export default function PaginationTemplate({
  pageInfo,
  route,
  showIndicator,
  isLoading,
}: Readonly<PaginationTemplateProps>) {
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
              {pageInfo?.hasPreviousPage ? (
                <Link href={`${route ?? "/"}`}>First</Link>
              ) : (
                <span className="cursor-not-allowed">First</span>
              )}
            </li>
            <li>
              {pageInfo?.hasPreviousPage ? (
                <Link
                  href={`${route ?? "/"}?before=${pageInfo.startCursor}&last=${
                    Constants.pagination.last
                  }`}
                >
                  Previous{" "}
                  {showIndicator && (
                    <>({pageInfo?.hasPreviousPage ? "✅" : "❌"})</>
                  )}
                </Link>
              ) : (
                <span className="cursor-not-allowed">Previous</span>
              )}
            </li>

            <li>
              {pageInfo?.hasNextPage ? (
                <Link
                  href={`${route ?? "/"}?after=${pageInfo?.endCursor}&first=${
                    Constants.pagination.first
                  }`}
                >
                  Next{" "}
                  {showIndicator && (
                    <>({pageInfo?.hasNextPage ? "✅" : "❌"})</>
                  )}
                </Link>
              ) : (
                <span className="cursor-not-allowed">Next</span>
              )}
            </li>
            <li>
              {pageInfo?.hasNextPage ? (
                <Link
                  href={`${route ?? "/"}?last=${Constants.pagination.last}`}
                >
                  Last
                </Link>
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
