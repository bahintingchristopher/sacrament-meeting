import { notFound } from 'next/navigation';
import EditMeetingForm from '@/app/components/EditMeetingForm';
import { getMeetingById } from '@/app/lib/meetings-db';

export const instant = false;

export default async function EditMeetingPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const meeting = await getMeetingById(Number(id));

  if (!meeting) {
    notFound();
  }

  return <EditMeetingForm id={id} meeting={meeting} />;
}
