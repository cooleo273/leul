import { Column, Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { headers } from 'next/headers';
import { loadTranslations, Locale } from '@/i18n';
import { Projects } from "@/components/work/Projects";

export async function generateMetadata() {
  const h = headers();
  const headerLocale = (await h).get('x-locale') as Locale | null;
  const locale: Locale = headerLocale === 'am' ? 'am' : 'en';
  const t = loadTranslations(locale);
  const title = t.work.metaTitle.replace('{{name}}', person.name);
  const description = t.work.metaDescription.replace('{{name}}', person.name);
  return Meta.generate({
    title,
    description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(title)}`,
    path: work.path,
  });
}

export default async function Work() {
  const h = headers();
  const headerLocale = (await h).get('x-locale') as Locale | null;
  const locale: Locale = headerLocale === 'am' ? 'am' : 'en';
  const t = loadTranslations(locale);
  const schemaTitle = t.work.metaTitle.replace('{{name}}', person.name);
  const schemaDesc = t.work.metaDescription.replace('{{name}}', person.name);
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={schemaTitle}
        description={schemaDesc}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Projects />
    </Column>
  );
}
