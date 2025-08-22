import fs from 'fs';
import path from 'path';

export type Locale = 'en' | 'am';

export function loadTranslations(locale: Locale) {
  try {
    const filePath = path.join(process.cwd(), 'src', 'locales', locale, 'common.json');
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}
