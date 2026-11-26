// Grill guides, English. Built into guides/<slug>/index.html by tools/grill-guides/build.mjs.
// Same order and slugs index as bs.mjs (guides are paired by position).
const rec = (id, name) => `<li><a href="/#/recipe/${id}">${name}</a></li>`;

export const EN = {
  lang: 'en', dir: 'guides', other: 'vodici', eyebrow: 'Guide · Grill', all: 'All guides', menu: 'Weekly menu', recipes: 'Recipes',
  guidesNav: 'Guides', more: 'More on grilling', indexTitle: 'Cooking guides', indexLede: 'Home-cooking basics step by step: ratios, portions, times and what to do when something goes wrong.',
  basics: 'Basics', grill: 'Grill', grillLede: 'From the butcher to the table: choosing meat, shaping, marinades, the fire, smoking, curing and sides.',
  guides: [
    {
      slug: 'choosing-meat-for-the-grill',
      title: 'Which meat for the grill and how much per person',
      metaTitle: 'Which meat for the grill: cuts, fat and amount per person | Sofra',
      desc: 'Which cut to buy for ćevapi, patties, skewers, steaks and grilled fish, what to look for at the butcher and how much meat you need per person.',
      card: 'The cut for each dish, fat, buying and amounts per person.',
      lede: 'On the grill meat cooks fast over a strong fire, so it needs a little fat and a cut that does not turn tough. Lean breast and leg need a marinade and attention; neck, shoulder and chicken thighs forgive mistakes.',
      body: `
      <div class="box">
        <h2>In short</h2>
        <ol>
          <li>For mince (ćevapi, patties) take meat with about 20 % fat — beef shoulder, neck or brisket.</li>
          <li>For skewers: pork neck, boned chicken thighs, or chicken breast in a marinade.</li>
          <li>For steaks: sirloin, rib-eye or chuck, 2–3 cm thick.</li>
          <li>Allow 250–300 g raw meat per adult when the grill is the main course.</li>
          <li>Buy the meat a day ahead so it has time in the marinade or salt.</li>
        </ol>
      </div>

      <h2>Which cut for what</h2>
      <table>
        <thead><tr><th>Dish</th><th>Best cut</th><th>Why</th></tr></thead>
        <tbody>
          <tr><td>Ćevapi</td><td>beef: shoulder, neck, flank; or half beef, half lamb</td><td>enough fat to stay juicy, binds well</td></tr>
          <tr><td>Pljeskavica (patty)</td><td>beef, or beef with pork neck (2 : 1)</td><td>pork adds juiciness and softness</td></tr>
          <tr><td>Pork skewers</td><td>pork neck (collar)</td><td>marbled with fat, does not dry out</td></tr>
          <tr><td>Chicken skewers</td><td>boned thighs; breast only in a marinade</td><td>thighs are juicier, breast dries easily</td></tr>
          <tr><td>Stuffed loin, pork steaks</td><td>pork loin, pork neck</td><td>loin is lean — stuff it or cook it briefly</td></tr>
          <tr><td>Beef steak</td><td>sirloin, rib-eye, chuck</td><td>tender cuts that take a strong fire</td></tr>
          <tr><td>Lamb</td><td>chops, boned leg for skewers</td><td>the fat on the edge crisps nicely</td></tr>
          <tr><td>Chicken on the bone</td><td>legs, thighs, wings</td><td>cooked slowly beside the coals</td></tr>
          <tr><td>Fish</td><td>whole bream, sea bass, mackerel, trout; squid</td><td>a whole fish with skin does not fall apart on the grate</td></tr>
        </tbody>
      </table>
      <p>Cuts for long cooking — shin, stewing beef, ribs full of connective tissue — stay tough on the grill. Keep them for the pot, or slice them thin and marinate overnight.</p>

      <h2>How much meat per person</h2>
      <p>Amounts are raw weight, boneless unless stated. Grilling takes off about a quarter of the weight.</p>
      <table>
        <thead><tr><th>What</th><th>Per adult</th><th>For 4</th></tr></thead>
        <tbody>
          <tr><td>Grill as the main course (mixed grill)</td><td>250–300 g</td><td>1–1.2 kg</td></tr>
          <tr><td>With plenty of sides and salads</td><td>180–200 g</td><td>750–800 g</td></tr>
          <tr><td>Ćevapi (25–30 g each)</td><td>8–10 pieces</td><td>about 1 kg meat</td></tr>
          <tr><td>Patty</td><td>1 of 200–250 g</td><td>800 g–1 kg</td></tr>
          <tr><td>Skewers</td><td>2 skewers (200–250 g)</td><td>800 g–1 kg</td></tr>
          <tr><td>Chicken legs, wings (on the bone)</td><td>300–350 g</td><td>1.2–1.4 kg</td></tr>
          <tr><td>Whole fish</td><td>1 fish of 350–450 g</td><td>4 fish</td></tr>
          <tr><td>Squid (cleaned)</td><td>200–250 g</td><td>800 g–1 kg</td></tr>
        </tbody>
      </table>
      <p class="muted">Children usually need half an adult portion. With guests add one more portion — grilled meat always gets eaten.</p>

      <h2>What to look for at the butcher</h2>
      <h3>Colour and smell</h3>
      <p>Beef is dark red, pork pink, chicken pale pink. The meat must not be sticky or grey and must not smell sour. Fat is white to cream, never yellow and greasy.</p>
      <h3>Minced meat</h3>
      <p>Best choose a piece and ask the butcher to mince it in front of you, twice: first through the coarse plate, then the fine one. That way you know what is in it and how much fat. Use ready-minced meat the same day.</p>
      <h3>Steak thickness</h3>
      <p>Grill steaks should be 2–3 cm thick. Thinner ones dry out before they get a crust; thicker ones need indirect heat.</p>
      <h3>Fish</h3>
      <p>Fresh fish has clear, bulging eyes, red gills and firm flesh that springs back when pressed. Ask for it to be gutted but scaled only if you will not grill it in its skin — the scales protect the flesh.</p>

      <h2>When something goes wrong</h2>
      <dl class="faq">
        <dt>The ćevapi are dry and crumbly</dt>
        <dd>The meat was too lean or not kneaded enough. Next time take a fattier cut (about 20 %) and knead until the mixture turns sticky.</dd>
        <dt>The steak is tough</dt>
        <dd>It was a cut for stewing, not grilling, or it was sliced along the grain. Slice across the grain and thinly.</dd>
        <dt>The chicken is dry</dt>
        <dd>The breast was cooked too long. Use thighs, or marinate the breast in yoghurt and cook until 74 °C in the middle, no longer.</dd>
      </dl>

      <h2>Storage</h2>
      <p>Keep raw meat in the fridge at 0–4 °C, on the bottom shelf, covered. Use pieces within 2–3 days, mince and chicken within a day. Thaw frozen meat slowly in the fridge overnight, never on the counter.</p>

      <h2>Grill recipes in Sofra</h2>
      <ul class="related">
        ${rec('cevapi', 'Ćevapi')}${rec('raznjici-svinjski', 'Pork skewers with onion and pepper')}${rec('raznjici-pileci', 'Chicken skewers in yoghurt marinade')}
        ${rec('junetina-odrezak-zar', 'Grilled beef steak with garlic butter')}${rec('janjeci-kotleti-zar', 'Grilled lamb chops')}${rec('riba-zar-blitva', 'Grilled whole fish with chard and potato')}
      </ul>`,
    },
    {
      slug: 'shaping-cevapi-patties-skewers',
      title: 'Ćevapi, patties and skewers: mincing, cutting and shaping',
      metaTitle: 'How to make ćevapi, pljeskavica and skewers: mincing and shaping | Sofra',
      desc: 'Mincing meat, how much salt and water, why the mixture is kneaded and rested, the size of ćevapi and patties, cutting and threading skewers, pounding and boning.',
      card: 'Mincing, salt and water, kneading, sizes and threading skewers.',
      lede: 'A good ćevap holds its shape without egg or bread: the meat is fatty enough, salted, well kneaded and rested overnight. A skewer is good when all the pieces are the same size.',
      body: `
      <div class="box">
        <h2>In short</h2>
        <ol>
          <li>Keep the meat and the mincer cold — 20–30 minutes in the freezer before mincing.</li>
          <li>For 1 kg mince: 16–18 g salt (about 3 teaspoons) and 80–100 ml cold water.</li>
          <li>Knead for 5 minutes until the mixture turns sticky and pulls on your hand.</li>
          <li>Rest the mixture in the fridge for at least 2 hours, ideally overnight.</li>
          <li>A ćevap is 25–30 g and 6–7 cm long; a patty 1 cm thick and wider than the bread.</li>
        </ol>
      </div>

      <h2>Mincing</h2>
      <p>Cut the meat into 3–4 cm strips or cubes and remove sinews and membranes. If you mince it yourself, put it through twice: first the coarse plate (8 mm), then the fine one (4–5 mm). Warm meat smears instead of mincing and the fat separates, so keep everything cold. Without a mincer, the butcher will mince the piece you choose.</p>

      <h2>Salt, water and kneading</h2>
      <table>
        <thead><tr><th>For 1 kg meat</th><th>Ćevapi</th><th>Patty</th></tr></thead>
        <tbody>
          <tr><td>Salt</td><td>16–18 g</td><td>16–18 g</td></tr>
          <tr><td>Cold (sparkling) water</td><td>80–100 ml</td><td>50 ml</td></tr>
          <tr><td>Garlic</td><td>1–2 cloves or none</td><td>2 cloves</td></tr>
          <tr><td>Onion</td><td>—</td><td>1, very finely chopped</td></tr>
          <tr><td>Pepper, hot paprika</td><td>a little pepper</td><td>to taste</td></tr>
        </tbody>
      </table>
      <p>Salt draws proteins out of the meat and they bind it — that is why the mixture is kneaded until sticky, not just mixed. The water keeps the ćevap juicy. Eggs, breadcrumbs and bread are not needed; they make it soft like a meatball.</p>
      <p>Resting overnight is not just tradition: in that time the salt reaches all of the meat, the mixture firms up and is easier to shape.</p>

      <h2>Shaping</h2>
      <h3>Ćevapi</h3>
      <p>Wet your hands with cold water. Take a 25–30 g piece (the size of a walnut in its shell), roll it between your palms into a finger 6–7 cm long and about 2 cm thick. Lay them on a tray without touching. It is quicker with a piping bag without a nozzle or with a 2 cm one: pipe a long sausage and cut it with a knife.</p>
      <h3>Patties</h3>
      <p>Put a 150–250 g piece between two sheets of film and press it with your palm into a round about 1 cm thick and 15–20 cm across. Press a shallow dip in the middle with your fingers — a patty shrinks and puffs up in the middle as it cooks, and this keeps it flat. Make it a little wider than the bread, as it shrinks.</p>
      <h3>Stuffed patty</h3>
      <p>Make two thinner rounds, put cheese and kajmak on one, leaving a 2 cm border, cover with the other and press the edges well with your fingers. Turn it only once.</p>

      <h2>Skewers</h2>
      <ol>
        <li>Cut the meat into 2.5–3 cm cubes, all the same size, so they cook evenly.</li>
        <li>Soak wooden skewers in water for 30 minutes so they do not burn; metal ones need nothing.</li>
        <li>Thread the meat closely but not packed — leave a millimetre between pieces so the heat gets through.</li>
        <li>Put onion and pepper cut to the same size between the meat.</li>
        <li>Cook softer, thinner pieces (chicken) on their own skewers, not with beef.</li>
        <li>Two parallel skewers through the same meat stop the pieces spinning when you turn them.</li>
      </ol>

      <h2>Pounding, boning and butterflying</h2>
      <p><b>Pounding:</b> put the steak between two sheets of film and beat it with the flat of a mallet from the middle outwards until it is even everywhere. Do not pound it thin like an escalope — for the grill leave it 1.5–2 cm.</p>
      <p><b>Boning a chicken thigh:</b> cut along the bone on the inside, scrape the meat away from the bone with the knife and cut the tendons at the joint. You get a flat piece that cooks quickly and evenly.</p>
      <p><b>Butterfly:</b> cut a thick chicken breast horizontally almost through and open it like a book. It cooks twice as fast and does not dry out on the outside.</p>

      <h2>When something goes wrong</h2>
      <dl class="faq">
        <dt>The ćevapi fall apart on the grate</dt>
        <dd>The mixture was not kneaded enough, not rested, or the meat was warm. Knead longer, rest overnight and turn them only when they come away from the grate by themselves.</dd>
        <dt>The patty puffed up like a ball</dt>
        <dd>There was no dip in the middle or it was too thick. Make it thinner and press the middle.</dd>
        <dt>Skewers are burnt outside and raw inside</dt>
        <dd>The pieces are too big or the fire too hot. Cut to 2.5 cm and cook over medium coals, turning more often.</dd>
      </dl>

      <h2>Storage and freezing</h2>
      <p>Keep shaped ćevapi and patties in the fridge for a day at most. You can freeze them on a tray, then bag them, for up to 3 months. Grill them after thawing overnight in the fridge.</p>

      <h2>Recipes in Sofra</h2>
      <ul class="related">
        ${rec('cevapi', 'Ćevapi')}${rec('pljeskavica', 'Pljeskavica with onion and bread')}${rec('punjena-pljeskavica', 'Pljeskavica stuffed with cheese and kajmak')}
        ${rec('raznjici-svinjski', 'Pork skewers with onion and pepper')}${rec('raznjici-pileci', 'Chicken skewers in yoghurt marinade')}${rec('vjesalica-punjena', 'Stuffed pork loin steaks')}${rec('mijesano-meso', 'Mixed grill')}
      </ul>`,
    },
    {
      slug: 'grill-marinades',
      title: 'Grill marinades: what goes in and how long',
      metaTitle: 'Grill marinades: basic recipes and marinating times by meat | Sofra',
      desc: 'Six basic marinades for pork, chicken, lamb, fish and vegetables, how much marinade per kilo of meat, how long to marinate and when to salt.',
      card: 'Six basic marinades, times for each meat and when to salt.',
      lede: 'A marinade flavours the surface of the meat and stops it drying out. Only salt goes deep; oil, spices and garlic stay on the outside — so a few hours are enough, not days.',
      body: `
      <div class="box">
        <h2>In short</h2>
        <ol>
          <li>100–150 ml marinade is enough for 1 kg of meat.</li>
          <li>Base: oil + spices + garlic; a little acid if you like (lemon, vinegar, yoghurt).</li>
          <li>Marinate in the fridge in a covered dish or a bag and turn the meat once or twice.</li>
          <li>Chicken and pork 2–12 hours, fish only 15–30 minutes.</li>
          <li>Wipe off the excess before grilling — it drips, flares and burns.</li>
        </ol>
      </div>

      <h2>How long</h2>
      <table>
        <thead><tr><th>Meat</th><th>At least</th><th>At most</th><th>Note</th></tr></thead>
        <tbody>
          <tr><td>Chicken</td><td>1 hour</td><td>24 hours</td><td>in yoghurt best 4–12 hours</td></tr>
          <tr><td>Pork (neck, loin)</td><td>2 hours</td><td>24 hours</td><td>overnight is ideal</td></tr>
          <tr><td>Beef (steaks)</td><td>—</td><td>12 hours</td><td>good steaks need only salt, oil and pepper</td></tr>
          <tr><td>Lamb</td><td>1 hour</td><td>12 hours</td><td>rosemary, garlic, lemon</td></tr>
          <tr><td>Fish</td><td>15 min</td><td>30 min</td><td>lemon “cooks” the flesh if left longer</td></tr>
          <tr><td>Squid</td><td>15 min</td><td>1 hour</td><td>no acid, just oil and garlic</td></tr>
          <tr><td>Vegetables</td><td>15 min</td><td>2 hours</td><td>salt aubergine first</td></tr>
        </tbody>
      </table>
      <p>Acid (lemon, vinegar, wine) and yoghurt tenderise only the surface. Leave meat in them too long and the outside goes mushy, so keep to the times above.</p>

      <h2>When to salt</h2>
      <p>Salt either at least 40 minutes before grilling, or right before the meat goes on. Salt 10–20 minutes ahead and it draws juice to the surface that the meat has not yet reabsorbed — the crust struggles to form. For skewers and steaks it is safest to salt at the end; for chicken the salt can go straight into the marinade.</p>

      <h2>Six basic marinades (for 1 kg meat)</h2>
      <h3>1. Basic, for pork and beef</h3>
      <p>5 tbsp oil, 3 garlic cloves, 1 tsp sweet paprika, ½ tsp pepper. Finely chopped onion if you like.</p>
      <h3>2. Yoghurt, for chicken</h3>
      <p>150 ml thick yoghurt, juice of ½ lemon, 2 garlic cloves, 1 tsp paprika, 2 tbsp oil, 1 tsp salt.</p>
      <h3>3. Lemon and rosemary, for lamb and chicken legs</h3>
      <p>4 tbsp olive oil, juice of 1 lemon, 4 garlic cloves, 1 tsp dried rosemary or two fresh sprigs, pepper.</p>
      <h3>4. Honey and paprika, for wings and ribs</h3>
      <p>3 tbsp oil, 1 tbsp honey, 2 tsp sweet paprika, a pinch of hot, 3 garlic cloves, juice of ½ lemon. Honey burns fast — cook over indirect heat and move over the coals only at the end.</p>
      <h3>5. Beer and onion, for pork neck</h3>
      <p>200 ml lager, 1 onion in rings, 3 tbsp oil, 1 tsp pepper, a teaspoon of mustard. Overnight.</p>
      <h3>6. For fish and squid</h3>
      <p>4 tbsp olive oil, 2 garlic cloves, a handful of parsley. Lemon only once the fish is cooked.</p>

      <h2>Step by step</h2>
      <ol>
        <li>Pat the meat dry — a marinade clings better to a dry surface.</li>
        <li>Mix the marinade in a dish or a bag, add the meat and massage it in well.</li>
        <li>Squeeze the air out of the bag or cover the dish and put it in the fridge.</li>
        <li>Take the meat out of the fridge half an hour before grilling.</li>
        <li>Wipe off the excess marinade, salt if needed and grill.</li>
      </ol>

      <h2>When something goes wrong</h2>
      <dl class="faq">
        <dt>The outside of the meat is mushy</dt>
        <dd>It sat too long in lemon, vinegar or yoghurt. Keep to the times in the table, marinate fish without acid.</dd>
        <dt>The marinade burns and smokes</dt>
        <dd>Too much oil, sugar or honey on the surface. Wipe off the excess and cook part of the time beside the coals.</dd>
        <dt>The flavour does not come through</dt>
        <dd>It needs salt. Salt carries flavour — without it even the best marinade does not help.</dd>
      </dl>

      <div class="box tip">
        <h3>Safety</h3>
        <p>Always marinate in the fridge, not on the counter. Do not use a marinade that held raw meat as a sauce — if you want to pour it over, boil it for 3 minutes first. Put cooked meat on a clean plate, not the one that held it raw.</p>
      </div>

      <h2>Marinated recipes in Sofra</h2>
      <ul class="related">
        ${rec('raznjici-pileci', 'Chicken skewers in yoghurt marinade')}${rec('pileca-krilca-zar', 'Grilled chicken wings')}${rec('pileci-batci-zar', 'Chicken legs with lemon and rosemary')}
        ${rec('raznjici-svinjski', 'Pork skewers with onion and pepper')}${rec('janjeci-kotleti-zar', 'Grilled lamb chops')}${rec('povrce-zar', 'Grilled vegetables')}
      </ul>`,
    },
    {
      slug: 'curing-and-drying-meat',
      title: 'Curing and drying meat at home',
      metaTitle: 'Curing and drying meat: dry and wet cure, salt and times | Sofra',
      desc: 'A short brine for juicier grilled chicken and pork, dry and wet curing for dried meat, how much salt per kilo, temperatures and drying times.',
      card: 'A short brine for the grill, dry and wet curing, drying.',
      lede: 'Curing is salting meat: briefly, for a few hours, so chicken and pork stay juicy on the grill — or for weeks, for dried meat that is then smoked and hung. Long curing needs cold weather, exact amounts of salt and curing salt.',
      body: `
      <div class="box">
        <h2>In short</h2>
        <ol>
          <li>Short brine for the grill: 50 g salt per litre of water; chicken 1–4 hours, pork 4–12 hours.</li>
          <li>Dried meat: 25–30 g salt per kg meat (2.5–3 %), part or all of it curing salt.</li>
          <li>Cure the meat at 2–5 °C — in the fridge, or in a cold room in winter.</li>
          <li>Time: about 1 week for every 3 cm of thickness.</li>
          <li>After curing the meat is rinsed, dried, smoked and hung until it has lost a third of its weight.</li>
        </ol>
      </div>

      <h2>A short brine before grilling</h2>
      <p>Chicken breast, chicken legs and pork loin stay noticeably juicier if they spend some time in salted water before grilling. The salt goes into the meat and holds on to the water as it cooks.</p>
      <table>
        <thead><tr><th>Meat</th><th>Brine</th><th>Time</th></tr></thead>
        <tbody>
          <tr><td>Chicken breast, skewers</td><td>50 g salt + 1 l water</td><td>1–2 hours</td></tr>
          <tr><td>Whole chicken, legs</td><td>50 g salt + 1 l water</td><td>4–12 hours</td></tr>
          <tr><td>Pork loin, neck in one piece</td><td>50 g salt + 1 l water</td><td>6–12 hours</td></tr>
          <tr><td>Trout, mackerel (before smoking)</td><td>50–60 g salt + 1 l water</td><td>1–2 hours</td></tr>
        </tbody>
      </table>
      <p>You can add bay leaves, peppercorns, garlic and a tablespoon of sugar to the brine. The meat must be fully covered, in the fridge. Afterwards rinse it, dry it well and do not salt it again — just season.</p>

      <h2>Curing for dried meat</h2>
      <p>Dried meat is made from whole, clean boneless pieces: beef round (topside, silverside), pork neck, loin or leg. Pieces should be no more than 5–6 cm thick, so salt and smoke reach the middle.</p>
      <h3>Curing salt</h3>
      <p>Curing salt is table salt with a little nitrite. It keeps the meat red and, more importantly, stops the bacteria that cause botulism growing in meat that is smoked and dried for a long time at low temperatures. For meat that is cold-smoked and dried for weeks it is a must; follow the instructions on the pack and do not mix it with ordinary salt by eye.</p>

      <h3>Dry cure</h3>
      <ol>
        <li>Weigh the meat. For every 1 kg weigh out 25–30 g curing salt (or the mix given on the pack).</li>
        <li>Add 2–3 g sugar, crushed pepper, bay leaf, garlic if you like.</li>
        <li>Rub the salt in well on all sides, put the meat in a sealed bag or a non-porous dish and keep it at 2–5 °C.</li>
        <li>Every other day turn it and massage it through the bag; leave any juice it releases with the meat.</li>
        <li>Keep it about 1 week for every 3 cm of thickness (a 6 cm piece — 2 weeks).</li>
      </ol>
      <h3>Wet cure</h3>
      <p>Make a brine of 1 l water and 70–80 g curing salt (as the pack says), boil it with bay and peppercorns and cool completely. Lay the meat in a dish, pour over the brine to cover and weigh it down with a plate. Keep at 2–5 °C, about 1 day for each centimetre of thickness, and turn it every few days.</p>

      <h2>Rinsing, smoking and drying</h2>
      <ol>
        <li>Rinse the meat in cold water and leave it an hour or two in clean water to even out the salt on the surface.</li>
        <li>Hang it for a day in a cold, airy place to dry on the outside.</li>
        <li>Cold-smoke it (below 25 °C) a few hours a day for 1–3 weeks — see the smoking guide.</li>
        <li>Dry it at 10–15 °C and moderate humidity until it has lost 30–35 % of its weight. Weigh it now and then.</li>
      </ol>

      <h2>When something goes wrong</h2>
      <dl class="faq">
        <dt>The meat is too salty</dt>
        <dd>The salt was measured by eye instead of weighed. Soak salty pieces in cold water for a few hours before smoking. Next time weigh both meat and salt.</dd>
        <dt>Hard outside, soft and wet inside</dt>
        <dd>It dried too fast in warm, dry air. The outside sealed and the water cannot get out. Dry it cooler and in more humid air.</dd>
        <dt>White or green mould appeared</dt>
        <dd>A little white mould on the surface can be wiped off with a cloth dipped in vinegar. Green or black mould, a sticky surface or a bad smell — throw the meat away.</dd>
      </dl>

      <div class="box tip">
        <h3>Safety</h3>
        <p>Do long curing and drying only with weighed curing salt, fresh meat and in the cold — below 5 °C while salting, below 15 °C while drying. If you have no cold space, cure in the fridge and then hot-smoke the meat and eat it cooked, not dried.</p>
      </div>

      <h2>Storage</h2>
      <p>Keep dried meat cool and dry, wrapped in paper or cloth, not plastic. Once cut, keep it in the fridge. Vacuum-packed it keeps for several months in the fridge.</p>

      <h2>In Sofra</h2>
      <ul class="related">
        ${rec('grah-suho-meso', 'Beans with smoked dried meat')}${rec('pileci-batci-zar', 'Grilled chicken legs (short brine optional)')}${rec('vjesalica-punjena', 'Stuffed pork loin steaks')}
      </ul>`,
    },
    {
      slug: 'grill-fire-and-heat',
      title: 'Fire and coals: how to cook on the grill',
      metaTitle: 'How to grill: charcoal or wood, heat, times and temperatures | Sofra',
      desc: 'Charcoal, briquettes or wood, how to light the fire, when the coals are ready, direct and indirect heat, the hand test, grilling times for each meat, temperatures and resting.',
      card: 'Charcoal or wood, heat, two zones, times and resting.',
      lede: 'You do not grill over flames but over coals covered in grey ash. With a hot side and a cooler side on the grill you can cook anything — from ćevapi in eight minutes to chicken legs in forty.',
      body: `
      <div class="box">
        <h2>In short</h2>
        <ol>
          <li>Light the charcoal in a chimney starter or on a few firelighter cubes — no petrol or spirit.</li>
          <li>The coals are ready when covered in grey ash, after 20–30 minutes (wood 45–60 minutes).</li>
          <li>Spread the coals on one side only: there you cook fast, beside them you finish slowly.</li>
          <li>Heat the grate well, clean it and oil it before the meat goes on.</li>
          <li>Rest the cooked meat 3–10 minutes before cutting.</li>
        </ol>
      </div>

      <h2>Charcoal, briquettes or wood</h2>
      <table>
        <thead><tr><th>Fuel</th><th>To embers</th><th>Lasts</th><th>For</th></tr></thead>
        <tbody>
          <tr><td>Lump charcoal</td><td>20–30 min</td><td>45–60 min</td><td>ćevapi, skewers, steaks — strong heat</td></tr>
          <tr><td>Briquettes</td><td>30–40 min</td><td>1.5–2 hours</td><td>chicken legs, whole chicken, long cooks</td></tr>
          <tr><td>Hardwood (beech, oak, fruit wood)</td><td>45–60 min</td><td>as long as you feed it</td><td>smoky flavour; for a bigger crowd</td></tr>
        </tbody>
      </table>
      <p>Never burn conifers (pine, spruce) or varnished, painted or treated wood — resin and chemicals end up in the meat. Allow about 1 kg charcoal for 1 kg meat.</p>

      <h2>How hot: the hand test</h2>
      <p>Hold your palm 10 cm above the grate and count how many seconds you can stand it.</p>
      <table>
        <thead><tr><th>You last</th><th>Heat</th><th>Roughly</th><th>For</th></tr></thead>
        <tbody>
          <tr><td>1–2 s</td><td>hot</td><td>250–300 °C</td><td>steaks, ćevapi, squid, patties</td></tr>
          <tr><td>4–5 s</td><td>medium</td><td>180–220 °C</td><td>skewers, boneless chicken, fish, veg</td></tr>
          <tr><td>7–8 s</td><td>low / to the side</td><td>120–160 °C</td><td>legs, wings, sausages, finishing</td></tr>
        </tbody>
      </table>

      <h2>Direct and indirect heat</h2>
      <p><b>Direct</b> means over the coals: fast, a strong crust, for pieces under 3 cm thick. <b>Indirect</b> means beside the coals, best with the lid on: the grill works like an oven, for meat on the bone and thicker pieces. Easiest is to spread the coals over two thirds of the grill and leave one third empty — that is where meat goes when it flares or when it is done outside but not inside.</p>

      <h2>Grilling times</h2>
      <table>
        <thead><tr><th>What</th><th>Heat</th><th>Total</th></tr></thead>
        <tbody>
          <tr><td>Ćevapi</td><td>hot</td><td>8–10 min, turning</td></tr>
          <tr><td>Patty 1 cm</td><td>hot</td><td>8–10 min, turn once</td></tr>
          <tr><td>Skewers (3 cm cubes)</td><td>medium-hot</td><td>12–15 min</td></tr>
          <tr><td>Chicken breast, chicken skewers</td><td>medium</td><td>10–12 min</td></tr>
          <tr><td>Chicken legs on the bone</td><td>indirect + hot at the end</td><td>35–45 min</td></tr>
          <tr><td>Wings</td><td>indirect + hot at the end</td><td>25–30 min</td></tr>
          <tr><td>Beef steak 2–3 cm</td><td>hottest</td><td>6–8 min for medium</td></tr>
          <tr><td>Pork steak 2 cm</td><td>medium-hot</td><td>10–14 min</td></tr>
          <tr><td>Lamb chops</td><td>hot</td><td>6–8 min</td></tr>
          <tr><td>Sausages, sujuk</td><td>medium</td><td>6–10 min</td></tr>
          <tr><td>Whole fish 350–450 g</td><td>medium</td><td>12–16 min</td></tr>
          <tr><td>Mackerel</td><td>hot</td><td>8–10 min</td></tr>
          <tr><td>Squid</td><td>hottest</td><td>4–6 min</td></tr>
          <tr><td>Sliced vegetables</td><td>medium</td><td>6–12 min</td></tr>
        </tbody>
      </table>

      <h2>Temperature in the middle of the meat</h2>
      <p>The surest way is a thermometer in the thickest part, away from the bone.</p>
      <table>
        <thead><tr><th>Meat</th><th>Done at</th></tr></thead>
        <tbody>
          <tr><td>Chicken, turkey</td><td>74 °C — clear juices, no pink</td></tr>
          <tr><td>Mince (ćevapi, patties)</td><td>71 °C — cooked through</td></tr>
          <tr><td>Pork in pieces</td><td>63–70 °C, then rest 3 min</td></tr>
          <tr><td>Beef: rare / medium / well done</td><td>52 / 57 / 70 °C</td></tr>
          <tr><td>Lamb</td><td>60–65 °C</td></tr>
          <tr><td>Fish</td><td>55–60 °C — flesh comes away from the bone</td></tr>
        </tbody>
      </table>

      <h2>Step by step</h2>
      <h3>1. Light the coals</h3>
      <p>Fill a chimney starter with charcoal, put crumpled newspaper or two firelighter cubes underneath and light. When the top coals turn grey, tip them into the grill.</p>
      <h3>2. Make two zones</h3>
      <p>Spread the coals over two thirds of the base, thicker along one edge. Put the grate on and leave it 5 minutes to heat.</p>
      <h3>3. Clean and oil the grate</h3>
      <p>Brush the hot grate clean, then wipe it with a cloth or half an onion dipped in oil. The meat will not stick.</p>
      <h3>4. Cook and leave it alone</h3>
      <p>Put the meat on and let it sear. Turn it when it comes away from the grate by itself — if it sticks, it is not time yet. Do not press patties with the spatula: you squeeze the juice into the fire.</p>
      <h3>5. Rest</h3>
      <p>Put the cooked meat on a clean plate or board. Ćevapi and skewers 2–3 minutes, steaks 5 minutes, big pieces 10 minutes. The juices settle back into the meat.</p>

      <h2>When something goes wrong</h2>
      <dl class="faq">
        <dt>Flames lick the meat</dt>
        <dd>Fat is dripping. Move the meat to the cooler side until the flames die down. Do not douse with water from a bottle — it throws ash onto the meat.</dd>
        <dt>The meat sticks to the grate</dt>
        <dd>The grate was not hot, clean or oiled enough, or you turned too early. Wait until it lets go by itself.</dd>
        <dt>Burnt outside, raw inside</dt>
        <dd>The heat is too strong for that thickness. Move the meat to the indirect side and put the lid on to finish.</dd>
        <dt>The coals die before you finish</dt>
        <dd>Too little fuel or the vents closed. Add charcoal at the edge in good time and keep the bottom vents open.</dd>
      </dl>

      <div class="box tip">
        <h3>No grill: a grill pan</h3>
        <p>Everything also works in a heavy ridged pan or a cast-iron pan: heat it hard for 5 minutes, oil the meat (not the pan) and open a window. Times are the same as over hot coals; finish meat on the bone in the oven at 200 °C.</p>
      </div>

      <h2>Safety</h2>
      <p>Keep the grill outdoors, away from walls and trees, never indoors or in a garage — charcoal gives off carbon monoxide. Keep children and pets away. Deal with the ashes only when completely cold, best the next day, and never in a plastic bin.</p>

      <h2>Grill recipes in Sofra</h2>
      <ul class="related">
        ${rec('cevapi', 'Ćevapi')}${rec('pileci-batci-zar', 'Chicken legs with lemon and rosemary')}${rec('junetina-odrezak-zar', 'Grilled beef steak')}
        ${rec('riba-zar-blitva', 'Grilled whole fish with chard and potato')}${rec('lignje-zar', 'Grilled squid')}${rec('povrce-zar', 'Grilled vegetables')}${rec('mijesano-meso', 'Mixed grill')}
      </ul>`,
    },
    {
      slug: 'smoking-meat-and-fish',
      title: 'Smoking meat and fish: hot and cold',
      metaTitle: 'Smoking meat and fish: hot and cold smoking, wood and times | Sofra',
      desc: 'The difference between hot and cold smoking, which wood to use, temperatures and times for fish, chicken, pork and dried meat, and how to smoke in a lidded grill.',
      card: 'Hot and cold smoking, wood, temperatures and times.',
      lede: 'With hot smoke the meat is smoked and cooked at the same time — ready to eat in a few hours. Cold smoke only adds flavour and dries: that is for cured meat that is then hung for weeks.',
      body: `
      <div class="box">
        <h2>In short</h2>
        <ol>
          <li>Hot smoking: 80–110 °C, the meat cooks; trout 1–1.5 hours, chicken 2–3 hours.</li>
          <li>Cold smoking: below 25 °C, a few hours a day for 1–3 weeks, only for cured meat.</li>
          <li>Wood: beech, oak, fruit woods (apple, plum, cherry); never conifers or treated wood.</li>
          <li>The smoke should be thin and bluish, not thick and white.</li>
          <li>Salt or brine the meat before smoking and let the surface dry.</li>
        </ol>
      </div>

      <h2>Hot and cold</h2>
      <table>
        <thead><tr><th></th><th>Hot smoking</th><th>Cold smoking</th></tr></thead>
        <tbody>
          <tr><td>Temperature</td><td>80–110 °C</td><td>below 25 °C (best 15–20 °C)</td></tr>
          <tr><td>Time</td><td>1–6 hours</td><td>1–3 weeks, with breaks</td></tr>
          <tr><td>The meat is</td><td>cooked, eaten straight away</td><td>raw, dried afterwards</td></tr>
          <tr><td>For</td><td>trout, mackerel, chicken, ribs, sausages</td><td>dried meat, bacon, ham</td></tr>
          <tr><td>You need</td><td>a lidded grill or a smoker</td><td>a smokehouse with the fire apart from the meat</td></tr>
        </tbody>
      </table>

      <h2>Which wood</h2>
      <table>
        <thead><tr><th>Wood</th><th>Smoke</th><th>For</th></tr></thead>
        <tbody>
          <tr><td>Beech</td><td>mild, even</td><td>dried meat, bacon, everything — the classic</td></tr>
          <tr><td>Oak</td><td>stronger, darker colour</td><td>beef, pork</td></tr>
          <tr><td>Apple, pear, cherry</td><td>mild, sweetish</td><td>chicken, fish, ribs</td></tr>
          <tr><td>Plum</td><td>pronounced, fragrant</td><td>pork, sausages</td></tr>
        </tbody>
      </table>
      <p>The wood must be dry and free of flaking bark. Conifers and varnished, painted or treated wood give a bitter, harmful smoke.</p>

      <h2>Hot smoking in a lidded grill</h2>
      <ol>
        <li>Keep the fish or meat 1–12 hours in a short brine (50 g salt per litre of water — see the curing guide), rinse and leave it an hour in the air so the surface dries.</li>
        <li>Light half the usual charcoal and bank it against one side of the grill.</li>
        <li>Put a handful of wood chips or sawdust, or a small piece of hardwood, on the coals. You can also put the chips in a foil tray with holes.</li>
        <li>Put the meat on the other side of the grate, close the lid and set the lid vent above the meat so the smoke passes over it.</li>
        <li>Keep it at 90–110 °C (lid thermometer or one at meat level) and add chips when the smoke stops.</li>
        <li>It is done at 74 °C in the middle for chicken, 60 °C for fish, 70 °C for pork.</li>
      </ol>
      <table>
        <thead><tr><th>What</th><th>Brine</th><th>Smoking at 90–110 °C</th></tr></thead>
        <tbody>
          <tr><td>Trout, mackerel (whole)</td><td>1–2 hours</td><td>1–1.5 hours</td></tr>
          <tr><td>Chicken legs</td><td>4–6 hours</td><td>1.5–2 hours</td></tr>
          <tr><td>Whole chicken</td><td>8–12 hours</td><td>2.5–3 hours</td></tr>
          <tr><td>Pork ribs</td><td>6–12 hours or a dry rub</td><td>3–4 hours</td></tr>
          <tr><td>Homemade sausages</td><td>already salted</td><td>1–2 hours</td></tr>
        </tbody>
      </table>

      <h2>Cold smoking</h2>
      <p>Only meat cured with curing salt is cold-smoked (see “Curing and drying meat”). The fire is apart from the meat chamber and the smoke reaches it through a pipe or channel several metres long, cooling on the way. The smokehouse is fired a few hours a day, mostly in winter and at night when it is cold, and in between the meat dries. For dried meat this takes 1–3 weeks, until it is dark and smells of smoke.</p>

      <h2>When something goes wrong</h2>
      <dl class="faq">
        <dt>The meat is bitter and black</dt>
        <dd>The smoke was too thick, the wood damp or it burned with too little air. Open the air supply, use dry wood and add it little by little.</dd>
        <dt>The fish fell apart</dt>
        <dd>It was not brined or dried enough before smoking, or the temperature was too high. Brine first, dry for an hour, then no more than 100 °C.</dd>
        <dt>When cold smoking the outside of the meat cooked</dt>
        <dd>The smoke was too warm. Move the fire further from the meat or smoke only when it is cold outside.</dd>
      </dl>

      <div class="box tip">
        <h3>Safety</h3>
        <p>Cold-smoked meat is not cooked: it must be cured with curing salt and smoked in the cold, otherwise dangerous bacteria can grow in it. If in doubt, hot-smoke and eat the meat cooked. Keep the smokehouse away from the house and never smoke indoors.</p>
      </div>

      <h2>Storage</h2>
      <p>Hot-smoked fish and meat keep 3–5 days in the fridge, wrapped. Cold-smoked dried meat keeps like any dried meat — cool and dry, or vacuum-packed in the fridge.</p>

      <h2>In Sofra</h2>
      <ul class="related">
        ${rec('grah-suho-meso', 'Beans with smoked dried meat')}${rec('skusa-zar', 'Grilled mackerel')}${rec('pileci-batci-zar', 'Grilled chicken legs')}
      </ul>`,
    },
    {
      slug: 'grill-sides-and-sauces',
      title: 'Sides and sauces for the grill',
      metaTitle: 'What to serve with grilled meat: flatbread, onion, kajmak, ajvar, urnebes and salads | Sofra',
      desc: 'What to put on the table with ćevapi, skewers, chicken and fish off the grill: flatbread, onion, kajmak, ajvar, urnebes, garlic yoghurt, salads and vegetables — and how much per person.',
      card: 'Flatbread, onion, kajmak, ajvar, urnebes, salads — what with which meat.',
      lede: 'Grilled meat does not need much: a warm flatbread, chopped onion and something creamy — kajmak, ajvar or urnebes. One fresh salad takes the heaviness off the meat.',
      body: `
      <div class="box">
        <h2>In short</h2>
        <ol>
          <li>Warm the flatbread briefly on the grate and dip it in the meat juices.</li>
          <li>With beef and pork: chopped onion, kajmak, ajvar, urnebes.</li>
          <li>With chicken, fish and vegetables: garlic yoghurt, lemon, chard.</li>
          <li>One fresh salad in season: tomato or chopped salad with cheese in summer, cabbage salad in winter.</li>
          <li>Make the sides before you light the fire — when the meat is ready, nobody waits.</li>
        </ol>
      </div>

      <h2>What with which meat</h2>
      <table>
        <thead><tr><th>Meat</th><th>With it</th></tr></thead>
        <tbody>
          <tr><td>Ćevapi, patties</td><td>flatbread, chopped onion, kajmak, ajvar</td></tr>
          <tr><td>Skewers, stuffed loin</td><td>urnebes, onion, roasted peppers, chips or potatoes</td></tr>
          <tr><td>Chicken</td><td>garlic yoghurt, tomato salad, grilled vegetables</td></tr>
          <tr><td>Lamb</td><td>spring onion, salad, garlic yoghurt</td></tr>
          <tr><td>Fish, squid</td><td>chard with potato, lemon, green salad</td></tr>
          <tr><td>Grilled vegetables</td><td>white cheese, kajmak, garlic yoghurt, bread</td></tr>
        </tbody>
      </table>

      <h2>How much per person</h2>
      <table>
        <thead><tr><th>What</th><th>Per person</th><th>For 4</th></tr></thead>
        <tbody>
          <tr><td>Flatbread</td><td>1</td><td>4</td></tr>
          <tr><td>Onion</td><td>½ onion</td><td>2 onions</td></tr>
          <tr><td>Kajmak</td><td>30–40 g</td><td>150 g</td></tr>
          <tr><td>Ajvar</td><td>40 g (2–3 tbsp)</td><td>150–200 g</td></tr>
          <tr><td>Urnebes</td><td>50–60 g</td><td>250 g cheese</td></tr>
          <tr><td>Fresh salad</td><td>150–200 g veg</td><td>600–800 g</td></tr>
          <tr><td>Potatoes (chips, roasted)</td><td>200 g</td><td>800 g</td></tr>
        </tbody>
      </table>

      <h2>Make before the fire</h2>
      <h3>Onion</h3>
      <p>Chop the onion finely or into thin half-moons, salt it and squeeze with your hands — it turns milder. For onion salad add a tablespoon of vinegar and oil.</p>
      <h3>Urnebes</h3>
      <p>Crumble white cheese with a fork with a little kajmak, garlic, hot and sweet paprika and a tablespoon of oil. If it is too hot, stir in some ajvar.</p>
      <h3>Garlic yoghurt</h3>
      <p>Thick yoghurt, crushed garlic, salt, a tablespoon of olive oil and, if you like, grated and squeezed cucumber and dill.</p>
      <h3>Roasted peppers</h3>
      <p>Grill the peppers until the skin blackens all over, put them in a covered bowl for 10 minutes, then peel. Dress with oil, vinegar and garlic.</p>
      <h3>Flatbreads</h3>
      <p>At the end of grilling split the flatbreads, put them briefly on the grate and brush with the juices from the plate the meat rested on. Refresh shop flatbreads by sprinkling them with water before warming.</p>
      <h3>Potatoes in foil</h3>
      <p>Wrap small potatoes in foil and put them straight into the embers for 40–50 minutes, turning. Split them open and add kajmak and salt.</p>

      <h2>When something goes wrong</h2>
      <dl class="faq">
        <dt>The onion is too sharp</dt>
        <dd>Salt and squeeze it once chopped, or soak it in cold water for five minutes and drain.</dd>
        <dt>The urnebes is too runny</dt>
        <dd>Too much oil or kajmak. Add more crumbled cheese.</dd>
        <dt>The flatbreads are hard</dt>
        <dd>They were on the fire too long. Warm them only half a minute a side, or wrap them in foil at the side of the grill.</dd>
      </dl>

      <h2>Recipes in Sofra</h2>
      <ul class="related">
        ${rec('urnebes', 'Urnebes')}${rec('umak-jogurt-luk', 'Garlic yoghurt sauce')}${rec('salata-luk', 'Onion salad')}${rec('uz-kajmak-ajvar', 'Kajmak and ajvar')}
        ${rec('pecene-paprike-salata', 'Roasted peppers with garlic')}${rec('sopska', 'Chopped salad with white cheese')}${rec('povrce-zar', 'Grilled vegetables')}${rec('punjeni-sampinjoni-zar', 'Stuffed mushrooms on the grill')}
      </ul>`,
    },
  ],
};
