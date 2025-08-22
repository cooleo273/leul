import { notFound } from "next/navigation";
import { getPosts, getPostBySlug } from "@/utils/utils";
import { Meta, Schema, AvatarGroup, Button, Column, Flex, Heading, Media, Text } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { headers } from 'next/headers';
import { loadTranslations, Locale } from '@/i18n';
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import { Metadata } from "next";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
  // Ensure we only output base slugs
  return posts
    .filter((post) => !/\.[a-z]{2}$/i.test(post.slug))
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  const posts = getPosts(["src", "app", "work", "projects"])
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  // Localize
  const h = headers();
  const headerLocale = (await h).get('x-locale') as Locale | null;
  const locale: Locale = headerLocale === 'am' ? 'am' : 'en';
  const t = loadTranslations(locale);
  const override = t.work.projectTranslations[post.slug];
  const title = override?.title || post.metadata.title;
  const summary = override?.summary || post.metadata.summary;

  return Meta.generate({
    title,
    description: summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${title}`,
    path: `${work.path}/${post.slug}`,
  });
}

export default async function Project({
  params
}: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  // Determine locale from headers for localized MDX resolution
  const h = headers();
  const headerLocale = (await h).get('x-locale') as Locale | null;
  const locale: Locale = headerLocale === 'am' ? 'am' : 'en';

  // Prefer locale-specific MDX (e.g., slug.am.mdx) with fallback to base
  const post = getPostBySlug(["src", "app", "work", "projects"], slugPath, locale);

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  // Localize strings
  const t = loadTranslations(locale);
  const override = t.work.projectTranslations[post.slug];
  const title = override?.title || post.metadata.title;
  const summary = override?.summary || post.metadata.summary;

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={title}
        description={summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={post.metadata.image || `/api/og/generate?title=${encodeURIComponent(title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column maxWidth="xs" gap="16">
        <Button data-border="rounded" href={`${locale === 'am' ? '/am' : ''}/work`} variant="tertiary" weight="default" size="s" prefixIcon="chevronLeft">
          {t.work.backToProjects}
        </Button>
        <Heading variant="display-strong-s">{title}</Heading>
      </Column>
      {post.metadata.images.length > 0 && (
        <Media
          priority
          aspectRatio="16 / 9"
          radius="m"
          alt="image"
          src={post.metadata.images[0]}
          objectFit="contain"
        />
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <Flex gap="12" marginBottom="24" vertical="center">
          {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="m" />}
          <Text variant="body-default-s" onBackground="neutral-weak">
            {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
          </Text>
        </Flex>
        <CustomMDX source={post.content} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
