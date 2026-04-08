/**
 * EPK (Electronic Press Kit) Content
 * All text, links, and data for the EPK page
 */

export const EPK_SECTIONS = {
  // Section 01: Artist/Bio
  bio: {
    number: '01',
    label: 'Who Is He',
    title: 'THE ARTIST',
    tagline: 'Sound as Gate into Eternity',
    quote: '"What happens inside a YEHOSUA HIMSELF set is yet to be comprehended."',
    biography: `There are artists who play music. And then there is Yehosua Himself. His name — rooted in the ancient Hebrew for "The Lord is Salvation" — is not branding. It is a promise delivered through 52 inches of subwoofer at frequencies that bypass thought entirely. Born of a collision between raw intention and sonic devotion, he emerged not merely as a performer but as someone who understands that a crowd gathered under speakers is one of the oldest forms of human communion.`,
    influences: [
      'Lisa Kaufmann',
      'Charlotte de Witte',
      'Christian Craken',
      'Mekkanikka'
    ],
    journeyHighlight: {
      title: 'The Sonic Journey · 2025',
      text: 'In January 2025, he made it literal — crossing the Alps on foot, south to Tarifa at the edge of Africa, north to Copenhagen, then down to Rome. Over 10,000 km. No tour bus. A backpack and a pair of decks.',
      link: 'Read the full journey →'
    }
  },

  // Section 02: Latest Release
  latestRelease: {
    number: '02',
    label: 'Sound of God Recordings',
    title: 'LATEST RELEASE',
    name: 'SONIC WANDERER LP',
    track: 'IT\'S ME',
    format: 'Single',
    label: 'Sound of God Recordings',
    year: '2025',
    soundcloudUrl: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2292147281&color=%23f2e6e0&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&show_playcount=false&liking=false&sharing=false&buying=false&download=false'
  },

  // Section 03: Journey/Pilgrimage
  pilgrimage: {
    number: '03',
    label: 'The Sonic Wanderer',
    title: 'THE JOURNEY',
    description: 'Electronic DJ walks by foot 10,000 km over the Alp Mountains, and across Europe.',
    fullDescription: 'On January 1st, 2025, YEHOSUA HIMSELF left the Alps on foot. No tour bus. No manager. A backpack, a pair of decks, and a route drawn across the spine of Europe — and back.',
    stages: [
      { number: '01', name: 'Berchtesgaden', location: 'Alps, Germany', date: 'Jan 1 2025 · Departure', distance: 'Start · 0 km' },
      { number: '02', name: 'Tarifa', location: 'Spain', description: 'Edge of Africa', distance: '~2,800 km south' },
      { number: '03', name: 'Copenhagen', location: 'Denmark', description: 'Northern reach', distance: '~3,500 km north' },
      { number: '04', name: 'Kingdom', location: 'Festival Stage', description: 'Peak & closing', distance: '~1,200 km south' },
      { number: '05', name: 'Rome', location: 'Italy', description: 'Eternal City', distance: '~2,500 km south' },
      { number: '06', name: 'Berchtesgaden', location: 'Alps, Germany', description: 'The Return', distance: '~1,000 km north · Circle complete' }
    ],
    stats: [
      { icon: '+', number: '10,000', label: 'Kilometres walked' },
      { icon: '+', number: '10', label: 'Countries crossed on foot' },
      { icon: '+', number: '15', label: 'Months of sonic journey' },
      { icon: '+', number: '70', label: 'Festival & Club appearances' }
    ]
  },

  // Section 04: Gallery
  gallery: {
    number: '04',
    label: 'Sonic Moments',
    title: 'GALLERY',
    images: [
      { id: 1, title: 'Alpine Ascent', description: 'Starting the journey' },
      { id: 2, title: 'Desert Sands', description: 'Tarifa crossing' },
      { id: 3, title: 'Northern Lights', description: 'Copenhagen arrival' },
      { id: 4, title: 'Stage Presence', description: 'Kingdom Festival' },
      { id: 5, title: 'Roman Echoes', description: 'Eternal City' },
      { id: 6, title: 'Return Home', description: 'Circle complete' }
    ]
  },

  // Section 05: Sound
  sound: {
    number: '05',
    label: 'Sonic Identity',
    title: 'SOUND',
    description: 'Techno · Psytrance · Ambient · Industrial',
    genres: [
      { name: 'Techno', percentage: 45 },
      { name: 'Psytrance', percentage: 30 },
      { name: 'Ambient', percentage: 15 },
      { name: 'Industrial', percentage: 10 }
    ]
  },

  // Section 06: Statistics/Evidence
  stats: {
    number: '06',
    label: 'By The Numbers',
    title: 'EVIDENCE',
    blocks: [
      { number: '300+', label: 'Sets Performed' },
      { number: '10', label: 'Countries' },
      { number: '8k', label: 'Peak Listeners' },
      { number: '25k', label: 'Total Followers' },
      { number: '12', label: 'Releases' }
    ]
  },

  // Section 07: Press/Witness
  press: {
    number: '07',
    label: 'Press & Reviews',
    title: 'WHAT THEY WITNESSED',
    quotes: [
      {
        text: 'A DJ who moves between genres not as a party trick but as a practitioner of total sonic consciousness. His sets do not blend — they transfix.',
        source: 'DJ Mag International',
        year: '2025'
      },
      {
        text: 'The kind of technical precision and emotional depth that redefines what a DJ set can be. Pure intention. Pure sound.',
        source: 'Resident Advisor',
        year: '2025'
      },
      {
        text: 'YEHOSUA HIMSELF represents the new wave of artists for whom electronic music is ceremony, not entertainment.',
        source: 'Pacha Ibiza',
        year: '2025'
      }
    ]
  },

  // Section 08: Featured Set
  featuredSet: {
    number: '08',
    label: 'Featured Performance',
    title: 'KINGDOM FESTIVAL SET',
    date: 'August 2025',
    soundcloudUrl: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2292147281&color=%23f2e6e0&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&show_playcount=false&liking=false&sharing=false&buying=false&download=false'
  },

  // Section 09: Mixes
  mixes: {
    number: '09',
    label: 'Audio Journey',
    title: 'MIXES',
    mixes: [
      {
        title: 'Sonic Wanderer Mix Vol. 1',
        date: 'January 2025',
        duration: '120 min',
        soundcloudUrl: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2292147281&color=%23f2e6e0&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&show_playcount=false&liking=false&sharing=false&buying=false&download=false'
      },
      {
        title: 'Alpine Sessions',
        date: 'February 2025',
        duration: '90 min',
        soundcloudUrl: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2292147281&color=%23f2e6e0&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&show_playcount=false&liking=false&sharing=false&buying=false&download=false'
      },
      {
        title: 'Desert Frequencies',
        date: 'March 2025',
        duration: '110 min',
        soundcloudUrl: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2292147281&color=%23f2e6e0&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&show_playcount=false&liking=false&sharing=false&buying=false&download=false'
      }
    ]
  },

  // Section 10: Live/Stage
  live: {
    number: '10',
    label: 'Performance Formats',
    title: 'LIVE PERFORMANCE',
    formats: [
      { name: 'Club Set', duration: '2-4 hours', requiredCaps: 'Full Funktion One or equivalent' },
      { name: 'Festival Slot', duration: '60-90 minutes', requiredCaps: 'Festival-grade PA system' },
      { name: 'Special Event', duration: 'Custom', requiredCaps: 'Consultation required' }
    ],
    requirements: {
      setup: 'Require 2 hours minimum setup time',
      soundcheck: 'Mandatory 45-minute soundcheck',
      crew: '1 dedicated sound engineer minimum'
    }
  },

  // Section 11: Tech Rider
  techRider: {
    number: '11',
    label: 'Technical Specifications',
    title: 'TECH RIDER',
    sections: [
      {
        category: 'DJ Equipment',
        items: [
          'Pioneer DJM-900NXS2 Mixer (or equivalent)',
          'Pioneer CDJ-2000NXS2 (x2) or Turntables',
          'Technics SL-1200MK7 Turntables (optional)',
          'Serato DJ Pro / Rekordbox compatible setup',
          '2x Monitor speakers minimum',
          'XLR cables (provided by artist)',
          'RCA adapters & spares'
        ]
      },
      {
        category: 'Audio System',
        items: [
          'Funktion One system (preferred)',
          'Allen & Heath or Soundcraft mixer backup',
          'Full-range PA with subwoofer array',
          'Separate monitor mix system',
          'Ground stack speakers for outdoor venues',
          'Minimum SPL: 95-105dB'
        ]
      },
      {
        category: 'Monitoring',
        items: [
          'Dedicated monitor mix engineer',
          'Stage monitors (2x 12" or larger)',
          'In-ear monitor system (optional)',
          'Beat sync capability',
          'Real-time frequency monitoring'
        ]
      },
      {
        category: 'Lighting & Stage',
        items: [
          'Elevated DJ booth (minimum 1m height)',
          'Appropriate DJ booth lighting',
          'Stage lighting coordination',
          'Clear sightline to dancefloor',
          'Adequate space for equipment (3m x 2m minimum)',
          'Stable, level platform'
        ]
      }
    ]
  },

  // Section 12: Hospitality Rider
  hospitalityRider: {
    number: '12',
    label: 'Accommodations & Logistics',
    title: 'HOSPITALITY RIDER',
    sections: [
      {
        category: 'Accommodation',
        items: [
          '4-star hotel or equivalent within 15 mins of venue',
          'Private room (double bed minimum)',
          'Ensuite bathroom',
          'WiFi access',
          'Daily housekeeping',
          'Late checkout (2 PM minimum)',
          'Arrangements for +1 guest when applicable'
        ]
      },
      {
        category: 'Transport',
        items: [
          'Airport transfers (arrival/departure)',
          'Ground transportation between hotel & venue',
          'Parking at venue for crew/artist',
          'Access to rental car if needed',
          'Fuel reimbursement for travel over 50km'
        ]
      },
      {
        category: 'Catering',
        items: [
          'Full meal before performance (4 hours prior)',
          'Vegetarian/Vegan options available',
          'Fresh fruit & water backstage',
          'Green room with seating',
          'Coffee/tea station',
          'Post-show meal or snacks',
          'Special dietary requests accommodated'
        ]
      },
      {
        category: 'Backstage',
        items: [
          'Dedicated green room or lounge',
          'Climate control',
          'Mirror & seating area',
          'Secure equipment storage',
          'Private toilet facilities',
          'Phone charging stations'
        ]
      }
    ]
  },

  // Section 13: Shows/Dates
  shows: {
    number: '13',
    label: 'Calendar',
    title: 'CONFIRMED DATES',
    events: [
      {
        date: 'April 19, 2026',
        venue: 'Fabric Club',
        location: 'London, UK',
        type: 'confirmed',
        time: '22:00 - 06:00'
      },
      {
        date: 'May 3, 2026',
        venue: 'Awakenings Festival',
        location: 'Amsterdam, Netherlands',
        type: 'festival',
        time: 'TBA'
      },
      {
        date: 'May 17, 2026',
        venue: 'Silo',
        location: 'Copenhagen, Denmark',
        type: 'confirmed',
        time: '23:00 - 06:00'
      },
      {
        date: 'June 7, 2026',
        venue: 'ENTER. Ibiza',
        location: 'Ibiza, Spain',
        type: 'festival',
        time: 'TBA'
      },
      {
        date: 'July 4, 2026',
        venue: 'Tomorrowland',
        location: 'Boom, Belgium',
        type: 'festival',
        time: 'TBA'
      },
      {
        date: 'August 8, 2026',
        venue: 'Berghain',
        location: 'Berlin, Germany',
        type: 'confirmed',
        time: '00:00 - 08:00'
      }
    ]
  },

  // Section 14: Contact
  contact: {
    number: '14',
    label: 'Get In Touch',
    title: 'BOOKING & CONTACT',
    contacts: [
      {
        label: 'Festival & Agency Bookings',
        name: 'Management',
        email: 'booking@yehosua.com',
        note: 'Festival slots · Club nights · Agency partnerships · Tours'
      },
      {
        label: 'Direct Contact',
        name: 'Yehosua Himself',
        email: 'yehosuahimself@gmail.com',
        note: 'Press, collaborations & inquiries'
      }
    ],
    message: 'For partnerships, press inquiries, or special project requests, please contact us directly.'
  }
}

export const EPK_NAV_ITEMS = [
  { label: 'Artist', href: '#bio' },
  { label: 'Journey', href: '#pilgrimage' },
  { label: 'Sound', href: '#sound' },
  { label: 'Mixes', href: '#mixes' },
  { label: 'Rider', href: '#tech' },
  { label: 'Dates', href: '#shows' }
]

export const EPK_COLORS = {
  gold: '#c0a86e',
  dark: '#0a0804',
  text: '#f2e6e0',
  dim: '#8b7355'
}
