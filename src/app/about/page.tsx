import {
  Avatar,
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  IconButton,
  Media,
  Tag,
  Text,
  Meta,
  Schema
} from "@once-ui-system/core";
import { baseURL, about, person, social } from "@/resources";
import { headers } from 'next/headers';
import { loadTranslations, Locale } from '@/i18n';
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import React from "react";

export async function generateMetadata() {
  const h = headers();
  const headerLocale = (await h).get('x-locale') as Locale | null;
  const locale: Locale = headerLocale === 'am' ? 'am' : 'en';
  const t = loadTranslations(locale);
  const title = t.about.metaTitle.replace('{{name}}', person.name);
  const description = t.about.metaDescription.replace('{{name}}', person.name);
  return Meta.generate({
    title,
    description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(title)}`,
    path: about.path,
  });
}

export default async function About() {
  const h = headers();
  const headerLocale = (await h).get('x-locale') as Locale | null;
  const locale: Locale = headerLocale === 'am' ? 'am' : 'en';
  const t = loadTranslations(locale);
  const structure = [
    {
      title: t.about.sectionIntro,
      display: about.intro.display,
      items: [],
    },
    {
      title: t.about.sectionWork,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: t.about.sectionStudies,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: t.about.sectionTechnical,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
  ];
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
  title={t.about.metaTitle.replace('{{name}}', person.name)}
  description={t.about.metaDescription.replace('{{name}}', person.name)}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          hide={true}
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
  <Flex fillWidth horizontal="center">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            position="sticky"
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" />
            <Flex gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Flex>
            {person.languages.length > 0 && (
              <Flex wrap gap="8">
                {person.languages.map((language, index) => (
                  <Tag key={`${language}-${index}`} size="l">
                    {language}
                  </Tag>
                ))}
              </Flex>
            )}
          </Column>
        )}
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            {/*  */}
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {t.about.role}
            </Text>
            {social.length > 0 && (
              <Flex className={styles.blockAlign} paddingTop="20" paddingBottom="8" gap="8" wrap horizontal="center" fitWidth data-border="rounded">
                {social.map(
                  (item) =>
                    item.link && (
                        <React.Fragment key={item.name}>
                            <Button
                                className="s-flex-hide"
                                key={item.name}
                                href={item.link}
                                prefixIcon={item.icon}
                                label={item.name}
                                size="s"
                                weight="default"
                                variant="secondary"
                            />
                            <IconButton
                                className="s-flex-show"
                                size="l"
                                key={`${item.name}-icon`}
                                href={item.link}
                                icon={item.icon}
                                variant="secondary"
                            />
                        </React.Fragment>
                    ),
                )}
              </Flex>
            )}
          </Column>

          {about.intro.display && (
            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
              {t.about.introDescription.replace('{{name}}', person.name)}
            </Column>
          )}

          {about.work.display && (
            <>
              <Heading as="h2" id={t.about.sectionWork} variant="display-strong-s" marginBottom="m">
                {t.about.sectionWork}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.work.experiences.map((experience, index) => (
                  <Column key={`${experience.company}-${experience.role}-${index}`} fillWidth>
                    <Flex fillWidth horizontal="between" vertical="end" marginBottom="4">
                      <Text id={experience.company} variant="heading-strong-l">
                        {experience.company}
                      </Text>
                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {experience.timeframe}
                      </Text>
                    </Flex>
                    <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                      {experience.role}
                    </Text>
                    <Column as="ul" gap="16">
                      {t.about.experiencesText[index]?.map((achievement: string, aIdx: number) => (
                        <Text as="li" variant="body-default-m" key={`${experience.company}-${aIdx}`}>
                          {achievement}
                        </Text>
                      ))}
                    </Column>
                    {experience.images.length > 0 && (
                      <Flex fillWidth paddingTop="m" paddingLeft="40" gap="12" wrap>
            {experience.images.map((image, index) => (
                          <Flex
              key={`${experience.company}-img-${index}`}
                            border="neutral-medium"
                            radius="m"
                            //@ts-ignore
                            minWidth={image.width}
                            //@ts-ignore
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              //@ts-ignore
                              sizes={image.width.toString()}
                              //@ts-ignore
                              alt={image.alt}
                              //@ts-ignore
                              src={image.src}
                            />
                          </Flex>
                        ))}
                      </Flex>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.studies.display && (
            <>
              <Heading as="h2" id={t.about.sectionStudies} variant="display-strong-s" marginBottom="m">
                {t.about.sectionStudies}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.studies.institutions.map((institution, index) => (
                  <Column key={`${institution.name}-${index}`} fillWidth gap="4">
                    <Text id={institution.name} variant="heading-strong-l">
                      {institution.name}
                    </Text>
                    <Text variant="heading-default-xs" onBackground="neutral-weak">
                      {t.about.studiesDescription}
                    </Text>
                  </Column>
                ))}
              </Column>
            </>
          )}

      {about.technical.display && (
            <>
              <Heading
                as="h2"
        id={t.about.sectionTechnical}
                variant="display-strong-s"
                marginBottom="40"
              >
        {t.about.sectionTechnical}
              </Heading>
              <Column fillWidth gap="l">
                {about.technical.skills.map((skill, index) => (
                  <Column key={`${skill}-${index}`} fillWidth gap="4">
                    <Text id={skill.title} variant="heading-strong-l">{skill.title}</Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                      {skill.description}
                    </Text>
                    {(skill as any).images && (skill as any).images.length > 0 && (
                      <Flex fillWidth paddingTop="m" gap="12" wrap>
            {(skill as any).images.map((image: any, index: number) => (
                          <Flex
              key={`${skill.title}-img-${index}`}
                            border="neutral-medium"
                            radius="m"
                            //@ts-ignore
                            minWidth={image.width}
                            //@ts-ignore
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              //@ts-ignore
                              sizes={image.width.toString()}
                              //@ts-ignore
                              alt={image.alt}
                              //@ts-ignore
                              src={image.src}
                            />
                          </Flex>
                        ))}
                      </Flex>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}
        </Column>
      </Flex>
    </Column>
  );
}
