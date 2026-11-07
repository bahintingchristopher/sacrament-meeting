import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 6,
    date: '2026-11-08',
    meetingType: 'general',
    presiding: 'Elder Mendoza',
    conducting: 'Bishop Dela Cruz',
    announcements: ['General conference broadcast begins at 10:00 a.m.'],
    openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    openingPrayer: 'Sister Bautista',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 172, title: 'While of These Emblems We Partake' },
    sacramentAdministration: {
      blessedBy: ['Brother Santos', 'Brother Cruz'],
      passedBy: ['Brother Flores', 'Brother Garcia', 'Brother Ramos', 'Brother Torres']
    },
    speakers: [
      { name: 'Elder Mendoza', topic: 'Following the Living Prophet', type: 'speaker' },
      { name: 'Ward Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 85, title: 'How Firm a Foundation' },
    closingPrayer: 'Brother Villanueva'
  },
  {
    id: 5,
    date: '2026-11-01',
    meetingType: 'regular',
    presiding: 'Bishop Dela Cruz',
    conducting: 'Brother Reyes',
    announcements: [
      'Fast and testimony meeting next Sunday',
      'Ward temple night: November 14'
    ],
    openingHymn: { number: 27, title: "Joseph Smith's First Prayer" },
    openingPrayer: 'Sister Domingo',
    wardBusiness: [
      { description: 'Release of Brother Aquino from the elders quorum presidency' }
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
    sacramentAdministration: {
      blessedBy: ['Brother Ramos', 'Brother Torres'],
      passedBy: ['Brother Flores', 'Brother Garcia', 'Brother Santos', 'Brother Cruz']
    },
    speakers: [
      { name: 'Sister Fernandez', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Youth Choir', topic: '', type: 'musical-number' },
      { name: 'Brother Pascual', topic: 'The Sacrament and Covenant Keeping', type: 'speaker' }
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Cabrera'
  },
  {
    id: 4,
    date: '2026-10-25',
    meetingType: 'stake',
    presiding: 'Stake President Ramos',
    conducting: 'President Ramos',
    announcements: ['Stake conference broadcast from the stake center'],
    openingHymn: { number: 5, title: 'High on the Mountain Top' },
    openingPrayer: 'Sister Tolentino',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 174, title: 'While of These Emblems We Partake' },
    sacramentAdministration: {
      blessedBy: ['Brother Fernandez', 'Brother Pascual'],
      passedBy: ['Brother Salvador', 'Brother Mercado', 'Brother Soriano', 'Brother Tolentino']
    },
    speakers: [
      { name: 'President Ramos', topic: 'Strengthening the Rising Generation', type: 'speaker' },
      { name: 'Sister Ramos', topic: 'Faith in the Lord Jesus Christ', type: 'speaker' },
      { name: 'Stake Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 243, title: 'Let Us All Press On' },
    closingPrayer: 'Brother Navarro'
  },
  {
    id: 3,
    date: '2026-10-18',
    meetingType: 'testimony',
    presiding: 'Bishop Dela Cruz',
    conducting: 'Sister Castillo',
    announcements: ['Primary program rehearsal after church'],
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Brother Aquino',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
    sacramentAdministration: {
      blessedBy: ['Brother Manalo', 'Brother Cabrera'],
      passedBy: ['Brother Flores', 'Brother Santos', 'Brother Cruz', 'Brother Garcia']
    },
    speakers: [
      { name: 'Congregation', topic: 'Testimonies of the restored gospel', type: 'speaker' },
      { name: 'Ward Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 88, title: 'The Spirit of God Like a Fire Is Burning' },
    closingPrayer: 'Sister Flores'
  },
  {
    id: 2,
    date: '2026-10-11',
    meetingType: 'regular',
    presiding: 'Bishop Dela Cruz',
    conducting: 'Brother Reyes',
    announcements: [
      'Youth activity Wednesday at 7:00 p.m.',
      'Temple recommend interviews with the bishop'
    ],
    openingHymn: { number: 85, title: 'How Firm a Foundation' },
    openingPrayer: 'Brother Manalo',
    wardBusiness: [
      { description: 'Sustaining of a new Sunday School teacher' },
      { description: 'Setting apart of ward missionaries' }
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 176, title: 'While of These Emblems We Partake' },
    sacramentAdministration: {
      blessedBy: ['Brother Bautista', 'Brother Villanueva'],
      passedBy: ['Brother Navarro', 'Brother Aquino', 'Brother Castillo', 'Brother Fernandez']
    },
    speakers: [
      { name: 'Sister Mercado', topic: 'Seeking Personal Revelation', type: 'speaker' },
      { name: 'Ward Quartet', topic: '', type: 'musical-number' },
      { name: 'Brother Salvador', topic: 'Loving Our Neighbors', type: 'speaker' }
    ],
    closingHymn: { number: 249, title: 'Called to Serve' },
    closingPrayer: 'Sister Soriano'
  },
  {
    id: 1,
    date: '2026-05-03',
    meetingType: 'regular',
    presiding: 'Bishop Dela Cruz',
    conducting: 'Brother Reyes',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Castillo',
    wardBusiness: [{ description: 'Sustaining of new Primary president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
    sacramentAdministration: {
      blessedBy: ['Brother Torres', 'Brother Ramos'],
      passedBy: ['Brother Pascual', 'Brother Salvador', 'Brother Mercado', 'Brother Soriano']
    },
    speakers: [
      { name: 'Sister Fernandez', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Youth Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Pascual',
    announcements: ['Ward temple night: May 10']
  }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter((meeting) => meeting.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((meeting) => meeting.id === id) ?? null;
}
