import { getPosts } from "@/utils/utils";
import { Column } from "@once-ui-system/core";
import { headers } from 'next/headers';
import { loadTranslations, Locale } from '@/i18n';
import { ProjectCard } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
}

export async function Projects({ range }: ProjectsProps) {
  const h = headers();
  const headerLocale = (await h).get('x-locale') as Locale | null;
  const locale: Locale = headerLocale === 'am' ? 'am' : 'en';
  const t = loadTranslations(locale);
  const prefix = locale === 'am' ? '/am' : '';
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => {
        const override = t.work.projectTranslations[post.slug];
        const title = override?.title || post.metadata.title;
        const summary = override?.summary || post.metadata.summary;
        return (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`${prefix}/work/${post.slug}`}
          images={post.metadata.images}
          title={title}
          description={summary}
          content={post.content}
          avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
          link={post.metadata.link || ""}
        />
      );})}
    </Column>
  );
}
