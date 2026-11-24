// Bosnian (ijekavica, latinica) first, English second.
const S = {
  bs: {
    appTagline: 'Sedmični jelovnik iz domaće kuhinje',
    tabPlan: 'Plan', tabRecipes: 'Recepti', tabSweets: 'Slatko', tabPantry: 'Ostava', tabShop: 'Kupovina',
    settings: 'Postavke', back: 'Nazad', close: 'Zatvori', save: 'Sačuvaj', cancel: 'Odustani', search: 'Traži…',
    newPlan: 'Novi plan', regen: 'Napravi novi plan', emptyPlan: 'Još nema plana. Odaberi kuhinje u postavkama i napravi prvi plan.',
    swap: 'Zamijeni', cooked: 'Skuhano', cookedQ: 'Označeno kao skuhano — potrošene svježe namirnice skinute iz ostave.',
    leftover: 'Ostaci od', dessert: 'Desert', soup: 'Čorba', main: 'Glavno jelo', side: 'Prilog', iftar: 'Iftar',
    servings: 'Porcija', persons: 'osoba', min: 'min', approx: '≈',
    ingredients: 'Sastojci', steps: 'Priprema', story: 'Priča', source: 'Izvor', cook: 'Kuhaj', addToPlan: 'U plan',
    fav: 'Omiljeno', favs: 'Omiljena jela', optional: 'po želji', toTaste: 'po ukusu', perPerson: 'po osobi',
    cookMode: 'Kuhanje', step: 'Korak', of: 'od', next: 'Dalje', prev: 'Nazad', done: 'Gotovo', timer: 'Tajmer',
    timerDone: 'Tajmer je gotov!', wakeOn: 'Ekran ostaje upaljen', wakeOff: 'Ekran se može ugasiti',
    pantryIntro: 'Označi šta imaš kod kuće. Plan koristi ostavu i zimnicu, a kupljene stvari ovdje dolaze same.',
    zimnica: 'Zimnica', jars: 'tegle', haveAll: 'Sve', haveNone: 'Ništa',
    shopIntro: 'Jedan spisak za cijelu sedmicu, po odjeljcima prodavnice.',
    youHave: 'Već imaš u ostavi', extra: 'Dodaj stavku…', bought: 'Kupljeno', clearBought: 'Ukloni kupljeno',
    share: 'Podijeli', whatsapp: 'WhatsApp', viber: 'Viber', copy: 'Kopiraj', copied: 'Kopirano',
    pdf: 'PDF', pdfHint: 'U prozoru za štampu odaberi „Sačuvaj kao PDF“.',
    filters: 'Filteri', clear: 'Očisti', results: 'jela',
    fCuisine: 'Kuhinja', fType: 'Vrsta jela', fMain: 'Glavni sastojak', fMeal: 'Obrok', fTime: 'Vrijeme', fEquip: 'Oprema', fDiet: 'Ishrana', fOcc: 'Prilika', fSeason: 'Sezonsko sada',
    noPork: 'Bez svinjetine', posno: 'Posno', posnoFish: 'Posno (riba dozvoljena)', kid: 'Za djecu', veg: 'Vegetarijansko',
    t30: 'do 30 min', t60: 'do 1 h', t60p: 'preko 1 h',
    jnaTitle: 'JNA kuhinja', jnaIntro: 'Recepti iz vojnih kazana, svedeni na kućnu mjeru. Jedno dugme — i porcije su za cijelu četu.',
    forCompany: 'Za četu', companyN: 'porcija', homeSize: 'Kućna mjera', kazanHint: 'Treba kazan od najmanje', liters: 'l',
    holidays: 'Praznični meniji', setOnDay: 'Postavi na dan', addMenuShop: 'Na spisak',
    sweetsIntro: 'Kolači, torte, sitni kolači i orijentalni slatkiši. Preračunaj količine za svoj kalup.',
    pan: 'Kalup', panOrig: 'U receptu', panMine: 'Moj kalup', rect: 'Pravougaoni', round: 'Okrugli', factor: 'Količine ×',
    seasonNow: 'Sada je sezona', planSettings: 'Pravila plana',
    household: 'Broj osoba u kući', cuisineMix: 'Mješavina kuhinja', never: 'nikad', rarely: 'rijetko', often: 'često', mostly: 'najčešće',
    rules: 'Najviše puta sedmično', noRepeat: 'Bez ponavljanja jela', weeks: 'sedmice',
    weekdayTime: 'Radnim danima najviše', leftovers: 'Planirani ostaci (kuhaj za 2 dana)', soupDaily: 'Čorba uz svaki ručak',
    dessertsWeek: 'Deserta sedmično', posnoDays: 'Posni dani', equipOwned: 'Moja oprema',
    preferKid: 'Prednost jelima za djecu', mode: 'Način', modeNormal: 'Obično', modeRamazan: 'Ramazan / iftar',
    ramazanNote: 'Ramazanski način: svaki dan iftar (čorba + glavno jelo), bez svinjetine, hurme na spisku.',
    language: 'Jezik', backup: 'Sigurnosna kopija', exportData: 'Izvezi (JSON)', importData: 'Uvezi', importOk: 'Podaci uvezeni.', importBad: 'Datoteka nije ispravna.',
    reset: 'Obriši sve podatke', resetQ: 'Sigurno? Brišu se plan, ostava, omiljena jela i postavke.',
    install: 'Instaliraj Sofru', installHint: 'Na iPhoneu: Podijeli → Dodaj na početni ekran.',
    pickDay: 'Na koji dan?', noMatch: 'Nijedno jelo ne odgovara pravilima — ublaži filtere.',
    sourcesTitle: 'Izvori', about: 'O aplikaciji',
    aboutText: 'Sofra radi bez računa i bez servera: svi podaci ostaju na ovom telefonu. Napravi sigurnosnu kopiju prije promjene telefona.',
    weekOf: 'Sedmica od', today: 'danas', items: 'stavki', estimate: 'procjena',
    navHome: 'Početna', getApp: 'Instaliraj', iosTitle: 'Dodaj Sofru na početni ekran', iosStep1: 'Dodirni', iosShare: 'Podijeli', iosStep1b: '(na novijim iPhoneima u meniju ···)',
    iosStep2: 'Skrolaj dole i dodirni', iosAdd: 'Dodaj na početni ekran', iosStep3: 'Dodirni', iosDone: 'Dodaj', otherStep1: 'Otvori meni preglednika, pa',
    homeTitle: 'Šta ćemo danas kuhati?', homeLede: 'Sofra slaže sedmični jelovnik iz bosanske, balkanske, italijanske i francuske kuhinje — od onoga što već imaš u ostavi i zimnici.',
    homeCta: 'Napravi sedmični plan', homeInstall: 'Instaliraj na telefon', homeOpen: 'Otvori moj plan',
    featTitle: 'Sve za kuhinju na jednom mjestu', fromKitchen: 'Iz naše kuhinje', allRecipes: 'Svi recepti',
    f1t: 'Sedmični plan', f1d: 'Jedan dodir i sedmica je isplanirana — po tvojim pravilima, sezoni i broju ukućana.',
    f2t: 'Ostava i zimnica', f2d: 'Ajvar, turšija, pekmez… Plan koristi ono što imaš i iste namirnice kroz više dana.',
    f3t: 'Spisak za kupovinu', f3d: 'Po odjeljcima prodavnice, šalje se na WhatsApp ili Viber. Kupljeno ide u ostavu.',
    f4t: 'Kuhanje korak po korak', f4d: 'Veliki tekst, tajmeri i ekran koji se ne gasi dok kuhaš.',
    f5t: 'Ramazan i praznici', f5d: 'Iftar svaki dan, bajramski, božićni i novogodišnji meniji.',
    f6t: 'Slatko i JNA kuhinja', f6d: 'Hurmašice, tufahije, baklava — i vojnička čorba za cijelu četu.',
    howTitle: 'Kao aplikacija, bez app storea', how1: 'Otvori moja-sofra stranicu na telefonu.', how2: 'Dodirni „Instaliraj“ (na iPhoneu: Podijeli → Dodaj na početni ekran).', how3: 'Sofra je na početnom ekranu i radi i bez interneta.',
    privacyTitle: 'Bez računa, bez reklama', privacyText: 'Tvoj plan, ostava i omiljena jela ostaju samo na tvom telefonu. Nema registracije, nema praćenja.',
    footer: 'Sofra — domaća kuhinja za svaki dan.',
    todayOnTable: 'Danas na sofri', thisWeek: 'Ova sedmica', recipe: 'Recept', greet: 'Prijatno!', dishes: 'jela',
    printPlan: 'Jelovnik', printShop: 'Spisak za kupovinu', printRecipes: 'Recepti',
  },
  en: {
    appTagline: 'A weekly menu from the home kitchen',
    tabPlan: 'Plan', tabRecipes: 'Recipes', tabSweets: 'Sweets', tabPantry: 'Pantry', tabShop: 'Shopping',
    settings: 'Settings', back: 'Back', close: 'Close', save: 'Save', cancel: 'Cancel', search: 'Search…',
    newPlan: 'New plan', regen: 'Make a new plan', emptyPlan: 'No plan yet. Pick your cuisines in settings and make the first plan.',
    swap: 'Swap', cooked: 'Cooked', cookedQ: 'Marked as cooked — fresh ingredients used up were removed from the pantry.',
    leftover: 'Leftovers of', dessert: 'Dessert', soup: 'Soup', main: 'Main', side: 'Side', iftar: 'Iftar',
    servings: 'Servings', persons: 'people', min: 'min', approx: '≈',
    ingredients: 'Ingredients', steps: 'Method', story: 'Story', source: 'Source', cook: 'Cook', addToPlan: 'Add to plan',
    fav: 'Favourite', favs: 'Favourites', optional: 'optional', toTaste: 'to taste', perPerson: 'per person',
    cookMode: 'Cooking', step: 'Step', of: 'of', next: 'Next', prev: 'Back', done: 'Done', timer: 'Timer',
    timerDone: 'Timer finished!', wakeOn: 'Screen stays on', wakeOff: 'Screen may turn off',
    pantryIntro: 'Tick what you have at home. The plan uses your pantry and preserves, and bought items land here automatically.',
    zimnica: 'Preserves (zimnica)', jars: 'jars', haveAll: 'All', haveNone: 'None',
    shopIntro: 'One list for the whole week, sorted by shop section.',
    youHave: 'Already in your pantry', extra: 'Add an item…', bought: 'Bought', clearBought: 'Remove bought',
    share: 'Share', whatsapp: 'WhatsApp', viber: 'Viber', copy: 'Copy', copied: 'Copied',
    pdf: 'PDF', pdfHint: 'In the print dialog choose “Save as PDF”.',
    filters: 'Filters', clear: 'Clear', results: 'dishes',
    fCuisine: 'Cuisine', fType: 'Dish type', fMain: 'Main ingredient', fMeal: 'Meal', fTime: 'Time', fEquip: 'Equipment', fDiet: 'Diet', fOcc: 'Occasion', fSeason: 'In season now',
    noPork: 'No pork', posno: 'Fasting (vegan)', posnoFish: 'Fasting (fish allowed)', kid: 'Kid-friendly', veg: 'Vegetarian',
    t30: 'under 30 min', t60: 'under 1 h', t60p: 'over 1 h',
    jnaTitle: 'JNA kitchen', jnaIntro: 'Recipes from the army field kettles, scaled to a home kitchen. One button — and it’s enough for a whole company.',
    forCompany: 'For a company', companyN: 'servings', homeSize: 'Home size', kazanHint: 'You need a kettle of at least', liters: 'l',
    holidays: 'Holiday menus', setOnDay: 'Put on a day', addMenuShop: 'To list',
    sweetsIntro: 'Cakes, tortes, small cookies and Ottoman sweets. Scale the amounts to your own tin.',
    pan: 'Tin', panOrig: 'In the recipe', panMine: 'My tin', rect: 'Rectangular', round: 'Round', factor: 'Amounts ×',
    seasonNow: 'In season now', planSettings: 'Plan rules',
    household: 'People in the household', cuisineMix: 'Cuisine mix', never: 'never', rarely: 'rarely', often: 'often', mostly: 'mostly',
    rules: 'At most per week', noRepeat: 'No repeated dishes for', weeks: 'weeks',
    weekdayTime: 'On weekdays at most', leftovers: 'Planned leftovers (cook for 2 days)', soupDaily: 'Soup with every lunch',
    dessertsWeek: 'Desserts per week', posnoDays: 'Fasting days', equipOwned: 'My equipment',
    preferKid: 'Prefer kid-friendly dishes', mode: 'Mode', modeNormal: 'Normal', modeRamazan: 'Ramadan / iftar',
    ramazanNote: 'Ramadan mode: an iftar every day (soup + main), no pork, dates on the list.',
    language: 'Language', backup: 'Backup', exportData: 'Export (JSON)', importData: 'Import', importOk: 'Data imported.', importBad: 'That file isn’t valid.',
    reset: 'Delete all data', resetQ: 'Sure? Plan, pantry, favourites and settings will be deleted.',
    install: 'Install Sofra', installHint: 'On iPhone: Share → Add to Home Screen.',
    pickDay: 'Which day?', noMatch: 'No dish fits the rules — loosen the filters.',
    sourcesTitle: 'Sources', about: 'About',
    aboutText: 'Sofra works without accounts or servers: all data stays on this phone. Make a backup before switching phones.',
    weekOf: 'Week of', today: 'today', items: 'items', estimate: 'estimate',
    navHome: 'Home', getApp: 'Install', iosTitle: 'Add Sofra to your Home Screen', iosStep1: 'Tap', iosShare: 'Share', iosStep1b: '(in the ··· menu on newer iPhones)',
    iosStep2: 'Scroll down and tap', iosAdd: 'Add to Home Screen', iosStep3: 'Tap', iosDone: 'Add', otherStep1: 'Open the browser menu, then',
    homeTitle: 'What shall we cook today?', homeLede: 'Sofra builds your weekly menu from Bosnian, Balkan, Italian and French home cooking — using what is already in your pantry and preserves.',
    homeCta: 'Make a weekly plan', homeInstall: 'Install on your phone', homeOpen: 'Open my plan',
    featTitle: 'Everything for the kitchen in one place', fromKitchen: 'From our kitchen', allRecipes: 'All recipes',
    f1t: 'Weekly plan', f1d: 'One tap and the week is planned — by your rules, the season and the size of your household.',
    f2t: 'Pantry & preserves', f2d: 'Ajvar, pickles, plum butter… The plan uses what you have and reuses ingredients across days.',
    f3t: 'Shopping list', f3d: 'Sorted by shop section, sent to WhatsApp or Viber. Bought items go into the pantry.',
    f4t: 'Step-by-step cooking', f4d: 'Big text, timers and a screen that stays on while you cook.',
    f5t: 'Ramadan & holidays', f5d: 'An iftar every day, plus Bajram, Christmas and New Year menus.',
    f6t: 'Sweets & JNA kitchen', f6d: 'Hurmašice, tufahije, baklava — and army soup for a whole company.',
    howTitle: 'Like an app, without an app store', how1: 'Open the moja-sofra site on your phone.', how2: 'Tap “Install” (on iPhone: Share → Add to Home Screen).', how3: 'Sofra sits on your home screen and works offline too.',
    privacyTitle: 'No accounts, no ads', privacyText: 'Your plan, pantry and favourites stay on your phone only. No sign-up, no tracking.',
    footer: 'Sofra — home cooking for every day.',
    todayOnTable: 'On the table today', thisWeek: 'This week', recipe: 'Recipe', greet: 'Enjoy!', dishes: 'dishes',
    printPlan: 'Menu', printShop: 'Shopping list', printRecipes: 'Recipes',
  },
};

const LISTS = {
  cu: {
    bosanska: ['Stara bosanska', 'Old Bosnian'], balkan: ['Balkanska', 'Balkan'], italian: ['Italijanska', 'Italian'],
    french: ['Francuska', 'French'], jna: ['JNA kuhinja', 'JNA army kitchen'],
  },
  type: {
    main: ['Glavno jelo', 'Main'], soup: ['Čorba / supa', 'Soup'], pie: ['Pita', 'Savoury pie'], salad: ['Salata', 'Salad'],
    dessert: ['Slatko', 'Sweet'], breakfast: ['Doručak', 'Breakfast'],
  },
  sub: {
    kolac: ['Kolači', 'Cakes & slices'], torta: ['Torte', 'Tortes'], sitni: ['Sitni kolači', 'Small cookies'],
    orijentalni: ['Orijentalni', 'Ottoman sweets'], kasika: ['Kašikom', 'Spoon desserts'],
  },
  main: {
    beef: ['Junetina', 'Beef'], chicken: ['Piletina', 'Chicken'], lamb: ['Janjetina', 'Lamb'], pork: ['Svinjetina', 'Pork'], fish: ['Riba', 'Fish'],
    beans: ['Grah', 'Beans'], potato: ['Krompir', 'Potato'], broccoli: ['Brokula', 'Broccoli'], spinach: ['Špinat', 'Spinach'],
    veg: ['Povrće', 'Vegetables'], pasta: ['Tjestenina', 'Pasta'], rice: ['Riža', 'Rice'], cheese: ['Sir', 'Cheese'], dessert: ['Slatko', 'Sweet'],
  },
  meal: { breakfast: ['Doručak', 'Breakfast'], lunch: ['Ručak', 'Lunch'], dinner: ['Večera', 'Dinner'], iftar: ['Iftar', 'Iftar'], dessert: ['Desert', 'Dessert'] },
  eq: { oven: ['Rerna', 'Oven'], pressure: ['Ekspres lonac', 'Pressure cooker'], sac: ['Sač / peka', 'Sač / peka'], kazan: ['Kazan', 'Field kettle'], grill: ['Roštilj', 'Grill'] },
  occ: {
    bajram: ['Bajram', 'Bajram'], iftar: ['Iftar', 'Iftar'], bozic: ['Božić', 'Christmas'], novagodina: ['Nova godina', 'New Year'],
    rodjendan: ['Rođendan', 'Birthday'], posno: ['Posno', 'Fasting'],
  },
  sec: {
    meat: ['Meso i riba', 'Meat & fish'], veg: ['Voće i povrće', 'Fruit & veg'], dairy: ['Mliječno i jaja', 'Dairy & eggs'],
    bakery: ['Pekara', 'Bakery'], dry: ['Suha roba', 'Dry goods'], spice: ['Začini', 'Spices'], jar: ['Tegle i konzerve', 'Jars & tins'],
    frozen: ['Smrznuto', 'Frozen'], other: ['Ostalo', 'Other'],
  },
  kind: { beef: ['Junetina', 'Beef'], chicken: ['Piletina/puretina', 'Chicken/turkey'], lamb: ['Janjetina', 'Lamb'], pork: ['Svinjetina', 'Pork'], fish: ['Riba', 'Fish'] },
  // units: [bs singular, bs plural(2-4), bs plural(5+), en singular, en plural]
  unit: {
    g: ['g', 'g', 'g', 'g', 'g'], kg: ['kg', 'kg', 'kg', 'kg', 'kg'], ml: ['ml', 'ml', 'ml', 'ml', 'ml'], l: ['l', 'l', 'l', 'l', 'l'], dl: ['dl', 'dl', 'dl', 'dl', 'dl'],
    kom: ['kom', 'kom', 'kom', '', ''], kasika: ['kašika', 'kašike', 'kašika', 'tbsp', 'tbsp'], kasicica: ['kašičica', 'kašičice', 'kašičica', 'tsp', 'tsp'],
    cen: ['čen', 'čena', 'čenova', 'clove', 'cloves'], glavica: ['glavica', 'glavice', 'glavica', '', ''], sop: ['vezica', 'vezice', 'vezica', 'bunch', 'bunches'],
    prst: ['prstohvat', 'prstohvata', 'prstohvata', 'pinch', 'pinches'], kesica: ['kesica', 'kesice', 'kesica', 'sachet', 'sachets'],
    kriska: ['kriška', 'kriške', 'kriški', 'slice', 'slices'], jufka: ['jufka', 'jufke', 'jufki', 'sheet', 'sheets'], list: ['list', 'lista', 'listova', 'leaf', 'leaves'],
    zrno: ['zrno', 'zrna', 'zrna', 'corn', 'corns'], saka: ['šaka', 'šake', 'šaka', 'handful', 'handfuls'], '': ['', '', '', '', ''],
  },
};

export const DAYS = {
  bs: ['Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota', 'Nedjelja'],
  en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
};
export const MONTHS = {
  bs: ['januar', 'februar', 'mart', 'april', 'maj', 'juni', 'juli', 'august', 'septembar', 'oktobar', 'novembar', 'decembar'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

let lang = 'bs';
export const setLang = (l) => { lang = l === 'en' ? 'en' : 'bs'; document.documentElement.lang = lang === 'bs' ? 'bs' : 'en'; };
export const getLang = () => lang;
export const t = (k) => S[lang][k] ?? S.bs[k] ?? k;
export const L = (group, key) => { const v = LISTS[group]?.[key]; return v ? v[lang === 'bs' ? 0 : 1] : key; };
export const keys = (group) => Object.keys(LISTS[group]);
export const tx = (pair) => (Array.isArray(pair) ? pair[lang === 'bs' ? 0 : 1] : pair?.[lang] ?? '');
export function unitLabel(u, q) {
  const v = LISTS.unit[u] || [u, u, u, u, u];
  if (lang === 'en') return q === 1 ? v[3] : v[4];
  if (q == null) return v[0];
  const whole = Math.abs(q - Math.round(q)) < 1e-9;
  if (!whole) return v[1];
  const n = Math.round(q) % 100, d = n % 10;
  if (d === 1 && n !== 11) return v[0];
  if (d >= 2 && d <= 4 && (n < 12 || n > 14)) return v[1];
  return v[2];
}
