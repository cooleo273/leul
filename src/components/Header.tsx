"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Fade, Flex, Line, ToggleButton } from "@once-ui-system/core";

import { routes, display, person, about, blog, work, gallery } from "@/resources";
import { loadTranslations, Locale } from "@/i18n";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string; // Optionally allow locale, defaulting to 'en-GB'
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

export const Header = () => {
  const pathname = usePathname() ?? "";
  // Infer locale from URL prefix or cookie
  const isAm = pathname.startsWith("/am/") || pathname === "/am";
  const locale: Locale = isAm ? 'am' : 'en';
  const t = loadTranslations(locale);
  const prefix = isAm ? '/am' : '';
  const homeHref = isAm ? '/am' : '/';
  const aboutHref = `${prefix}/about`;
  const workHref = `${prefix}/work`;
  const blogHref = `${prefix}/blog`;
  const galleryHref = `${prefix}/gallery`;

  return (
    <>
  <Fade hide={true} fillWidth position="fixed" height="80" zIndex={9} />
      <Flex
        fitHeight
        position="unset"
        className={styles.position}
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
      >
        <Flex paddingLeft="12" fillWidth vertical="center" textVariant="body-default-s">
          {display.location && <Flex hide={true}>{person.location}</Flex>}
        </Flex>
        <Flex fillWidth horizontal="center">
          <Flex
            background="page"
            border="neutral-alpha-weak"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Flex gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {routes["/"] && (
                <ToggleButton
                  prefixIcon="home"
                  href={homeHref}
                  selected={pathname === homeHref || (!isAm && pathname === "/")}
                />
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
      {routes["/about"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="person"
                    href={aboutHref}
        label={t.nav.about}
                    selected={pathname === aboutHref}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="person"
                    href={aboutHref}
                    selected={pathname === aboutHref}
                  />
                </>
              )}
              {routes["/work"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="grid"
                    href={workHref}
        label={t.nav.work}
                    selected={pathname === workHref || pathname.startsWith(`${workHref}/`)}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="grid"
                    href={workHref}
                    selected={pathname === workHref || pathname.startsWith(`${workHref}/`)}
                  />
                </>
              )}
              {routes["/blog"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="book"
                    href={blogHref}
        label={t.nav.blog}
                    selected={pathname === blogHref || pathname.startsWith(`${blogHref}/`)}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="book"
                    href={blogHref}
                    selected={pathname === blogHref || pathname.startsWith(`${blogHref}/`)}
                  />
                </>
              )}
              {routes["/gallery"] && (
                <>
                  <ToggleButton
                    className="s-flex-hide"
                    prefixIcon="gallery"
                    href={galleryHref}
        label={t.nav.gallery}
                    selected={pathname === galleryHref || pathname.startsWith(`${galleryHref}/`)}
                  />
                  <ToggleButton
                    className="s-flex-show"
                    prefixIcon="gallery"
                    href={galleryHref}
                    selected={pathname === galleryHref || pathname.startsWith(`${galleryHref}/`)}
                  />
                </>
              )}
              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ThemeToggle />
                </>
              )}
            </Flex>
          </Flex>
        </Flex>
        <Flex fillWidth horizontal="end" vertical="center">
          <Flex
            paddingRight="12"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="20"
          >
            <Flex hide={true}>{display.time && <TimeDisplay timeZone={person.location} />}</Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
