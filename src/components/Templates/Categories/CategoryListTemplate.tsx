import Link from "next/link";
import { getCategories } from "@/lib/strapi/client";
import PaginationTemplate from "../Pagination/PaginationTemplate";
import EmptyState from "@/components/EmptyState/EmptyState";
import styles from "./CategoryListTemplate.module.css";

interface CategoryListTemplateProps {
  page?: number;
}

export default async function CategoriesListTemplate({
  page = 1,
}: Readonly<CategoryListTemplateProps>) {
  const result = await getCategories({
    page,
    pageSize: 10,
    populate: ["parent", "categories"],
    filters: {
      $and: [
        { parent: { $null: true } },
        { posts: { state: { $eq: "Published" } } },
      ],
    },
  });
  const categories = result.data;
  const { pageCount } = result.meta.pagination;

  return (
    <div
      className={`w-full flex flex-col flex-1 justify-between entry-content ${styles.container}`}
    >
      <h1 className={styles.title}>
        <Link href="/categories/">Categories</Link>
      </h1>

      <hr className="my-3" />

      {categories.length > 0 ? (
        <ul className="flex-1">
          {categories.map((category) => (
            <li key={category.slug} className="my-1 py-1">
              <Link href={`/categories/${category.slug}`}>
                <span>{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState message="There is no category." />
      )}

      <hr />
      <PaginationTemplate basePath="/categories/" page={page} pageCount={pageCount} />
    </div>
  );
}
