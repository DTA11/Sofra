// "Slatko" without a book source — written fresh, classic home amounts.
const n = (bs, en) => ({ note: [bs, en] });
const T = { b: 'trad' };

export const SWEET_RECIPES = [
  {
    id: 'palacinke', cu: 'balkan', type: 'dessert', sub: 'kolac', main: 'dessert', time: 30, serves: 4, kid: 1,
    yieldNote: ['oko 12 palačinki', 'about 12 pancakes'],
    bs: 'Palačinke s pekmezom ili džemom', en: 'Palačinke with plum butter or jam',
    ing: [['flour', 250, 'g'], ['milk', 500, 'ml'], ['eggs', 3, 'kom'], ['sugar', 1, 'kasika'], ['salt', 1, 'prst'], ['oil', 3, 'kasika'], ['pekmez', 300, 'g', n('ili džem', 'or jam')], ['walnuts', 80, 'g', { opt: 1 }]],
    st: [
      ['Umuti jaja, mlijeko, šećer i so, pa postepeno umiješaj brašno i 2 kašike ulja. Ostavi 15 minuta.', 'Whisk eggs, milk, sugar and salt, then gradually beat in the flour and 2 tbsp oil. Rest 15 minutes.', 15],
      ['Na vreloj, lagano nauljenoj tavi peci tanke palačinke, oko 1 minutu sa svake strane.', 'Cook thin pancakes in a hot, lightly oiled pan, about 1 minute per side.'],
      ['Namaži pekmezom, po želji pospi orasima, savij.', 'Spread with plum butter, sprinkle with walnuts if you like, and roll.'],
    ],
    story: ['Najbrži način da se otvori tegla zimnice — pekmez od šljiva i palačinke su nedjeljni par.', 'The quickest way to open a jar of zimnica — plum butter and palačinke are a Sunday pair.'],
    src: T,
  },
  {
    id: 'tiramisu', cu: 'italian', type: 'dessert', sub: 'torta', main: 'dessert', time: 30, serves: 8, occ: ['novagodina', 'rodjendan'],
    pan: { shape: 'rect', w: 30, h: 20 },
    bs: 'Tiramisu', en: 'Tiramisù',
    ing: [['mascarpone', 500, 'g'], ['eggs', 4, 'kom'], ['sugar', 100, 'g'], ['ladyfingers', 300, 'g'], ['coffee', 300, 'ml', n('ohlađen espresso', 'cooled espresso')], ['cocoa', 2, 'kasika']],
    st: [
      ['Žumanjke umuti sa šećerom dok ne pobijele, umiješaj mascarpone.', 'Beat the yolks with the sugar until pale, then fold in the mascarpone.'],
      ['Bjelanjke umuti u čvrst snijeg i lagano umiješaj u kremu.', 'Whisk the whites to stiff peaks and fold them in gently.'],
      ['Piškote kratko umači u kafu i slaži u kalup naizmjenično s kremom.', 'Dip the ladyfingers briefly in coffee and layer with the cream.'],
      ['Ostavi u frižideru najmanje 6 sati, pospi kakaom pred služenje.', 'Chill at least 6 hours; dust with cocoa before serving.', 360],
    ],
    story: ['„Podigni me“ — desert iz Veneta, mlađi nego što se misli (1960-e), a danas na svakom slavlju.', '“Pick me up” — a dessert from the Veneto, younger than you’d think (1960s), now at every celebration.'],
    src: T,
  },
  {
    id: 'vanilice', cu: 'balkan', type: 'dessert', sub: 'sitni', main: 'dessert', time: 75, serves: 60, eq: ['oven'], occ: ['bozic', 'novagodina', 'bajram'],
    yieldNote: ['oko 60 komada', 'about 60 pieces'],
    bs: 'Vanilice', en: 'Vanilice (jam-filled walnut cookies)',
    ing: [['flour', 500, 'g'], ['butter', 250, 'g'], ['sugar', 150, 'g'], ['walnuts', 100, 'g', n('mljeveni', 'ground')], ['eggs', 1, 'kom', n('žumanjak', 'yolk')], ['lemon', 1, 'kom', n('korica', 'zest')], ['dzem', 200, 'g', n('kiseliji', 'tart jam')], ['powder_sugar', 100, 'g'], ['vanilla_sugar', 2, 'kesica']],
    st: [
      ['Zamijesi brašno, maslac, šećer, orahe, žumanjak i limunovu koricu u glatko tijesto. Ohladi 30 minuta.', 'Knead the flour, butter, sugar, walnuts, yolk and lemon zest into a smooth dough. Chill 30 minutes.', 30],
      ['Razvij na 3–4 mm i vadi male kolutove.', 'Roll to 3–4 mm and cut small rounds.'],
      ['Peci na 180 °C 10–12 minuta — trebaju ostati blijedi.', 'Bake at 180 °C for 10–12 minutes — they should stay pale.', 11],
      ['Još tople spajaj po dvije džemom i uvaljaj u šećer u prahu pomiješan s vanilin šećerom.', 'While warm, sandwich pairs with jam and roll in icing sugar mixed with vanilla sugar.'],
    ],
    story: ['Sitni kolač koji se peče danima prije praznika i čuva u limenoj kutiji — najbolji su treći dan.', 'A little cookie baked days before the holidays and kept in a tin — best on day three.'],
    src: T,
  },
  {
    id: 'sampita', cu: 'balkan', type: 'dessert', sub: 'kolac', main: 'dessert', time: 75, serves: 16, eq: ['oven'], occ: ['novagodina', 'rodjendan'],
    pan: { shape: 'rect', w: 35, h: 25 },
    bs: 'Šampita', en: 'Šampita (meringue slice)',
    ing: [['puff_pastry', 500, 'g'], ['eggs', 8, 'kom', n('samo bjelanjci', 'whites only')], ['sugar', 400, 'g'], ['lemon', 0.5, 'kom', n('sok', 'juice')], ['powder_sugar', 2, 'kasika']],
    st: [
      ['Lisnato tijesto podijeli na dva dijela, razvij na veličinu pleha i ispeci posebno na 200 °C oko 15 minuta.', 'Divide the puff pastry in two, roll to the size of the tray and bake each at 200 °C for about 15 minutes.', 15],
      ['Šećer i 150 ml vode kuhaj 5–6 minuta u gust sirup (kap u vodi se stvrdne).', 'Boil the sugar with 150 ml water for 5–6 minutes to a thick syrup (a drop sets in cold water).', 6],
      ['Bjelanjke umuti u čvrst snijeg i u tankom mlazu ulij vreli sirup, muteći još 5 minuta. Dodaj limunov sok.', 'Whisk the whites stiff and pour in the hot syrup in a thin stream, whisking 5 more minutes. Add the lemon juice.', 5],
      ['Na jednu koru izruči fil, pokrij drugom, ohladi 2 sata, pospi šećerom u prahu i reži nauljenim nožem.', 'Spread the meringue over one sheet, cover with the other, chill 2 hours, dust with icing sugar and cut with an oiled knife.', 120],
    ],
    story: ['Kolač iz poslastičarnica bivše Jugoslavije — „šam“ od francuskog šampanjca ili od šamije, zavisno koga pitaš.', 'A café classic from former Yugoslavia — named either after champagne or after the šamija headscarf, depending on whom you ask.'],
    src: T,
  },
  {
    id: 'posna-pita-jabuke', cu: 'balkan', type: 'dessert', sub: 'kolac', main: 'dessert', time: 70, serves: 12, eq: ['oven'], occ: ['bozic', 'posno'], kid: 1,
    pan: { shape: 'rect', w: 30, h: 20 },
    bs: 'Posni kolač s jabukama', en: 'Vegan apple cake (posni)',
    ing: [['flour', 400, 'g'], ['oil', 120, 'ml'], ['sugar', 150, 'g'], ['baking_powder', 1, 'kesica'], ['apple', 1, 'kg'], ['cinnamon', 1, 'kasicica'], ['walnuts', 100, 'g', { opt: 1 }], ['powder_sugar', 2, 'kasika']],
    st: [
      ['Jabuke izrendaj, pomiješaj s cimetom i 50 g šećera.', 'Grate the apples and mix with the cinnamon and 50 g sugar.'],
      ['Brašno, prašak, ostatak šećera, ulje i 200 ml mineralne vode zamijesi u mekano tijesto i podijeli na dva dijela.', 'Mix flour, baking powder, remaining sugar, oil and 200 ml sparkling water into a soft dough; divide in two.'],
      ['Pola tijesta utisni u kalup, preko jabuke (iscijeđene) i orahe, pa drugu polovinu izmrvi odozgo.', 'Press half into the tin, cover with the squeezed apples and walnuts, then crumble the rest over the top.'],
      ['Peci na 180 °C 40 minuta. Ohlađeno pospi šećerom u prahu.', 'Bake at 180 °C for 40 minutes. Dust with icing sugar once cool.', 40],
    ],
    story: ['Kolač za posne dane — bez jaja, mlijeka i maslaca, a niko ne primijeti.', 'A cake for fasting days — no eggs, milk or butter, and nobody notices.'],
    src: T,
  },
  {
    id: 'reform-torta', cu: 'balkan', type: 'dessert', sub: 'torta', main: 'dessert', time: 150, serves: 12, eq: ['oven'], occ: ['novagodina', 'rodjendan'],
    pan: { shape: 'round', d: 26 },
    bs: 'Reform torta', en: 'Reform torte',
    ing: [['eggs', 8, 'kom'], ['sugar', 400, 'g'], ['walnuts', 200, 'g', n('mljeveni', 'ground')], ['flour', 30, 'g'], ['chocolate', 200, 'g'], ['butter', 250, 'g']],
    st: [
      ['Bjelanjke umuti sa 200 g šećera u čvrst snijeg, lagano umiješaj orahe i brašno.', 'Whisk the whites with 200 g sugar to stiff peaks; fold in the walnuts and flour.'],
      ['Podijeli na 3 dijela i ispeci 3 kore u kalupu od 26 cm, svaku na 170 °C oko 15 minuta.', 'Divide into 3 and bake 3 layers in a 26 cm tin, each at 170 °C for about 15 minutes.', 15],
      ['Žumanjke sa 200 g šećera kuhaj na pari uz miješanje 10 minuta, dodaj otopljenu čokoladu i ohladi.', 'Cook the yolks with 200 g sugar over a water bath, stirring, for 10 minutes; add melted chocolate and cool.', 10],
      ['Maslac umuti pjenasto i postepeno dodaj krem. Fil rasporedi između kora i po vrhu.', 'Beat the butter until fluffy and gradually add the cream. Spread between the layers and over the top.'],
      ['Ostavi preko noći u frižideru.', 'Chill overnight.', 480],
    ],
    story: ['Torta iz bečke tradicije koja je postala jugoslavenski novogodišnji standard — kore od bjelanjaka, fil od žumanjaka: ništa ne propada.', 'A Viennese-style torte that became a Yugoslav New Year standard — whites for the layers, yolks for the cream: nothing wasted.'],
    src: T,
  },
  {
    id: 'tarte-tatin', cu: 'french', type: 'dessert', sub: 'kolac', main: 'dessert', time: 75, serves: 8, eq: ['oven'],
    pan: { shape: 'round', d: 24 },
    bs: 'Tarte Tatin', en: 'Tarte Tatin',
    ing: [['apple', 1.2, 'kg'], ['sugar', 150, 'g'], ['butter', 200, 'g', n('100 g za karamel, 100 g za tijesto', '100 g for the caramel, 100 g for the pastry')], ['flour', 200, 'g'], ['salt', 1, 'prst']],
    st: [
      ['Brašno, 100 g hladnog maslaca, so i 3 kašike hladne vode brzo spoji u tijesto. Ohladi 30 minuta.', 'Rub the flour, 100 g cold butter and salt together with 3 tbsp cold water. Chill 30 minutes.', 30],
      ['U tavi za rernu rastopi šećer s 100 g maslaca u svijetli karamel.', 'In an ovenproof pan melt the sugar with 100 g butter to a light caramel.'],
      ['Jabuke oguli, isijeci na četvrtine i gusto poredaj u karamel. Kuhaj 15 minuta.', 'Peel and quarter the apples, pack them tightly into the caramel and cook 15 minutes.', 15],
      ['Pokrij tijestom, ugurni rubove i peci na 190 °C 30 minuta. Prevrni na tanjir dok je toplo.', 'Cover with the pastry, tuck in the edges and bake at 190 °C for 30 minutes. Turn out onto a plate while warm.', 30],
    ],
    story: ['Po legendi, sestre Tatin su u žurbi zaboravile tijesto i stavile ga odozgo — i nastala je „naopaka“ pita.', 'Legend says the Tatin sisters forgot the pastry in a rush and put it on top — creating the upside-down tart.'],
    src: T,
  },
];
