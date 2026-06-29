import Link from "next/link";
import type { ComponentProps } from "react";
import { isAppRoute, isExternalHref, publicAsset } from "@/lib/paths";

type AppLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
};

export default function AppLink({
  href,
  children,
  className,
  target,
  rel,
  download,
  ...rest
}: AppLinkProps) {
  if (isAppRoute(href)) {
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }

  const external = isExternalHref(href) || target === "_blank";
  return (
    <a
      href={external && isExternalHref(href) ? href : publicAsset(href)}
      className={className}
      target={target ?? (isExternalHref(href) ? "_blank" : undefined)}
      rel={rel ?? (isExternalHref(href) ? "noopener noreferrer" : undefined)}
      download={download}
      {...rest}
    >
      {children}
    </a>
  );
}
