import { cache } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export type LeaderDTO = {
  name: string;
  email: string;
};

export const getLeaderSession = cache(async (): Promise<LeaderDTO | null> => {
  const session = await auth();

  if (!session?.user?.email) {
    return null;
  }

  return {
    name: session.user.name ?? session.user.email,
    email: session.user.email,
  };
});

export const requireLeaderSession = cache(async (): Promise<LeaderDTO> => {
  const leader = await getLeaderSession();

  if (!leader) {
    redirect('/login');
  }

  return leader;
});
