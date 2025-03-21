import Link from "next/link";
import { print } from "graphql/language/printer";

import styles from "./Navigation.module.css";

import { MenuItem, RootQueryToMenuItemConnection } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import gql from "graphql-tag";
import ThemeToggle from "@/components/Globals/ThemeProvider/theme-toggle";

// PRIMARY_MENU
async function getData() {
  const menuQuery = gql`
    query MenuQuery {
      menuItems(where: { location: PRIMARY }) {
        nodes {
          uri
          target
          label
        }
      }
    }
  `;

  const { menuItems } = await fetchGraphQL<{
    menuItems: RootQueryToMenuItemConnection;
  }>(print(menuQuery));

  if (menuItems === null) {
    throw new Error("Failed to fetch data");
  }

  return menuItems;
}

interface NavigationProps {
  useThemeSwicher?: boolean;
}

export default async function Navigation({
  useThemeSwicher,
}: Readonly<NavigationProps>) {
  const menuItems = await getData();

  return (
    <nav
      className={styles.navigation}
      role="navigation"
      itemScope
      itemType="http://schema.org/SiteNavigationElement"
    >
      {menuItems.nodes.map((item: MenuItem, index: number) => {
        if (!item.uri) return null;

        return (
          <Link
            itemProp="url"
            href={item.uri}
            key={item.uri}
            target={item.target ?? "_self"}
          >
            <span itemProp="name">{item.label}</span>
          </Link>
        );
      })}
      {useThemeSwicher && <ThemeToggle />}
    </nav>
  );
}
