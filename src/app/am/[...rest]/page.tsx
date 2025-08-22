import { redirect } from 'next/navigation';

export default function AmCatchAll({ params }: { params: { rest: string[] } }) {
  const rest = params.rest ? params.rest.join('/') : '';
  // preserve path after /am
  redirect(`/${rest}`);
}
