import Link from "next/link";
import styles from "./Navigation.module.css";
import ThemeToggle from "@/components/Globals/ThemeProvider/theme-toggle";
import { primaryNavItems } from "@/config/navigation";

interface NavigationProps {
  useThemeSwicher?: boolean;
}

export default function Navigation({
  useThemeSwicher,
}: Readonly<NavigationProps>) {
  return (
    <nav
      className={styles.navigation}
      role="navigation"
      itemScope
      itemType="http://schema.org/SiteNavigationElement"
    >
      {primaryNavItems.map((item) => (
        <Link
          itemProp="url"
          href={item.href}
          key={item.href}
        >
          <span itemProp="name">{item.label}</span>
        </Link>
      ))}
      {useThemeSwicher && <ThemeToggle />}
    </nav>
  );
}
