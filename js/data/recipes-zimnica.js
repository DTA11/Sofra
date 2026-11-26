// Zimnica: what goes into jars for the winter (type 'zimnica', not used by the planner).
// serves = how many jars (or heads) one batch gives · jar = the pantry item (ING z) that gets the jars
// jarMl = jar size · jarG = net weight of one full jar (used for nutrition per 100 g) · when = months to make it
// wait = how long before it is ready (shown on the recipe page) · color = colour of the jar in the picture
// Food safety: hot food into hot sterilised jars, then a boiling-water bath (times for 0,5–0,72 l jars);
// low-acid vegetables always get vinegar or lemon juice. Guides: /vodici/ (tegle, omjeri, kupus, čuvanje, pokvarena tegla).
// cu is hidden data only — names and stories never say where something is from.
const n = (bs, en) => ({ note: [bs, en] });
const T = { b: 'trad' };
const O = { opt: 1 };
const Z = { cu: 'svakodnevno', type: 'zimnica', src: T };

// shared steps
const JARS = (what = 'Tegle', en = 'Jars') => [
  `${what} i poklopce operi toplom vodom i deterdžentom i dobro isperi. Tegle stavi u hladnu rernu, zagrij na 120 °C i drži 20 minuta; poklopce prokuhaj 5 minuta. Tegle ostavi u toploj rerni dok ih ne puniš — vruće ide u vruće.`,
  `Wash the ${en.toLowerCase()} and lids in hot soapy water and rinse well. Put the jars in a cold oven, heat to 120 °C and hold for 20 minutes; boil the lids for 5 minutes. Leave the jars in the warm oven until you fill them — hot food goes into hot jars.`, 20];
const BATH = (min, size = '0,5 l') => [
  `Napunjene tegle složi u veliki lonac na krpu ili rešetku, da se ne dodiruju. Nalij vruću vodu 2–3 cm iznad poklopaca, zakuhaj i od trenutka kad voda proključa kuhaj ${min} minuta (tegle od ${size}).`,
  `Stand the filled jars on a cloth or rack in a large pot, not touching. Pour in hot water to 2–3 cm above the lids, bring to the boil and boil for ${min} minutes from the moment it boils (${size.replace(',', '.')} jars).`, min];
const COOL = [
  'Tegle izvadi krpom ili hvataljkom i ostavi na drvenoj dasci, bez propuha, do sutra. Ohlađen poklopac mora biti uvučen i ne smije „klikati“ kad ga pritisneš — takvu teglu stavi u frižider i potroši prvu. Na svaku teglu napiši šta je i kad je napravljena.',
  'Lift the jars out with a cloth or jar tongs and leave them on a wooden board, out of draughts, until the next day. Once cool, the lid must be pulled in and must not click when pressed — put any jar that clicks in the fridge and use it first. Label every jar with what it is and the date.'];
const FILL = (space = 1) => [
  `Vruće puni u vruće tegle do ${String(space).replace('.', ',')} cm ispod ruba. Rub obriši čistom, vlažnom krpom i odmah zatvori novim ili neoštećenim poklopcem.`,
  `Fill hot into the hot jars to ${space} cm below the rim. Wipe the rim with a clean damp cloth and close at once with a new or undamaged lid.`];

export const ZIM_RECIPES = [
  {
    id: 'ajvar', ...Z, main: 'veg', time: 240, serves: 6, jar: 'ajvar', jarMl: 500, jarG: 450, when: [9, 10], color: '#b8361f',
    wait: ['Može se jesti odmah, a najbolji je nakon 2–3 sedmice.', 'Good to eat straight away, best after 2–3 weeks.'],
    bs: 'Ajvar', en: 'Ajvar (roasted pepper relish)',
    ing: [['pepper_red', 5000, 'g', n('mesnate crvene babure', 'fleshy red peppers')], ['eggplant', 1000, 'g'], ['oil', 300, 'ml'], ['vinegar', 100, 'ml', n('9 %', '9 %')], ['salt', 2, 'kasika'], ['sugar', 1, 'kasika', O], ['garlic', 3, 'cen', O]],
    st: [
      ['Paprike i patlidžan operi i osuši. Slaži ih na limove u jednom redu i peci na 220 °C, okrećući, dok koža ne pocrni i ne odvoji se — oko 35 minuta. (Može i na ploči ili žaru.)', 'Wash and dry the peppers and aubergines. Lay them in one layer on trays and roast at 220 °C, turning, until the skin blackens and lifts — about 35 minutes. (A hotplate or grill works too.)', 35],
      ['Pečeno povrće stavi u veliku posudu, pokrij ili zatvori u veliku kesu i ostavi 20 minuta da se „znoji“ — koža će se lako guliti.', 'Put the roasted veg in a large bowl, cover or close in a bag and leave for 20 minutes to sweat — the skins will slip off easily.', 20],
      ['Oguli kožu, izvadi peteljke i sjemenke. Ne ispiraj pod vodom — gubi se ukus. Očišćeno ostavi u cjedilu bar sat vremena (može i preko noći u frižideru) da iscuri sok.', 'Peel off the skins and remove the stalks and seeds. Do not rinse under water — it washes away the flavour. Leave the cleaned flesh in a colander for at least an hour (or overnight in the fridge) to drain.', 60],
      ['Paprike i patlidžan samelji na mašini za meso (krupna ploča) ili sitno isjeckaj nožem.', 'Put the peppers and aubergine through a mincer (coarse plate) or chop them finely with a knife.'],
      ['U širok lonac debelog dna stavi trećinu ulja i povrće. Kuhaj na srednjoj vatri, stalno miješajući drvenom kašikom po dnu, a ostatak ulja dodaj malo-pomalo. Ajvar je gotov kad kašika ostavlja trag po dnu i više ne pušta vodu — obično 1,5–2 sata.', 'Put a third of the oil and the veg into a wide heavy-based pot. Cook over a medium heat, stirring the bottom constantly with a wooden spoon, adding the rest of the oil a little at a time. It is done when the spoon leaves a trail across the bottom and no more water seeps out — usually 1½–2 hours.', 100],
      JARS(),
      ['Na kraju umiješaj so, sirće, šećer i (po želji) zgnječen bijeli luk i kuhaj još 10 minuta. Sirće ne preskači — ono čuva ajvar u tegli.', 'Finally stir in the salt, vinegar, sugar and (if using) crushed garlic and cook for 10 minutes more. Do not leave out the vinegar — it is what keeps ajvar safe in the jar.', 10],
      FILL(1),
      BATH(30),
      COOL,
    ],
    story: ['Jesen miriše na pečene paprike: cijela kuća peče, guli i miješa po cijeli dan, a ajvar se jede do proljeća.', 'Autumn smells of roasting peppers: the whole house roasts, peels and stirs all day, and the ajvar lasts until spring.'],
  },
  {
    id: 'tursija-mijesana', ...Z, main: 'veg', time: 90, serves: 8, jar: 'tursija', jarMl: 720, jarG: 650, when: [9, 10], color: '#c9a43a',
    wait: ['Spremna za 3–4 sedmice.', 'Ready in 3–4 weeks.'],
    bs: 'Miješana turšija', en: 'Mixed pickled vegetables (turšija)',
    ing: [['cauliflower', 1000, 'g'], ['carrot', 500, 'g'], ['pepper', 1000, 'g', n('šilje ili babure', 'long or bell peppers')], ['cucumber', 1000, 'g', n('sitni krastavčići', 'small pickling cucumbers')], ['vinegar', 1000, 'ml', n('9 %, za salamuru', '9 %, for the brine'), ], ['salt', 60, 'g', { note: ['za salamuru', 'for the brine'], eat: 0.4 }], ['sugar', 150, 'g', { note: ['za salamuru', 'for the brine'], eat: 0.4 }], ['mustard_seed', 2, 'kasicica'], ['pepper_black', 30, 'zrno'], ['bay_leaf', 8, 'list'], ['garlic', 8, 'cen', O]],
    st: [
      JARS(),
      ['Karfiol rastavi na cvjetiće, mrkvu isijeci na kolutove, paprike na trake ili ih ostavi cijele (probuši ih viljuškom), krastavčiće operi i odreži vrhove.', 'Break the cauliflower into florets, slice the carrots into rounds, cut the peppers into strips or leave them whole (pierce with a fork), wash the cucumbers and trim the ends.'],
      ['Karfiol i mrkvu blanširaj 2 minute u kipućoj vodi pa ocijedi — ostaju hrskavi, a ljepše se slažu.', 'Blanch the cauliflower and carrot for 2 minutes in boiling water, then drain — they stay crisp and pack better.', 2],
      ['Povrće gusto složi u tegle u slojevima, a između stavi gorušicu, biber, lovor i (po želji) bijeli luk.', 'Pack the veg tightly into the jars in layers, with the mustard seed, peppercorns, bay and (if using) garlic in between.'],
      ['Salamura: 1 l sirćeta (9 %), 2 l vode, so i šećer zakuhaj dok se ne otope. Ne razrjeđuj više od toga — kiselina čuva turšiju.', 'Brine: bring 1 litre of 9 % vinegar, 2 litres of water, the salt and sugar to the boil until dissolved. Do not dilute it more than this — the acid is what preserves the pickles.'],
      ['Vrelu salamuru prelij preko povrća tako da ga pokrije bar 1 cm, a do ruba ostane 1 cm. Kašikom istisni mjehuriće, rub obriši i zatvori.', 'Pour the boiling brine over so it covers the veg by at least 1 cm, leaving 1 cm below the rim. Press out air bubbles with a spoon, wipe the rim and close.'],
      BATH(15, '0,72 l'),
      COOL,
    ],
    story: ['Šarena tegla na zimskom stolu — karfiol, mrkva, paprika i krastavci, uz grah i pečenje.', 'A colourful jar on the winter table — cauliflower, carrot, pepper and cucumber, with beans and roasts.'],
  },
  {
    id: 'kisela-paprika', ...Z, main: 'veg', time: 60, serves: 6, jar: 'kisela_paprika', jarMl: 720, jarG: 650, when: [9, 10], color: '#d8432f',
    wait: ['Spremna za 3 sedmice.', 'Ready in 3 weeks.'],
    bs: 'Kisela paprika', en: 'Pickled peppers',
    ing: [['pepper', 3000, 'g', n('babure ili šilje, čvrste', 'firm bell or long peppers')], ['vinegar', 1000, 'ml', n('9 %, za salamuru', '9 %, for the brine')], ['salt', 60, 'g', { note: ['za salamuru', 'for the brine'], eat: 0.4 }], ['sugar', 200, 'g', { note: ['za salamuru', 'for the brine'], eat: 0.4 }], ['pepper_black', 20, 'zrno'], ['bay_leaf', 6, 'list'], ['mustard_seed', 1, 'kasicica', O]],
    st: [
      JARS(),
      ['Paprike operi. Sitne ostavi cijele i svaku probuši viljuškom na 2–3 mjesta; krupne isijeci na četvrtine i očisti od sjemenki.', 'Wash the peppers. Leave small ones whole and pierce each with a fork in 2–3 places; quarter large ones and remove the seeds.'],
      ['Paprike gusto složi u tegle, s biberom, lovorom i gorušicom.', 'Pack the peppers tightly into the jars with the peppercorns, bay and mustard seed.'],
      ['Salamura: 1 l sirćeta (9 %), 2 l vode, so i šećer zakuhaj. Ne razrjeđuj više.', 'Brine: bring 1 litre of 9 % vinegar, 2 litres of water, the salt and sugar to the boil. Do not dilute it further.'],
      ['Vrelom salamurom prelij paprike tako da budu potpuno pokrivene, do 1 cm ispod ruba. Rub obriši i zatvori.', 'Pour the boiling brine over so the peppers are completely covered, up to 1 cm below the rim. Wipe the rim and close.'],
      BATH(15, '0,72 l'),
      COOL,
    ],
    story: ['Hrskave paprike u kiselom — uz grah, pitu i sve što je masnije.', 'Crisp peppers in vinegar — with beans, pie and anything rich.'],
  },
  {
    id: 'pekmez-sljive', ...Z, main: 'dessert', time: 240, serves: 4, jar: 'pekmez', jarMl: 500, jarG: 550, when: [8, 9], color: '#4a1f2e',
    bs: 'Pekmez od šljiva', en: 'Plum butter (pekmez)',
    ing: [['plums', 5000, 'g', n('zrele, slatke', 'ripe, sweet')], ['sugar', 500, 'g', n('ili bez šećera', 'or no sugar at all')], ['cinnamon', 1, 'kasicica', O], ['cloves', 3, 'kom', O]],
    st: [
      ['Šljive operi, prepolovi i izvadi koštice. Crvljive i pljesnive baci.', 'Wash, halve and stone the plums. Throw away any with worms or mould.'],
      ['Stavi ih u širok lonac debelog dna, poklopi i kuhaj na laganoj vatri 30 minuta dok ne puste sok i ne raskuhaju se.', 'Put them in a wide heavy-based pot, cover and cook gently for 30 minutes until they release their juice and fall apart.', 30],
      ['Otklopi i kuhaj na laganoj vatri 3–4 sata, miješajući po dnu sve češće kako se zgušnjava (ili u tepsiji u rerni na 160 °C, miješaj svakih 30 minuta). Ko voli glatko, na pola kuhanja propasira ili izmiksa.', 'Uncover and cook gently for 3–4 hours, stirring the bottom more and more often as it thickens (or in a roasting tin in the oven at 160 °C, stirring every 30 minutes). For a smooth butter, purée it halfway through.', 200],
      JARS(),
      ['Zadnjih 15 minuta umiješaj šećer i začine. Pekmez je gotov kad kap na hladnom tanjiru ne curi kad ga nagneš i kad kašika stoji u njemu.', 'For the last 15 minutes stir in the sugar and spices. It is done when a drop on a cold plate does not run when tilted and a spoon stands up in it.', 15],
      FILL(1),
      BATH(10),
      COOL,
    ],
    story: ['Kazan ili lonac koji se miješa cijelo popodne — pekmez za palačinke, pite i hljeb s maslacem do sljedeće jeseni.', 'A pot stirred all afternoon — plum butter for pancakes, pies and bread and butter until next autumn.'],
  },
  {
    id: 'dzem-kajsije', ...Z, main: 'dessert', time: 75, serves: 5, jar: 'dzem', jarMl: 370, jarG: 450, when: [6, 7], color: '#e8892f',
    bs: 'Džem od kajsija', en: 'Apricot jam',
    ing: [['apricots', 2000, 'g', n('zrele', 'ripe')], ['sugar', 1000, 'g'], ['lemon', 1, 'kom', n('sok', 'juice')]],
    st: [
      ['Kajsije operi, izvadi koštice i isijeci na četvrtine. Pospi šećerom, prelij limunovim sokom i ostavi 2–3 sata da puste sok.', 'Wash and stone the apricots and cut into quarters. Sprinkle with the sugar, add the lemon juice and leave for 2–3 hours to release their juice.', 150],
      JARS(),
      ['Kuhaj na srednjoj vatri, miješajući i skidajući pjenu, 30–40 minuta. Džem je gotov kad kap na hladnom tanjiru napravi koricu koja se nabora kad je gurneš prstom.', 'Cook over a medium heat, stirring and skimming, for 30–40 minutes. It is done when a drop on a cold plate forms a skin that wrinkles when pushed with a finger.', 35],
      FILL(1),
      BATH(10, '0,37 l'),
      COOL,
    ],
    story: ['Ljeto u tegli — kajsije koje se ne stignu pojesti završe na palačinkama u januaru.', 'Summer in a jar — the apricots nobody got round to eating end up on pancakes in January.'],
  },
  {
    id: 'slatko-jagode', ...Z, main: 'dessert', time: 60, serves: 5, jar: 'dzem', jarMl: 250, jarG: 330, when: [5, 6], color: '#c0262d',
    bs: 'Slatko od jagoda', en: 'Strawberry preserve (slatko)',
    ing: [['strawberries', 1000, 'g', n('sitne i čvrste', 'small and firm')], ['sugar', 1000, 'g'], ['lemon', 1, 'kom', n('sok', 'juice')]],
    st: [
      ['Jagode operi prije nego im skineš peteljke, pa ih ocijedi. Krupne prepolovi.', 'Wash the strawberries before hulling them, then drain. Halve any large ones.'],
      ['U lonac stavi šećer i 2 dl vode i kuhaj 5 minuta dok sirup ne postane gust i proziran.', 'Boil the sugar with 200 ml of water for 5 minutes until the syrup is thick and clear.', 5],
      ['Ubaci jagode i kuhaj lagano 10 minuta, samo protresajući lonac (ne miješaj kašikom da ostanu cijele). Skidaj pjenu. Skloni s vatre i ostavi poklopljeno 4 sata ili preko noći.', 'Add the strawberries and simmer gently for 10 minutes, just shaking the pan (do not stir, so they stay whole). Skim off the foam. Take off the heat and leave covered for 4 hours or overnight.', 10],
      JARS(),
      ['Jagode šupljikavom kašikom izvadi, a sirup kuhaj dok kap ne stoji na tanjiru. Vrati jagode, dodaj limunov sok i kuhaj još 5 minuta.', 'Lift out the strawberries with a slotted spoon and boil the syrup until a drop holds its shape on a plate. Return the fruit, add the lemon juice and boil for 5 minutes more.', 5],
      FILL(1),
      BATH(10, '0,25 l'),
      COOL,
    ],
    story: ['Slatko se služi gostima: kašičica u tanjiriću i čaša hladne vode uz kafu.', 'Slatko is for guests: a spoonful on a little plate and a glass of cold water with the coffee.'],
  },
  {
    id: 'domaci-paradajz-sos', ...Z, main: 'veg', time: 150, serves: 6, jar: 'domaci_sos', jarMl: 500, jarG: 500, when: [7, 8, 9], color: '#c6331f',
    bs: 'Domaći paradajz sos', en: 'Home-made tomato passata',
    ing: [['tomato', 5000, 'g', n('zreli, mesnati', 'ripe, fleshy')], ['salt', 2, 'kasicica'], ['lemon', 3, 'kom', n('sok — 1 kašika po tegli od 0,5 l', 'juice — 1 tbsp per 0.5 l jar')], ['basil', 1, 'sop', O]],
    st: [
      ['Paradajz operi, odreži peteljke i oštećene dijelove i isijeci na četvrtine.', 'Wash the tomatoes, cut out the stalks and any damaged bits and quarter them.'],
      ['Kuhaj u širokom loncu, miješajući, 20 minuta dok se ne raspadne.', 'Cook in a wide pot, stirring, for 20 minutes until it falls apart.', 20],
      ['Propasiraj kroz mašinu za paradajz ili gusto sito, da ostanu koža i sjemenke.', 'Pass through a food mill or fine sieve to remove the skins and seeds.'],
      ['Vrati na vatru i kuhaj lagano 40–60 minuta, dok se ne zgusne koliko voliš. Posoli.', 'Return to the heat and simmer for 40–60 minutes until as thick as you like. Season with salt.', 50],
      JARS(),
      ['U svaku teglu od 0,5 l stavi 1 kašiku limunovog soka (u teglu od 1 l — 2 kašike) i po želji list bosiljka. Paradajz sam nije dovoljno kiseo za teglu — sok se ne smije izostaviti.', 'Put 1 tablespoon of lemon juice in each 0.5 litre jar (2 in a 1 litre jar) and a basil leaf if you like. Tomatoes alone are not acidic enough for jarring — the juice must not be left out.'],
      FILL(1.5),
      BATH(40),
      COOL,
    ],
    story: ['Kad paradajza ima najviše, kuha se za cijelu zimu — za čorbe, sarmu i tjesteninu.', 'When there are more tomatoes than anyone can eat, they get cooked down for the winter — for soups, sarma and pasta.'],
  },
  {
    id: 'kompot-sljive', ...Z, main: 'dessert', time: 60, serves: 6, jar: 'kompot', jarMl: 720, jarG: 700, when: [8, 9], color: '#6b2a55',
    bs: 'Kompot od šljiva', en: 'Plum compote',
    ing: [['plums', 2500, 'g', n('čvrste, zrele', 'firm, ripe')], ['sugar', 500, 'g', n('za sirup', 'for the syrup')], ['cinnamon', 1, 'kom', { opt: 1, note: ['štapić', 'stick'] }], ['cloves', 6, 'kom', O]],
    st: [
      JARS(),
      ['Šljive operi, prepolovi i izvadi koštice (sitne mogu i cijele, probušene viljuškom).', 'Wash, halve and stone the plums (small ones can stay whole, pierced with a fork).'],
      ['Sirup: 2 l vode i šećer zakuhaj dok se šećer ne otopi.', 'Syrup: bring 2 litres of water and the sugar to the boil until the sugar dissolves.'],
      ['Šljive gusto složi u vruće tegle, dodaj po komadić cimeta i klinčić, pa prelij vrućim sirupom do 1,5 cm ispod ruba. Kašikom istisni mjehuriće, rub obriši i zatvori.', 'Pack the plums into the hot jars, add a piece of cinnamon and a clove to each and pour over the hot syrup to 1.5 cm below the rim. Press out the air bubbles, wipe the rim and close.'],
      BATH(25, '0,72 l'),
      COOL,
    ],
    story: ['Zimi se otvori tegla kompota uz kolače, a djeca se svađaju ko će popiti sok.', 'In winter a jar of compote comes out with the cakes, and the children argue over who drinks the juice.'],
  },
  {
    id: 'kiseli-kupus-glavice', ...Z, main: 'veg', time: 90, serves: 10, jar: 'sauerkraut', yieldU: 'head', jarG: 900, when: [10, 11], color: '#d6cf86',
    wait: ['Kiseli se 4–6 sedmica na 15–20 °C, pa se drži na hladnom.', 'Ferments for 4–6 weeks at 15–20 °C, then keep it cold.'],
    bs: 'Kiseli kupus (glavice u buretu)', en: 'Whole-head sauerkraut (in a barrel)',
    ing: [['cabbage', 10, 'glavica', n('tvrde, kasne glavice (oko 10 kg)', 'hard late-season heads (about 10 kg)')], ['salt_coarse', 750, 'g', { note: ['za salamuru i kocene', 'for the brine and the cores'], eat: 0.2 }], ['bay_leaf', 6, 'list'], ['pepper_black', 20, 'zrno'], ['horseradish', 2, 'kasika', { opt: 1, note: ['ili komad korijena', 'or a piece of root'] }]],
    st: [
      ['Treba ti čisto bure ili kanta za hranu od 30–40 l s poklopcem (najbolje sa slavinom na dnu), drvena ili plastična podloga i težak kamen ili posuda s vodom za pritisak. Sve operi vrućom vodom i isperi.', 'You need a clean food-grade barrel or bucket of 30–40 litres with a lid (ideally with a tap at the bottom), a wooden or plastic board and a heavy stone or water-filled container as a weight. Wash everything in hot water and rinse.'],
      ['Glavicama skini vanjske listove (sačuvaj nekoliko lijepih). Nožem izdubi kocen u kupu duboku 4–5 cm i u rupu stavi punu kašiku krupne soli.', 'Remove the outer leaves (keep a few good ones). Cut a cone 4–5 cm deep out of each core and fill the hole with a tablespoon of coarse salt.'],
      ['Glavice gusto složi u bure, rupom prema gore, a između stavi lovor, biber i ren. Odozgo pokrij sačuvanim listovima.', 'Pack the heads tightly into the barrel, holes facing up, with the bay, peppercorns and horseradish in between. Cover the top with the saved leaves.'],
      ['Salamura: na svaki litar hladne prokuhane vode 50 g krupne soli (5 %). Za bure od 30 l treba oko 12 l. Prelij glavice da budu pokrivene bar 5 cm, pa ih pritisni podlogom i kamenom.', 'Brine: 50 g coarse salt for every litre of cold boiled water (5 %). A 30-litre barrel needs about 12 litres. Pour it over so the heads are covered by at least 5 cm, then weigh them down with the board and stone.'],
      ['Bure drži na 15–20 °C. Nakon 3–4 dana počni pretakati: kroz slavinu ili crijevom ispusti 4–5 l salamure i prelij je odozgo. Ponavljaj svaka 2–3 dana prve 3 sedmice, pa jednom sedmično. Bijelu skramu na površini skini.', 'Keep the barrel at 15–20 °C. After 3–4 days start the turning: run off 4–5 litres of brine through the tap or a hose and pour it back over the top. Repeat every 2–3 days for the first 3 weeks, then once a week. Skim off any white film from the surface.'],
      ['Kupus je gotov za 4–6 sedmica, kad je list kiseo i proziran. Tada ga drži na hladnom (ispod 10 °C), uvijek pod salamurom. Glavicu vadi čistim rukama ili hvataljkom.', 'The cabbage is ready in 4–6 weeks, when the leaves are sour and translucent. Then keep it cold (below 10 °C), always under the brine. Take heads out with clean hands or tongs.'],
    ],
    story: ['Bure u podrumu ili na balkonu, pretakanje svaki drugi dan — i sarma za cijelu zimu.', 'A barrel in the cellar or on the balcony, turned every other day — and sarma all winter.'],
  },
  {
    id: 'kiseli-kupus-ribani', ...Z, main: 'veg', time: 60, serves: 6, jar: 'sauerkraut_shred', jarMl: 720, jarG: 700, when: [10, 11], color: '#cfc77a',
    wait: ['Kiseli se 2–4 sedmice na 18–20 °C.', 'Ferments for 2–4 weeks at 18–20 °C.'],
    bs: 'Ribani kiseli kupus u teglama', en: 'Shredded sauerkraut in jars',
    ing: [['cabbage', 5, 'glavica', n('oko 5 kg', 'about 5 kg')], ['salt_coarse', 100, 'g', n('2 % od težine kupusa', '2 % of the cabbage weight')], ['caraway', 1, 'kasicica', O], ['bay_leaf', 4, 'list', O]],
    st: [
      ['Tegle (ili zemljani lonac) operi vrućom vodom i deterdžentom i dobro isperi. Ovaj kupus se ne kuha u teglama — kiseli se sam.', 'Wash the jars (or a crock) in hot soapy water and rinse well. This sauerkraut is not boiled in the jars — it ferments on its own.'],
      ['Kupusu skini vanjske listove i kocen, pa ga izribaj na tanke rezance. Izvagaj ga: na svaki kilogram ide 20 g soli.', 'Remove the outer leaves and core and shred the cabbage thinly. Weigh it: every kilogram gets 20 g of salt.'],
      ['U velikoj posudi kupus izmiješaj sa solju i kimom i gnječi rukama 5–10 minuta, dok ne pusti puno soka.', 'In a large bowl mix the cabbage with the salt and caraway and squeeze it with your hands for 5–10 minutes until it gives off plenty of juice.', 8],
      ['Kupus slaži u tegle sloj po sloj i dobro nabij šakom ili oklagijom, dok ga sok ne pokrije. Do ruba ostavi 3–4 cm. Odozgo stavi list kupusa i nešto teško (manju teglu s vodom), da sve ostane pod sokom.', 'Pack the cabbage into the jars layer by layer, pressing hard with your fist or a rolling pin until the juice covers it. Leave 3–4 cm below the rim. Put a cabbage leaf on top and something heavy (a small jar of water) to keep everything under the juice.'],
      ['Tegle pokrij labavo (poklopac samo prisloni, ne zavrći ga) i stavi na tanjir — sok će curiti. Drži ih na 18–20 °C i svaki dan kupus pritisni čistom kašikom da izađu mjehurići.', 'Cover the jars loosely (rest the lid on, do not screw it down) and stand them on a plate — juice will run over. Keep them at 18–20 °C and press the cabbage down with a clean spoon every day to let the bubbles out.'],
      ['Za 2–4 sedmice kupus je kiseo i prestane vrjeti. Tada tegle zatvori i drži na hladnom (frižider, podrum ispod 10 °C). Ako sok padne ispod kupusa, dolij salamuru (20 g soli na litar vode).', 'In 2–4 weeks the cabbage is sour and stops bubbling. Then close the jars and keep them cold (fridge or a cellar below 10 °C). If the juice drops below the cabbage, top up with brine (20 g salt per litre of water).'],
    ],
    story: ['Kad nema mjesta za bure — kupus u teglama, za podvarak, kupus salatu i jotu.', 'When there is no room for a barrel — sauerkraut in jars, for baked sauerkraut, salad and bean stew.'],
  },
];

// Calendar: what to put up in which month (recipes by `when`) + a note for the months without much to do.
export const ZIM_NOTES = {
  1: ['Pregledaj tegle i potroši prvo one s „klikavim“ poklopcem. Kupus pretoči ako još vrije.', 'Check your jars and use the ones with a clicking lid first. Turn the sauerkraut if it is still bubbling.'],
  2: ['Otvorena tegla ide u frižider. Kupus drži hladno i uvijek pod salamurom.', 'An opened jar goes in the fridge. Keep the sauerkraut cold and always under its brine.'],
  3: ['Kupus troši do proljeća — kad zatopli, omekša. Prazne tegle operi i spremi s poklopcima.', 'Use up the sauerkraut before spring — it softens when it warms up. Wash empty jars and store them with their lids.'],
  4: ['Popiši šta je ostalo od zimnice i koliko je potrošeno — tako znaš koliko tegli praviti ove jeseni.', 'Note what is left and what got eaten — that tells you how many jars to make this autumn.'],
  11: ['Zadnji kupus za kiseljenje. Tegle zimnice složi u hladnu, tamnu ostavu.', 'The last cabbage for sauerkraut. Store the jars in a cool, dark place.'],
  12: ['Kupus je kiseo — vrijeme za sarmu. Pretakanje jednom sedmično.', 'The sauerkraut is sour — time for sarma. Turn the brine once a week.'],
};
