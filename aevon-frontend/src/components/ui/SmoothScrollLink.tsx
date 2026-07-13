"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface SmoothScrollLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function SmoothScrollLink({
  href,
  children,
  className = "",
  activeClassName = "",
  isActive = false,
  onClick,
  ...props
}: SmoothScrollLinkProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isHashLink = href.startsWith("/#") || href.startsWith("#");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);

    if (isHashLink) {
      e.preventDefault();
      
      // Extract the target ID (e.g., from "/#about" -> "about")
      const targetId = href.split("#")[1];
      const element = document.getElementById(targetId);

      if (element) {
        // If we are already on the correct page (home page usually)
        if (pathname === "/" || pathname.startsWith("/en") || pathname.startsWith("/fr")) {
           // We're mostly on the root locale path where sections live
           // This assumes all sections are on the home page.
           
           // Update URL without refresh
           window.history.pushState(null, "", `#${targetId}`);
           
           // Smooth scroll
           element.scrollIntoView({ behavior: "smooth" });
        } else {
           // If we are on a different page (e.g. /legal), navigate to home with hash
           router.push(`/${pathname.split('/')[1] || ''}/#${targetId}`);
        }
      } else {
        // Fallback navigation if element not found in DOM
        router.push(href);
      }
    }
  };

  const combinedClassName = `${className} ${isActive ? activeClassName : ""}`.trim();

  return (
    <Link href={href} className={combinedClassName} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
