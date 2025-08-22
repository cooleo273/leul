"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Flex, ToggleButton, Line, Icon } from "@once-ui-system/core";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();

  const isAm = pathname.startsWith("/am/") || pathname === "/am";

  function navigateToLocale(locale: "en" | "am") {
    const base = pathname.replace(/^\/(en|am)(?=\/|$)/, "") || "/";
    const baseClean = base === "/" ? "" : base;
    const newPath =
      locale === "en" ? baseClean || "/" : `/${locale}${baseClean}`;

    const query = searchParams ? searchParams.toString() : "";
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const finalPath = `${newPath}${query ? `?${query}` : ""}${hash || ""}`;

    try {
      router.replace(finalPath);
    } catch {
      window.location.href = finalPath;
    }
  }

  return (
    <Flex
      role="group"
      aria-label="Language switcher"
      horizontal="center"
      vertical="center"
      gap="4"
      padding="4"
      background="page"
      border="neutral-alpha-weak"
      radius="m-4"
      shadow="m"
      zIndex={10}
    >
      <Icon name="globe" size="xs" onBackground="neutral-weak" />
      <Line vert maxHeight="24" background="neutral-alpha-medium" />
      <ToggleButton
        size="s"
        label="EN"
        aria-label="Switch to English"
        selected={!isAm}
        onClick={() => navigateToLocale("en")}
      />
      <ToggleButton
        size="s"
        label="AM"
        aria-label="Switch to Amharic"
        selected={isAm}
        onClick={() => navigateToLocale("am")}
      />
    </Flex>
  );
}
