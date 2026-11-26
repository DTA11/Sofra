// Cooking guides: plain static pages in /vodici/ (bs) and /guides/ (en), linked from recipes that use `ing`
// or are listed in `rec`. grill: 1 = shown on the Roštilj page (#/rostilj).
// date = publish date; the app only links guides whose date has passed.
// Grill guide texts: tools/grill-guides/bs.mjs + en.mjs → node tools/grill-guides/build.mjs
// bs/en: [title, url, short line for cards]
const MINCE = ['cevapi', 'pljeskavica', 'punjena-pljeskavica', 'mijesano-meso'];
const SKEWERS = ['raznjici-svinjski', 'raznjici-pileci'];
const ALL_GRILL = [...MINCE, ...SKEWERS, 'vjesalica-punjena', 'pileca-krilca-zar', 'pileci-batci-zar', 'junetina-odrezak-zar', 'janjeci-kotleti-zar', 'riba-zar-blitva', 'skusa-zar', 'lignje-zar', 'povrce-zar', 'punjeni-sampinjoni-zar'];
export const GUIDES = [
  { id: 'riza', date: '2026-11-25', ing: ['rice'],
    bs: ['Kako skuhati rižu da bude rastresita', '/vodici/kako-skuhati-rizu/'],
    en: ['How to cook rice so it comes out fluffy', '/guides/how-to-cook-rice/'] },
  { id: 'rostilj-meso', date: '2026-11-26', ing: [], grill: 1, rec: ['vjesalica-punjena', 'junetina-odrezak-zar', 'janjeci-kotleti-zar', 'pileci-batci-zar', 'pileca-krilca-zar', 'riba-zar-blitva'],
    bs: ['Koje meso za roštilj i koliko po osobi', '/vodici/izbor-mesa-za-rostilj/', 'Komad za svako jelo, masnoća, kupovina i količine po osobi.'],
    en: ['Which meat for the grill and how much per person', '/guides/choosing-meat-for-the-grill/', 'The cut for each dish, fat, buying and amounts per person.'] },
  { id: 'rostilj-oblikovanje', date: '2026-11-26', ing: [], grill: 1, rec: [...MINCE, ...SKEWERS, 'vjesalica-punjena'],
    bs: ['Ćevapi, pljeskavice i ražnjići: mljevenje, rezanje i oblikovanje', '/vodici/cevapi-pljeskavice-raznjici/', 'Mljevenje, so i voda, mijesenje, veličine i nabadanje na štapić.'],
    en: ['Ćevapi, patties and skewers: mincing, cutting and shaping', '/guides/shaping-cevapi-patties-skewers/', 'Mincing, salt and water, kneading, sizes and threading skewers.'] },
  { id: 'rostilj-marinade', date: '2026-11-26', ing: [], grill: 1, rec: [...SKEWERS, 'pileca-krilca-zar', 'pileci-batci-zar', 'janjeci-kotleti-zar', 'mijesano-meso', 'povrce-zar'],
    bs: ['Marinade za roštilj: šta ide u njih i koliko dugo', '/vodici/marinade-za-rostilj/', 'Šest osnovnih marinada, vrijeme po vrsti mesa i kada soliti.'],
    en: ['Grill marinades: what goes in and how long', '/guides/grill-marinades/', 'Six basic marinades, times for each meat and when to salt.'] },
  { id: 'rostilj-vatra', date: '2026-11-26', ing: [], grill: 1, rec: ALL_GRILL,
    bs: ['Vatra i žar: kako peći na roštilju', '/vodici/vatra-i-zar/', 'Ćumur ili drvo, jačina žara, dvije zone, vremena i odmaranje.'],
    en: ['Fire and coals: how to cook on the grill', '/guides/grill-fire-and-heat/', 'Charcoal or wood, heat, two zones, times and resting.'] },
  { id: 'rostilj-salamurenje', date: '2026-11-26', ing: ['smoked_beef'], grill: 1, rec: [],
    bs: ['Salamurenje i sušenje mesa kod kuće', '/vodici/salamurenje-i-susenje-mesa/', 'Kratka salamura za roštilj, suho i mokro salamurenje, sušenje.'],
    en: ['Curing and drying meat at home', '/guides/curing-and-drying-meat/', 'A short brine for the grill, dry and wet curing, drying.'] },
  { id: 'rostilj-dimljenje', date: '2026-11-26', ing: [], grill: 1, rec: [],
    bs: ['Dimljenje mesa i ribe: toplo i hladno', '/vodici/dimljenje-mesa-i-ribe/', 'Toplo i hladno dimljenje, vrsta drveta, temperature i trajanje.'],
    en: ['Smoking meat and fish: hot and cold', '/guides/smoking-meat-and-fish/', 'Hot and cold smoking, wood, temperatures and times.'] },
  { id: 'rostilj-prilozi', date: '2026-11-26', ing: [], grill: 1, rec: ['urnebes', 'umak-jogurt-luk', 'cevapi', 'mijesano-meso'],
    bs: ['Prilozi i umaci za roštilj', '/vodici/prilozi-i-umaci-za-rostilj/', 'Lepinje, luk, kajmak, ajvar, urnebes, salate — šta uz koje meso.'],
    en: ['Sides and sauces for the grill', '/guides/grill-sides-and-sauces/', 'Flatbread, onion, kajmak, ajvar, urnebes, salads — what with which meat.'] },
];
export const GUIDE_INDEX = { bs: '/vodici/', en: '/guides/' };
export const liveGuides = (now = new Date()) => GUIDES.filter((g) => new Date(g.date + 'T00:00:00') <= now);
