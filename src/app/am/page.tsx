import { redirect } from 'next/navigation';

export default function AmIndex() {
  // Redirect bare /am to the site root (Next i18n should handle locale, this is a fallback)
  redirect('/');
}
