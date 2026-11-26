// Užina za ponijeti: cold snacks to pack for school or work (type 'snack', pack: 1).
// Built from what the menu already buys: bread, cheese, eggs, fruit, a jar of ajvar or pekmez — nothing new to cook.
// On weekdays the planner first packs yesterday's leftovers (a piece of pie, cold breaded or roast meat — PACK_LEFT
// in planner.js), otherwise one of these. Amounts are for 4 people.
// cu is hidden data only — names and stories never say where a dish is from.
const n = (bs, en) => ({ note: [bs, en] });
const T = { b: 'trad' };
const O = { opt: 1 };
const U = { cu: 'svakodnevno', type: 'snack', pack: 1, serves: 4, src: T };
const WRAP = ['Zamotaj u papir za pečenje ili stavi u kutiju za užinu.', 'Wrap in baking paper or put in a lunch box.'];
const COLD = ['Zamotaj i drži na hladnom; ako je toplo ili se nosi duže od 4 sata, stavi i rashladni uložak.', 'Wrap and keep cool; on a warm day or if it is carried for more than 4 hours, pack it with an ice pack.'];

export const UZINA_RECIPES = [
  {
    id: 'uzina-sendvic-sir', ...U, main: 'cheese', time: 10, kid: 1,
    bs: 'Sendvič sa sirom i krastavcem', en: 'Cheese and cucumber sandwich',
    ing: [['bread', 8, 'kriska'], ['butter', 30, 'g', O], ['cheese_semi', 160, 'g'], ['cucumber', 1, 'kom'], ['tomato', 1, 'kom', O]],
    st: [['Kriške tanko namaži maslacem, pa složi sir i tanko narezan krastavac (paradajz stavi u posebnu kesicu, da hljeb ne raskvasi).', 'Spread the slices thinly with butter and layer on the cheese and thinly sliced cucumber (pack tomato separately so the bread does not go soggy).'], WRAP],
    story: ['Najobičnija užina — i ona koja se uvijek pojede do kraja.', 'The plainest packed snack — and the one that always gets finished.'],
  },
  {
    id: 'uzina-sendvic-salama', ...U, main: 'chicken', time: 10, kid: 1,
    bs: 'Sendvič s pilećom salamom', en: 'Chicken salami sandwich',
    ing: [['bread', 8, 'kriska'], ['chicken_salami', 160, 'g'], ['cheese_semi', 80, 'g', O], ['pickles', 4, 'kom', O], ['mayonnaise', 1, 'kasika', O]],
    st: [['Kriške po želji tanko namaži majonezom, složi salamu, sir i narezane kisele krastavce, pa poklopi drugom kriškom.', 'Spread the slices thinly with mayonnaise if you like, layer on the salami, cheese and sliced gherkins and top with the second slice.'], COLD],
    story: ['Školski sendvič iz kutije — salama, krastavčić i kriška sira.', 'The school sandwich from the lunch box — salami, a gherkin and a slice of cheese.'],
  },
  {
    id: 'uzina-hljeb-sir-paprika', ...U, main: 'cheese', time: 5,
    bs: 'Hljeb, bijeli sir i paprika', en: 'Bread, white cheese and pepper',
    ing: [['bread', 8, 'kriska'], ['feta', 200, 'g'], ['pepper', 2, 'kom', n('ili krastavac', 'or cucumber')]],
    st: [['Sir isijeci na kocke i stavi u kutiju, papriku na trake, a hljeb zamotaj posebno — tako ništa ne raskvasi.', 'Cut the cheese into cubes and put it in a box, slice the pepper into strips and wrap the bread separately — that way nothing goes soggy.'], COLD],
    story: ['Užina radnika i đaka: hljeb, komad sira i nešto iz bašte.', 'The worker’s and schoolchild’s snack: bread, a piece of cheese and something from the garden.'],
  },
  {
    id: 'uzina-jaja-hljeb', ...U, main: 'eggs', time: 15, kid: 1,
    bs: 'Kuhana jaja, hljeb i krastavac', en: 'Boiled eggs, bread and cucumber',
    ing: [['eggs', 4, 'kom'], ['bread', 4, 'kriska'], ['cucumber', 1, 'kom', n('ili paprika', 'or pepper')], ['salt', null, '']],
    st: [['Jaja skuhaj tvrdo (10 minuta od ključanja) i ohladi ih u hladnoj vodi. Najlakše je skuhati ih uveče.', 'Hard-boil the eggs (10 minutes from boiling) and cool them in cold water. Easiest to do the evening before.', 10], ['Jaja spakuj neoguljena, uz kriške hljeba, krastavac na štapiće i malo soli u papiriću.', 'Pack the eggs in their shells with the bread, cucumber sticks and a little salt in a twist of paper.'], COLD],
    story: ['Jaje u ljusci se ne razbije u torbi i drži do ručka.', 'An egg in its shell does not get squashed in the bag and keeps you going until lunch.'],
  },
  {
    id: 'uzina-ajvar-sir', ...U, main: 'cheese', time: 5,
    bs: 'Hljeb s ajvarom i bijelim sirom', en: 'Bread with ajvar and white cheese',
    ing: [['bread', 8, 'kriska'], ['ajvar', 8, 'kasika'], ['feta', 160, 'g']],
    st: [['Kriške namaži ajvarom, pospi izmrvljenim sirom i poklopi drugom kriškom.', 'Spread the slices with ajvar, scatter over the crumbled cheese and top with the second slice.'], WRAP],
    story: ['Tegla ajvara iz zimnice — kašika na hljeb i užina je gotova.', 'A jar of ajvar from the winter store — a spoonful on bread and the snack is ready.'],
  },
  {
    id: 'uzina-tuna', ...U, main: 'fish', time: 10,
    bs: 'Sendvič s tunjevinom', en: 'Tuna sandwich',
    ing: [['bread', 8, 'kriska'], ['tuna', 2, 'kom', n('konzerve', 'tins')], ['mayonnaise', 2, 'kasika', n('ili gusti jogurt', 'or thick yoghurt')], ['pickles', 2, 'kom', O], ['lemon', 0.5, 'kom', O]],
    st: [['Tunjevinu ocijedi i izmiješaj s majonezom, sitno sjeckanim krastavčićima i malo limunovog soka.', 'Drain the tuna and mix with the mayonnaise, finely chopped gherkins and a squeeze of lemon.'], ['Namaži na kriške i poklopi.', 'Spread on the slices and sandwich together.'], COLD],
    story: ['Konzerva iz ostave postane užina za pet minuta.', 'A tin from the cupboard turns into a packed snack in five minutes.'],
  },
  {
    id: 'uzina-voce-orasi', ...U, main: 'dessert', time: 5, kid: 1,
    bs: 'Voće i orasi', en: 'Fruit and walnuts',
    ing: [['apple', 2, 'kom', n('ili kruške, mandarine', 'or pears, mandarins')], ['banana', 2, 'kom'], ['walnuts', 80, 'g']],
    st: [['Jabuke operi i isijeci na kriške (prelij s par kapi limuna da ne potamne), banane spakuj cijele, orahe u kesicu.', 'Wash and slice the apples (a few drops of lemon stop them browning), pack the bananas whole and the walnuts in a little bag.'], WRAP],
    story: ['Užina koja se ne kvari i ne mrvi po torbi.', 'A snack that does not spoil and does not crumble all over the bag.'],
  },
  {
    id: 'uzina-jogurt-zob', ...U, main: 'cheese', time: 5, kid: 1,
    bs: 'Zobene pahuljice s jogurtom u tegli', en: 'Overnight oats with yoghurt in a jar',
    ing: [['yogurt', 500, 'g'], ['oats', 100, 'g'], ['honey', 2, 'kasika'], ['apple', 1, 'kom', O]],
    st: [['Uveče u male tegle ili kutije rasporedi pahuljice, prelij jogurtom, dodaj med i (po želji) rendanu jabuku. Zatvori i ostavi u frižideru preko noći.', 'In the evening divide the oats between small jars or boxes, pour over the yoghurt, add the honey and (if you like) grated apple. Close and leave in the fridge overnight.'], ['Ujutro samo uzmi teglu i kašiku.', 'In the morning just take the jar and a spoon.'], COLD],
    story: ['Pripremi se uveče, a ujutro je samo uzmeš iz frižidera.', 'Made the night before — in the morning you just take it from the fridge.'],
  },
  {
    id: 'uzina-kikiriki-banana', ...U, main: 'dessert', time: 5, kid: 1,
    bs: 'Integralni hljeb s maslacem od kikirikija i bananom', en: 'Wholegrain bread with peanut butter and banana',
    ing: [['bread_whole', 8, 'kriska'], ['peanut_butter', 4, 'kasika'], ['banana', 2, 'kom']],
    st: [['Kriške namaži maslacem od kikirikija, složi kolutove banane i poklopi.', 'Spread the slices with peanut butter, lay on banana slices and sandwich together.'], WRAP],
    story: ['Sitost do kasnog popodneva — za trening poslije škole.', 'Keeps you full until late afternoon — for training after school.'],
  },
  {
    id: 'uzina-pasteta', ...U, main: 'chicken', time: 5,
    bs: 'Hljeb s paštetom i kiselim krastavcima', en: 'Bread with pâté and gherkins',
    ing: [['bread', 8, 'kriska'], ['pate', 120, 'g'], ['pickles', 4, 'kom']],
    st: [['Kriške namaži paštetom, složi narezane kisele krastavce i poklopi.', 'Spread the slices with pâté, lay on sliced gherkins and sandwich together.'], COLD],
    story: ['Pašteta i krastavčić — užina s gradilišta i iz školske torbe.', 'Pâté and a gherkin — the snack of building sites and school bags.'],
  },
];
