export const SECTION_MAPS = {
  home: [
    { id: 'hm-music', label: 'SOUND' },
    { id: 'hm-artist', label: 'ARTIST' },
    { id: 'hm-pilgrimage', label: 'JOURNEY' },
    { id: 'hm-gallery', label: 'GALLERY' },
    { id: 'hm-upcoming', label: 'DATES' },
    { id: 'hm-events', label: 'BOOKING' },
    { id: 'hm-contact', label: 'CONTACT' },
  ],
  label: [
    { id: 'vision', label: 'VISION' },
    { id: 'releases', label: 'RELEASES' },
    { id: 'roster', label: 'ROSTER' },
    { id: 'events', label: 'EVENTS' },
    { id: 'kingdom', label: 'KINGDOM' },
    { id: 'radio', label: 'RADIO' },
    { id: 'connect', label: 'CONNECT' },
  ],
  epk: [
    { id: 'bio', label: 'ARTIST' },
    { id: 'latest-release', label: 'RELEASE' },
    { id: 'pilgrimage', label: 'JOURNEY' },
    { id: 'epk-gallery', label: 'GALLERY' },
    { id: 'sound', label: 'SOUND' },
    { id: 'stats', label: 'EVIDENCE' },
    { id: 'press', label: 'WITNESS' },
    { id: 'sc-feat', label: 'SET' },
    { id: 'mixes', label: 'MIXES' },
    { id: 'live', label: 'STAGE' },
    { id: 'tech', label: 'TECH' },
    { id: 'hosp', label: 'RIDER' },
    { id: 'shows', label: 'DATES' },
    { id: 'contact', label: 'CONTACT' },
  ],
};

export const DARK_PAGES = ['label'];

export const NAV_CONFIG = {
  pages: ['landing', 'home', 'label', 'epk'],
  defaultPage: 'landing',
  links: {
    home: 'Home',
    label: 'Label',
    epk: 'EPK',
  },
};
