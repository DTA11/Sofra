// Cooking guides: plain static pages in /vodici/ (bs) and /guides/ (en), linked from recipes that use `ing`.
// date = publish date; the app only links guides whose date has passed.
export const GUIDES = [
  { id: 'riza', date: '2026-11-25', ing: ['rice'],
    bs: ['Kako skuhati rižu da bude rastresita', '/vodici/kako-skuhati-rizu/'],
    en: ['How to cook rice so it comes out fluffy', '/guides/how-to-cook-rice/'] },
];
export const GUIDE_INDEX = { bs: '/vodici/', en: '/guides/' };
export const liveGuides = (now = new Date()) => GUIDES.filter((g) => new Date(g.date + 'T00:00:00') <= now);
