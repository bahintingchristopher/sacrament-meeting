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
  SacramentMeeting,
  SpeakerItem,
  WardBusinessItem,
} from './types';

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
  speakers: z.string().optional().default(''),
  closingHymnNumber: z.string().min(1, 'Closing hymn number is required.'),
  closingHymnTitle: z.string().min(1, 'Closing hymn title is required.'),
  closingPrayer: z.string().min(2, 'Closing prayer is required.'),
});

type MeetingFormValues = z.infer<typeof MeetingFormSchema>;

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

function jsonList<T>(raw: string): T[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function hymn(numberValue: string, title: string): Hymn {
  const number = Number(numberValue);
  return {
    number: Number.isFinite(number) ? number : 0,
    title,
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
    wardBusiness: jsonList<WardBusinessItem>(data.wardBusiness ?? ''),
    stakeBusiness: ['on', 'true', '1'].includes(
      (data.stakeBusiness ?? '').toLowerCase()
    ),
    sacramentHymn: hymn(data.sacramentHymnNumber, data.sacramentHymnTitle),
    speakers: jsonList<SpeakerItem>(data.speakers ?? ''),
    closingHymn: hymn(data.closingHymnNumber, data.closingHymnTitle),
    closingPrayer: data.closingPrayer,
  };
}

export async function createMeeting(formData: FormData) {
  const parsed = MeetingFormSchema.safeParse(meetingFormValues(formData));
  if (!parsed.success) {
    throw new Error('Invalid meeting input.');
  }

  try {
    await addMeeting(meetingInputFromValues(parsed.data));
  } catch (error) {
    console.error('Error creating meeting:', error);
    throw new Error('Failed to create meeting. Please try again later.');
  }
  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(id: string, formData: FormData) {
  const parsed = MeetingFormSchema.safeParse(meetingFormValues(formData));
  if (!parsed.success) {
    throw new Error('Invalid meeting input.');
  }

  try {
    await updateMeetingRecord(Number(id), meetingInputFromValues(parsed.data));
  } catch (error) {
    console.error('Error updating meeting:', error);
    throw new Error('Failed to update meeting. Please try again later.');
  }
  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function deleteMeeting(id: string) {
  try {
    await deleteMeetingRecord(Number(id));
  } catch (error) {
    console.error('Error deleting meeting:', error);
    throw new Error('Failed to delete meeting. Please try again later.');
  }
  revalidatePath('/meetings');
}
