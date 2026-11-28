'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  addMeeting,
  deleteMeeting as deleteMeetingRecord,
  updateMeeting as updateMeetingRecord,
} from './meetings-db';
import type {
  Hymn,
  SacramentAdministration,
  SacramentMeeting,
  SpeakerItem,
  WardBusinessItem,
} from './types';
import { requireLeaderSession } from './dal';

const MeetingFormSchema = z.object({
  date: z.string().min(1, 'Date is required.'),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general', 'special']),
  presiding: z.string().min(2, 'Presiding must be at least 2 characters.'),
  conducting: z.string().min(2, 'Conducting must be at least 2 characters.'),
  announcements: z.string().optional().default(''),
  openingHymnNumber: z.string().min(1, 'Opening hymn number is required.'),
  openingHymnTitle: z.string().min(1, 'Opening hymn title is required.'),
  openingPrayer: z.string().min(2, 'Opening prayer is required.'),
  wardBusiness: z.string().optional().default(''),
  stakeBusiness: z.string().optional().default(''),
  sacramentHymnNumber: z.string().min(1, 'Sacrament hymn number is required.'),
  sacramentHymnTitle: z.string().min(1, 'Sacrament hymn title is required.'),
  blessBy1: z.string().optional().default(''),
  blessBy2: z.string().optional().default(''),
  passBy1: z.string().optional().default(''),
  passBy2: z.string().optional().default(''),
  passBy3: z.string().optional().default(''),
  passBy4: z.string().optional().default(''),
  speakers: z.string().optional().default(''),
  closingHymnNumber: z.string().min(1, 'Closing hymn number is required.'),
  closingHymnTitle: z.string().min(1, 'Closing hymn title is required.'),
  closingPrayer: z.string().min(2, 'Closing prayer is required.'),
});

type MeetingFormValues = z.infer<typeof MeetingFormSchema>;

export type State = {
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
    announcements?: string[];
    openingHymnNumber?: string[];
    openingHymnTitle?: string[];
    openingPrayer?: string[];
    wardBusiness?: string[];
    stakeBusiness?: string[];
    sacramentHymnNumber?: string[];
    sacramentHymnTitle?: string[];
    blessBy1?: string[];
    blessBy2?: string[];
    passBy1?: string[];
    passBy2?: string[];
    passBy3?: string[];
    passBy4?: string[];
    speakers?: string[];
    closingHymnNumber?: string[];
    closingHymnTitle?: string[];
    closingPrayer?: string[];
  };
  message?: string | null;
};

function field(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === 'string' ? value : '';
}

function meetingFormValues(formData: FormData): MeetingFormValues {
  return {
    date: field(formData, 'date'),
    meetingType: field(formData, 'meetingType') as MeetingFormValues['meetingType'],
    presiding: field(formData, 'presiding'),
    conducting: field(formData, 'conducting'),
    announcements: field(formData, 'announcements'),
    openingHymnNumber: field(formData, 'openingHymnNumber'),
    openingHymnTitle: field(formData, 'openingHymnTitle'),
    openingPrayer: field(formData, 'openingPrayer'),
    wardBusiness: field(formData, 'wardBusiness'),
    stakeBusiness: field(formData, 'stakeBusiness'),
    sacramentHymnNumber: field(formData, 'sacramentHymnNumber'),
    sacramentHymnTitle: field(formData, 'sacramentHymnTitle'),
    blessBy1: field(formData, 'blessBy1'),
    blessBy2: field(formData, 'blessBy2'),
    passBy1: field(formData, 'passBy1'),
    passBy2: field(formData, 'passBy2'),
    passBy3: field(formData, 'passBy3'),
    passBy4: field(formData, 'passBy4'),
    speakers: field(formData, 'speakers'),
    closingHymnNumber: field(formData, 'closingHymnNumber'),
    closingHymnTitle: field(formData, 'closingHymnTitle'),
    closingPrayer: field(formData, 'closingPrayer'),
  };
}

function textList(value: string): string[] {
  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function descriptionList(raw: string): WardBusinessItem[] {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((description) => ({ description }));
}

function speakerList(raw: string): SpeakerItem[] {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, ...rest] = line.split('|').map((part) => part.trim());
      return {
        name,
        topic: rest.join(' | '),
        type: 'speaker',
      };
    });
}

function hymn(numberValue: string, title: string): Hymn {
  const number = Number(numberValue);
  return {
    number: Number.isFinite(number) ? number : 0,
    title,
  };
}

function sacramentAdministration(
  data: MeetingFormValues
): SacramentAdministration {
  return {
    blessedBy: [data.blessBy1 ?? '', data.blessBy2 ?? ''].map((name) =>
      name.trim()
    ),
    passedBy: [
      data.passBy1 ?? '',
      data.passBy2 ?? '',
      data.passBy3 ?? '',
      data.passBy4 ?? '',
    ].map((name) => name.trim()),
  };
}

function meetingInputFromValues(
  data: MeetingFormValues
): Omit<SacramentMeeting, 'id'> {
  return {
    date: data.date,
    meetingType: data.meetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    announcements: textList(data.announcements ?? ''),
    openingHymn: hymn(data.openingHymnNumber, data.openingHymnTitle),
    openingPrayer: data.openingPrayer,
    wardBusiness: descriptionList(data.wardBusiness ?? ''),
    stakeBusiness: ['on', 'true', '1'].includes(
      (data.stakeBusiness ?? '').toLowerCase()
    ),
    sacramentHymn: hymn(data.sacramentHymnNumber, data.sacramentHymnTitle),
    sacramentAdministration: sacramentAdministration(data),
    speakers: speakerList(data.speakers ?? ''),
    closingHymn: hymn(data.closingHymnNumber, data.closingHymnTitle),
    closingPrayer: data.closingPrayer,
  };
}

export async function createMeeting(
  prevState: State,
  formData: FormData
): Promise<State> {
  await requireLeaderSession();

  const parsed = MeetingFormSchema.safeParse(meetingFormValues(formData));
  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to create meeting.',
    };
  }

  try {
    await addMeeting(meetingInputFromValues(parsed.data));
  } catch (error) {
    console.error('Error creating meeting:', error);
    return { message: 'Database Error: Failed to create meeting.' };
  }
  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  id: string,
  prevState: State,
  formData: FormData
): Promise<State> {
  await requireLeaderSession();

  const parsed = MeetingFormSchema.safeParse(meetingFormValues(formData));
  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to update meeting.',
    };
  }

  try {
    await updateMeetingRecord(Number(id), meetingInputFromValues(parsed.data));
  } catch (error) {
    console.error('Error updating meeting:', error);
    return { message: 'Database Error: Failed to update meeting.' };
  }
  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function deleteMeeting(id: string) {
  await requireLeaderSession();

  try {
    await deleteMeetingRecord(Number(id));
  } catch (error) {
    console.error('Error deleting meeting:', error);
    throw new Error('Failed to delete meeting. Please try again later.');
  }
  revalidatePath('/meetings');
}
