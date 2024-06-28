"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

import { docsConfig } from "@/config/docs";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/mobile/new-york/ui/button";
import { ScrollArea } from "@/mobile/new-york/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/mobile/new-york/ui/sheet";

/**
 * Component representing the mobile navigation menu.
 * @returns {React.ReactElement} - The mobile navigation menu component.
 */
export function MobileNav(): React.ReactElement {
  // State to manage the open/close state of the mobile menu
  const [open, setOpen] = React.useState(false);

  // Render the mobile navigation menu
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Trigger button for opening the mobile menu */}
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
          onClick={() => setOpen(!open)}
        >
          {/* Icon for toggling the menu */}
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          {/* Screen reader text for accessibility */}
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      {/* Content of the mobile menu */}
      <SheetContent side="left" className="pr-0">
        {/* Logo and site name */}
        <MobileLink
          href="/"
          className="flex items-center align-middle"
          onOpenChange={setOpen}
        >
          {/*<Accessibility className="h-6 w-6"/>*/}
          <span className="pl-1 pt-6 text-base font-semibold">
            {siteConfig.name}
          </span>
        </MobileLink>
        {/* Scrollable area for menu items */}
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-4">
          <div className="flex flex-col space-y-3">
            {/* Render each menu item */}
            {docsConfig.mainNav?.map(
              (item) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                    className={cn(
                      "bg-zinc-50 hover:bg-zinc-100 hover:text-zinc-950 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
                      "rounded-md p-2",
                      "px-4 py-2",
                    )}
                  >
                    {item.title}
                  </MobileLink>
                ),
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

/**
 * Props for the MobileLink component.
 */
interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

/**
 * Component representing a mobile link.
 * @param href - The URL to navigate to.
 * @param onOpenChange - Function to handle open/close state change.
 * @param className - The class name for the link.
 * @param children - The children of the link.
 * @param props - The rest of the props.
 * @returns {React.ReactElement} - The mobile link component.
 */
function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps): React.ReactElement {
  // Next.js router hook
  const router = useRouter();

  /**
   * Function to handle link click.
   * Navigates to the link and closes the mobile menu.
   */
  const handleClick = () => {
    router.push(href.toString());
    onOpenChange?.(false);
  };

  // Render the link
  return (
    <Link
      href={href}
      passHref
      className={cn(className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
}
