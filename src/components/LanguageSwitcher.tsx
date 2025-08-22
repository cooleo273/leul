"use client";

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname() || '/';
  const searchParams = useSearchParams();

  function switchLocale(locale: string) {
//     try {
//   // Remove existing locale prefix if present
//   const base = pathname.replace(/^\/(en|am)/, '') || '/';
//   // Normalize base: use '' for root to avoid producing '/am/' and double slashes
//   const baseClean = base === '/' ? '' : base;
//   // For the default locale (en) use the unprefixed path; for others prefix the locale
//   const newPath = locale === 'en' ? (baseClean || '/') : `/${locale}${baseClean}`;
//       const query = searchParams ? searchParams.toString() : '';
//       const finalPath = query ? `${newPath}?${query}` : newPath;

//   // Debug: log computed path so you can inspect in the browser console
//   // (helpful if switching appears to do nothing or shows an error)
//   // eslint-disable-next-line no-console
//   console.log('[LanguageSwitcher] switch', { locale, pathname, finalPath });

//       // Use replace to avoid adding history entry when switching languages
//   // Use replace to avoid adding a history entry when switching languages
//   router.replace(finalPath);
//     } catch (e) {
//       // Fallback: reload with simple path
//       window.location.href = `/${locale}${pathname}`;
//     }
console.log('switch locale to', locale);
  }

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <button aria-label="Switch to English" onClick={() => switchLocale('en')}>EN</button>
      <button aria-label="Switch to Amharic" onClick={() => switchLocale('am')}>AM</button>
    </div>
  );
}
