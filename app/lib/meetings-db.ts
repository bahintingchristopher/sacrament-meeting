import { neon } from '@neondatabase/serverless';
import type { SacramentMeeting } from './types';

const sql = neon(process.env.DATABASE_URL!);

const ITEMS_PER_PAGE = 5;

const MEETING_COLUMNS = `
  id,
  to_char(date, 'YYYY-MM-DD') AS "date",
  meeting_type                AS "meetingType",
  presiding, conducting, announcements,
  opening_hymn                AS "openingHymn",
  opening_prayer              AS "openingPrayer",
  ward_business               AS "wardBusiness",
  stake_business              AS "stakeBusiness",
  sacrament_hymn              AS "sacramentHymn",
  sacrament_administration    AS "sacramentAdministration",
  speakers,
  closing_hymn                AS "closingHymn",
  closing_prayer              AS "closingPrayer"
`;

interface UpdateField {
  key: keyof SacramentMeeting;
  column: string;
  format?: 'json' | 'array';
}

const UPDATE_FIELDS: UpdateField[] = [
  { key: 'date', column: 'date' },
  { key: 'meetingType', column: 'meeting_type' },
  { key: 'presiding', column: 'presiding' },
  { key: 'conducting', column: 'conducting' },
  { key: 'announcements', column: 'announcements', format: 'array' },
  { key: 'openingHymn', column: 'opening_hymn', format: 'json' },
  { key: 'openingPrayer', column: 'opening_prayer' },
  { key: 'wardBusiness', column: 'ward_business', format: 'json' },
  { key: 'stakeBusiness', column: 'stake_business' },
  { key: 'sacramentHymn', column: 'sacrament_hymn', format: 'json' },
  {
    key: 'sacramentAdministration',
    column: 'sacrament_administration',
    format: 'json',
  },
  { key: 'speakers', column: 'speakers', format: 'json' },
  { key: 'closingHymn', column: 'closing_hymn', format: 'json' },
  { key: 'closingPrayer', column: 'closing_prayer' },
];

export async function getMeetings(
  query: string = '',
  currentPage: number = 1
): Promise<SacramentMeeting[]> {
  const searchTerm = `%${query}%`;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      sacrament_administration    AS "sacramentAdministration",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings
    WHERE
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;
  return rows as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(
  query: string = ''
): Promise<number> {
  const searchTerm = `%${query}%`;
  const rows = await sql`
    SELECT COUNT(*) FROM meetings
    WHERE
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;
  return Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE);
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      sacrament_administration    AS "sacramentAdministration",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings WHERE id = ${id}
  `;
  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function addMeeting(
  data: Omit<SacramentMeeting, 'id'>
): Promise<SacramentMeeting> {
  const rows = await sql`
    INSERT INTO meetings (
      date, meeting_type, presiding, conducting, announcements,
      opening_hymn, opening_prayer, ward_business, stake_business,
      sacrament_hymn, sacrament_administration, speakers,
      closing_hymn, closing_prayer
    )
    VALUES (
      ${data.date},
      ${data.meetingType},
      ${data.presiding},
      ${data.conducting},
      ${data.announcements ?? []}::text[],
      ${JSON.stringify(data.openingHymn)}::jsonb,
      ${data.openingPrayer},
      ${JSON.stringify(data.wardBusiness ?? [])}::jsonb,
      ${data.stakeBusiness ?? false},
      ${JSON.stringify(data.sacramentHymn)}::jsonb,
      ${JSON.stringify(
        data.sacramentAdministration ?? { blessedBy: [], passedBy: [] }
      )}::jsonb,
      ${JSON.stringify(data.speakers ?? [])}::jsonb,
      ${JSON.stringify(data.closingHymn)}::jsonb,
      ${data.closingPrayer}
    )
    RETURNING ${sql.unsafe(MEETING_COLUMNS)}
  `;
  return rows[0] as unknown as SacramentMeeting;
}

export async function updateMeeting(
  id: number,
  updates: Partial<SacramentMeeting>
): Promise<SacramentMeeting | null> {
  const sets: string[] = [];
  const values: unknown[] = [];

  for (const field of UPDATE_FIELDS) {
    if (!(field.key in updates)) continue;
    const value = (updates as Record<string, unknown>)[field.key];
    if (value === undefined) continue;

    values.push(field.format === 'json' ? JSON.stringify(value) : value);
    const cast =
      field.format === 'json'
        ? '::jsonb'
        : field.format === 'array'
          ? '::text[]'
          : '';
    sets.push(`${field.column} = $${values.length}${cast}`);
  }

  if (sets.length === 0) {
    return getMeetingById(id);
  }

  values.push(id);
  const rows = await sql.query(
    `UPDATE meetings
     SET ${sets.join(', ')}
     WHERE id = $${values.length}
     RETURNING ${MEETING_COLUMNS}`,
    values
  );
  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function deleteMeeting(id: number): Promise<boolean> {
  const rows = await sql`
    DELETE FROM meetings WHERE id = ${id} RETURNING id
  `;
  return rows.length > 0;
}