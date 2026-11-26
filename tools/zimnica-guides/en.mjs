// Preserving (zimnica) guides, English. Built into guides/<slug>/index.html by tools/grill-guides/build.mjs.
// Same order as bs.mjs (guides are paired by position).
const rec = (id, name) => `<li><a href="/#/recipe/${id}">${name}</a></li>`;
const ALL = `${rec('ajvar', 'Ajvar')}${rec('tursija-mijesana', 'Mixed pickles (turšija)')}${rec('kisela-paprika', 'Pickled peppers')}${rec('pekmez-sljive', 'Plum butter')}
        ${rec('dzem-kajsije', 'Apricot jam')}${rec('slatko-jagode', 'Strawberry slatko')}${rec('domaci-paradajz-sos', 'Home-made tomato passata')}${rec('kompot-sljive', 'Plum compote')}
        ${rec('kiseli-kupus-glavice', 'Whole-head sauerkraut')}${rec('kiseli-kupus-ribani', 'Shredded sauerkraut in jars')}`;

export const EN = {
  lang: 'en', dir: 'guides', eyebrow: 'Guide · Preserves', more: 'More on preserving', section: 'Preserves (zimnica)', app: '/#/zimnica',
  sectionLede: 'Jars and sterilising, vinegar, salt and sugar ratios, sauerkraut, storage and what to do when a jar goes bad.',
  guides: [
    {
      slug: 'jars-and-sterilising',
      title: 'Jars for preserves: washing, sterilising and the water bath',
      metaTitle: 'How to sterilise jars for preserves and how long to boil them | Sofra',
      desc: 'How to prepare jars and lids, sterilise them in the oven or in water, fill them hot and process closed jars in a pot of boiling water — times for ajvar, pickles, plum butter, jam, compote and tomato passata.',
      card: 'Checking, washing and sterilising, filling, boiling times and checking the lid.',
      lede: 'Preserves spoil because of microbes left in the jar or let in by a bad lid. Clean hot jars, hot food and boiling the closed jars in a pot of water deal with almost all of it — and it does not take long.',
      body: `
      <div class="box">
        <h2>In short</h2>
        <ol>
          <li>Jars without cracks or chipped rims; lids new, or free of rust, dents and damaged seals.</li>
          <li>Wash them in hot soapy water, then sterilise: 20 minutes in the oven at 120 °C or 10 minutes in boiling water. Boil the lids for 5 minutes.</li>
          <li>Hot food into hot jars: up to 1 cm below the rim (tomato passata and compote 1.5 cm).</li>
          <li>Wipe the rim and close, then boil the closed jars in a pot of water — times are in the table below.</li>
          <li>Next day, check: the lid is pulled in and does not click when pressed.</li>
        </ol>
      </div>

      <h2>How long to boil the closed jars</h2>
      <p>Time it from the moment the water comes back to the boil. The water must be 2–3 cm above the lids.</p>
      <table>
        <thead><tr><th>Preserve</th><th>0.25–0.5 l jar</th><th>0.72–1 l jar</th></tr></thead>
        <tbody>
          <tr><td>Jam, plum butter, slatko</td><td>10 min</td><td>15 min</td></tr>
          <tr><td>Pickles, pickled peppers (with vinegar)</td><td>10 min</td><td>15 min</td></tr>
          <tr><td>Compote</td><td>20 min</td><td>25 min</td></tr>
          <tr><td>Ajvar (with vinegar)</td><td>30 min</td><td>40 min</td></tr>
          <tr><td>Tomato passata (with lemon juice in the jar)</td><td>40 min</td><td>45 min</td></tr>
          <tr><td>Shredded sauerkraut</td><td colspan="2">not boiled — it ferments on its own and is then kept cold</td></tr>
        </tbody>
      </table>
      <p class="muted">If you live above 300 m, add 5 minutes; above 900 m add 10 minutes — water boils at a lower temperature up there.</p>

      <h2>How many jars for the winter</h2>
      <p>A rough guide for a family that eats preserves several times a week. In the first year, write down what got eaten — next autumn you will know exactly.</p>
      <table>
        <thead><tr><th>Preserve</th><th>Per person for the winter</th><th>For 4 people</th></tr></thead>
        <tbody>
          <tr><td>Ajvar (0.5 l)</td><td>2–3 jars</td><td>8–12 jars</td></tr>
          <tr><td>Pickles and pickled peppers (0.72 l)</td><td>2–3 jars</td><td>8–12 jars</td></tr>
          <tr><td>Plum butter and jam (0.5 l)</td><td>2 jars</td><td>8 jars</td></tr>
          <tr><td>Tomato passata (0.5 l)</td><td>4–6 jars</td><td>16–24 jars</td></tr>
          <tr><td>Compote (0.72 l)</td><td>3 jars</td><td>12 jars</td></tr>
          <tr><td>Whole-head sauerkraut</td><td>3–4 heads</td><td>12–15 heads (a 30–40 l barrel)</td></tr>
        </tbody>
      </table>

      <h2>Step by step</h2>
      <h3>1. Check jars and lids</h3>
      <p>Run a finger round the rim of every jar — a chip or crack means it will not seal or will break in the pot. Throw away lids with rust, dents or a cracked seal. A lid can be reused only if it is perfectly flat and clean; a new one is safest.</p>
      <h3>2. Wash</h3>
      <p>Wash jars and lids in hot soapy water, rinse in hot water and stand upside down on a clean cloth. Take off old labels — dirt collects under them.</p>
      <h3>3. Sterilise</h3>
      <p><b>In the oven:</b> put the wet jars on a rack in a cold oven, heat to 120 °C and hold for 20 minutes. Leave them inside until you fill them. <b>In water:</b> submerge the jars in a pot of water, bring to the boil and boil for 10 minutes. Always boil the lids in water (5 minutes) — the oven damages the seal.</p>
      <h3>4. Fill</h3>
      <p>Pour the hot preserve into hot jars — a cold jar can crack with boiling food. Leave the stated space to the rim, press out air bubbles with a spoon or chopstick, wipe the rim with a clean damp cloth and close at once. Screw the lid on firmly by hand, not with force.</p>
      <h3>5. Water bath</h3>
      <p>Put a cloth or rack on the bottom of a large pot (the jars must not stand directly on the base). Stand the jars so they do not touch, pour in hot water to 2–3 cm above the lids, cover the pot and bring to the boil. Start timing when it boils. When the time is up, turn off the heat and leave the jars in the water for 5 more minutes.</p>
      <h3>6. Cool and check</h3>
      <p>Lift the jars out upright with tongs or a cloth and stand them on a wooden board or cloth, away from draughts. Do not press the lids while they cool — you will hear a click as they pull in. Next day check every jar: the lid is dipped and does not move when pressed. Write what it is and the date on the jar.</p>

      <div class="box tip">
        <h3>What about turning jars upside down and wrapping them in blankets?</h3>
        <p>Plenty of people do it, and for jam, plum butter and pickles it usually works. But it is not the same as a water bath: the contents do not heat evenly to the middle of the jar. For ajvar, tomato passata and anything made of low-acid vegetables, boiling the closed jars is a must.</p>
      </div>

      <h2>When something goes wrong</h2>
      <dl class="faq">
        <dt>A jar broke in the pot</dt>
        <dd>It was cold going into hot water, or it stood directly on the base. Next time keep the jars and water at a similar temperature, with a cloth or rack underneath.</dd>
        <dt>The lid did not pull in</dt>
        <dd>The jar has not sealed. Within 24 hours you can process it again with a new lid, or put it in the fridge and use it within 2 weeks.</dd>
        <dt>The contents leaked during boiling</dt>
        <dd>The jar was too full or the lid too loose. Leave the stated space. If the lid pulled in afterwards anyway, wipe the jar and store it as normal.</dd>
        <dt>The top layer has darkened</dt>
        <dd>Too much air was left in the jar. If the lid is pulled in and it smells normal, it is not dangerous — next time press out the bubbles and fill to the right level.</dd>
      </dl>

      <h2>Storage</h2>
      <p>Keep closed jars in a dark, cool, dry place (5–15 °C). An opened jar goes into the fridge. More: <a href="/guides/storing-preserves/">How to store preserves and how long they keep</a>.</p>

      <h2>Preserving recipes in Sofra</h2>
      <ul class="related">
        ${ALL}
      </ul>`,
    },
    {
      slug: 'vinegar-salt-and-sugar-for-preserves',
      title: 'Vinegar, salt and sugar: ratios for preserves',
      metaTitle: 'Vinegar, salt and sugar ratios for pickles, sauerkraut, jam and ajvar | Sofra',
      desc: 'How much vinegar, salt and sugar goes into the brine for pickles and peppers, into sauerkraut, jam, plum butter, ajvar and tomato passata — and why the ratios must never be cut by eye.',
      card: 'Brine for pickles, salt for sauerkraut, sugar for jam, acid for ajvar and passata.',
      lede: 'Preserves are kept by acid (vinegar or lemon), salt or sugar. You can change the flavour, but you must not cut these three by eye — they are why a jar lasts until spring.',
      body: `
      <div class="box">
        <h2>In short</h2>
        <ol>
          <li>Brine for pickles and pickled peppers: 1 part 9 % vinegar to at most 2 parts water (5 % vinegar: half and half).</li>
          <li>Per litre of brine: 20 g salt and 50–70 g sugar, to taste.</li>
          <li>Whole-head sauerkraut: 50 g coarse salt per litre of water. Shredded sauerkraut: 20 g salt per kilogram of cabbage.</li>
          <li>Jam: at least 500 g sugar per 1 kg prepared fruit. With less sugar — a water bath, and the fridge once opened.</li>
          <li>Ajvar: about 100 ml of 9 % vinegar per 5 kg peppers. Tomato passata: 1 tablespoon lemon juice in every 0.5 l jar.</li>
        </ol>
      </div>

      <h2>Why acid</h2>
      <p>Peppers, aubergine, carrot, cauliflower, cucumber and even tomatoes are not acidic enough to be safe on their own in a sealed jar. In such a jar, with no air, a bacterium can grow that makes a dangerous toxin (botulism) without changing the smell or taste. Acid prevents it — which is why the vinegar in pickles is never diluted more than stated, and why ajvar and tomato passata always get some acid.</p>

      <h2>Vinegar</h2>
      <table>
        <thead><tr><th>Vinegar</th><th>Acidity</th><th>Brine (vinegar : water)</th></tr></thead>
        <tbody>
          <tr><td>Spirit (white) vinegar</td><td>9 %</td><td>1 : 2 (at most)</td></tr>
          <tr><td>Spirit vinegar</td><td>6 %</td><td>1 : 1.3</td></tr>
          <tr><td>Cider or wine vinegar</td><td>5 %</td><td>1 : 1</td></tr>
          <tr><td>Home-made vinegar of unknown strength</td><td>?</td><td>do not use for jarred preserves</td></tr>
        </tbody>
      </table>
      <p>The acidity is printed on the bottle. If the pickles are too sharp for you, add more sugar or rinse them before eating — do not cut the vinegar.</p>

      <h2>Salt</h2>
      <table>
        <thead><tr><th>What</th><th>How much salt</th><th>Note</th></tr></thead>
        <tbody>
          <tr><td>Brine for pickles and peppers</td><td>20 g per litre</td><td>for flavour; the vinegar preserves</td></tr>
          <tr><td>Whole-head sauerkraut</td><td>50 g per litre of water (5 %)</td><td>+ a heaped tablespoon in each hollowed core</td></tr>
          <tr><td>Shredded sauerkraut</td><td>20 g per 1 kg cabbage (2 %)</td><td>weigh the cabbage after trimming</td></tr>
          <tr><td>Topping up shredded sauerkraut</td><td>20 g per litre of water</td><td>when the juice drops below the cabbage</td></tr>
          <tr><td>Ajvar</td><td>about 30 g per 5 kg peppers</td><td>for flavour</td></tr>
        </tbody>
      </table>
      <p>Coarse non-iodised salt without anti-caking agents is best for pickling. Iodised salt is not dangerous, but it can cloud the brine and darken vegetables. For sauerkraut, weigh the salt — too little and the cabbage softens and spoils, too much and it will not ferment.</p>

      <h2>Sugar</h2>
      <table>
        <thead><tr><th>What</th><th>Sugar</th><th>Note</th></tr></thead>
        <tbody>
          <tr><td>Jam</td><td>500–700 g per 1 kg fruit</td><td>less sugar = shorter life once opened</td></tr>
          <tr><td>Slatko</td><td>1 kg per 1 kg fruit</td><td>the thick syrup keeps the fruit whole</td></tr>
          <tr><td>Plum butter</td><td>0–100 g per 1 kg plums</td><td>long cooking preserves it; with no sugar — the water bath is a must</td></tr>
          <tr><td>Compote</td><td>200–300 g per litre of water</td><td>for flavour only — the water bath preserves it</td></tr>
          <tr><td>Pickle brine</td><td>50–70 g per litre</td><td>for flavour</td></tr>
        </tbody>
      </table>

      <h2>Lemon juice</h2>
      <p>Tomato passata gets 1 tablespoon of lemon juice per 0.5 l jar (2 tablespoons per 1 l jar), or ¼ teaspoon citric acid. Bottled juice has the most even acidity; fresh lemons vary, so if you use them, do not skimp. You can hardly taste it, and a pinch of sugar softens it once the jar is opened.</p>

      <h2>When something goes wrong</h2>
      <dl class="faq">
        <dt>The pickles are too sour</dt>
        <dd>Do not cut the vinegar next time — add sugar to the brine, and rinse the pickles briefly in cold water before eating.</dd>
        <dt>The pickle brine is cloudy</dt>
        <dd>If the lid is pulled in and it smells normal, the usual cause is iodised salt or hard water. If the lid bulges, the brine foams or smells strange — throw the jar away without tasting.</dd>
        <dt>The jam will not set</dt>
        <dd>Cook it longer, testing on a cold plate every few minutes. Runny jam is not spoiled, it just spreads — use it for cakes.</dd>
        <dt>The sauerkraut is soft and slimy</dt>
        <dd>There was too little salt or it was too warm (above 22 °C). Slimy sauerkraut that smells bad is thrown away; next time weigh the salt and keep the barrel at 15–20 °C.</dd>
      </dl>

      <h2>Recipes in Sofra</h2>
      <ul class="related">
        ${ALL}
      </ul>`,
    },
    {
      slug: 'sauerkraut-at-home',
      title: 'Sauerkraut at home: whole heads in a barrel and shredded in jars',
      metaTitle: 'How to make sauerkraut: whole heads in a barrel, brine, turning and shredded sauerkraut | Sofra',
      desc: 'Fermenting cabbage step by step: which heads, how much salt and brine, temperature, turning the brine, when it is ready, shredded sauerkraut in jars, and what is normal and what is a sign of spoilage.',
      card: 'Heads, 5 % brine, turning the brine, temperature and shredded sauerkraut in jars.',
      lede: 'Cabbage sours itself: salt draws out the juice and good bacteria turn the sugar in the cabbage into acid. Your job is to keep the cabbage under brine at all times, get the salt right and keep the barrel at the right temperature.',
      body: `
      <div class="box">
        <h2>In short</h2>
        <ol>
          <li>Use late, hard, heavy heads — early summer cabbage is soft and goes limp in brine.</li>
          <li>Brine: 50 g coarse salt per litre of cold boiled water; plus a tablespoon of salt in each hollowed core.</li>
          <li>The heads must stay under at least 5 cm of brine, held down with a board and a stone.</li>
          <li>Keep the barrel at 15–20 °C and turn the brine every 2–3 days for the first three weeks.</li>
          <li>It is ready in 4–6 weeks; after that keep it cold (below 10 °C).</li>
        </ol>
      </div>

      <h2>How much cabbage, brine and salt</h2>
      <table>
        <thead><tr><th>Barrel or bucket</th><th>Cabbage</th><th>Brine</th><th>Coarse salt</th></tr></thead>
        <tbody>
          <tr><td>20 l</td><td>6–7 heads (6–7 kg)</td><td>about 8 l water</td><td>400 g + 7 tablespoons in the cores</td></tr>
          <tr><td>30 l</td><td>10 heads (about 10 kg)</td><td>about 12 l water</td><td>600 g + 10 tablespoons in the cores</td></tr>
          <tr><td>50 l</td><td>16–18 heads</td><td>about 20 l water</td><td>1 kg + 17 tablespoons in the cores</td></tr>
        </tbody>
      </table>
      <p>For a family of four who make sarma, baked sauerkraut and sauerkraut salad in winter, a 30-litre barrel is usually enough: count 3–4 heads per person for the whole winter.</p>

      <h2>Whole heads in a barrel, step by step</h2>
      <h3>1. The container</h3>
      <p>The barrel or bucket must be food-grade (plastic marked for food, wood or glazed stoneware), clean and washed in hot water. A bucket with a tap at the bottom is most practical — the brine is turned through it. You also need a board that fits inside and a heavy clean stone or a container of water.</p>
      <h3>2. The heads</h3>
      <p>Remove the green outer leaves (keep a few good ones for the top). Cut a cone out of the core, 4–5 cm deep, and put a tablespoon of coarse salt in the hole.</p>
      <h3>3. Packing</h3>
      <p>Pack the heads tightly, holes up, filling gaps with small heads or halves. Add bay leaves, peppercorns and, if you like, a piece of horseradish or quince in between. Cover the top with the saved leaves.</p>
      <h3>4. Brine and weight</h3>
      <p>Make the brine from cold boiled water and salt and pour it over the heads. Put on the board and stone — the heads must be under at least 5 cm of brine and stay that way to the end. Cover the barrel with its lid or a clean cloth.</p>
      <h3>5. Temperature</h3>
      <p>15–20 °C is best. Colder and the cabbage sours slowly and stays bland; above 22 °C it softens and spoils easily.</p>
      <h3>6. Turning the brine</h3>
      <p>After 3–4 days start turning: run off 4–5 litres of brine through the tap (or a hose lowered to the bottom) and pour it back over the top. This evens out the salt and lets the gases escape. For the first 3 weeks turn it every 2–3 days, then once a week. If the brine drops, top up with new brine (50 g salt per litre).</p>
      <h3>7. When it is ready</h3>
      <p>In 4–6 weeks the leaves are sour, translucent and a nice yellow. Then move the barrel somewhere cold — a cellar, balcony or garage below 10 °C, but where it will not freeze. Take heads out with clean hands or tongs and put the board and stone straight back.</p>

      <h2>Shredded sauerkraut in jars</h2>
      <p>Shred the trimmed cabbage, weigh it and mix in 20 g salt per kilogram (and caraway if you like). Squeeze it with your hands until it gives off plenty of juice, then pack it hard into jars until the juice covers it, leaving 3–4 cm below the rim. Top with a cabbage leaf and something heavy (a small jar of water). Just rest the lid on — the gases must escape — and stand the jars on a plate. Keep them at 18–20 °C and press the cabbage down with a clean spoon every day. In 2–4 weeks it stops bubbling and is sour: then close the jars and put them in the fridge or a cold cellar.</p>

      <h2>What is normal and what is not</h2>
      <dl class="faq">
        <dt>A white film on the surface of the brine</dt>
        <dd>Normal — yeasts on the air. Skim it off when you turn the brine. The cabbage under the brine is fine.</dd>
        <dt>Bubbles, foam and a sour smell in the first weeks</dt>
        <dd>A sign that fermentation is working. That is why the brine is turned and the shredded cabbage pressed every day.</dd>
        <dt>The brine is cloudy</dt>
        <dd>Normal with sauerkraut. It only matters together with the other signs below.</dd>
        <dt>The cabbage is soft, slimy, pink or smells rotten</dt>
        <dd>There was too little salt, it was too warm or the cabbage was not under the brine. Throw those heads away; if the whole barrel is like that, throw it all away and wash the container well.</dd>
        <dt>Furry green or black mould on the surface</dt>
        <dd>Remove the mould and the top heads it touches; if it has got into the cabbage or keeps spreading, throw everything away. Prevent it by keeping the cabbage under brine at all times.</dd>
        <dt>The cabbage is not souring</dt>
        <dd>It is too cold. Move the barrel somewhere warmer (15–20 °C) and keep turning the brine.</dd>
      </dl>

      <h2>Storage</h2>
      <p>Heads in a barrel last until spring if kept cold and under brine; once it warms up they soften. Shredded sauerkraut in closed jars keeps 4–6 months in the fridge. Sauerkraut can also be frozen in portions.</p>

      <h2>Recipes in Sofra</h2>
      <ul class="related">
        ${rec('kiseli-kupus-glavice', 'Whole-head sauerkraut')}${rec('kiseli-kupus-ribani', 'Shredded sauerkraut in jars')}${rec('sarma-junetina', 'Sarma')}${rec('posna-sarma', 'Meatless sarma')}
        ${rec('podvarak-piletina', 'Baked sauerkraut with chicken')}${rec('jota', 'Bean and sauerkraut stew')}${rec('kranjska-zelje', 'Sausage with sauerkraut')}${rec('kupus-salata', 'Cabbage salad')}${rec('uz-kiseli-kupus', 'Sauerkraut on the side')}
      </ul>`,
    },
    {
      slug: 'storing-preserves',
      title: 'How to store preserves and how long they keep',
      metaTitle: 'How to store preserves: where, at what temperature and how long an opened jar keeps | Sofra',
      desc: 'Where and how to store jars of preserves, how long they keep closed and opened — ajvar, pickles, plum butter, jam, tomato passata, compote and sauerkraut — and how to arrange jars so nothing is wasted.',
      card: 'Dark and cool, how long closed and opened jars keep, order in the pantry.',
      lede: 'A well-sealed jar does not spoil overnight, but light, warmth and damp slowly take away its colour, flavour and lid. A store for preserves should be dark, cool and dry.',
      body: `
      <div class="box">
        <h2>In short</h2>
        <ol>
          <li>Keep jars somewhere dark, cool and dry, at 5–15 °C — never above the cooker, by a radiator or in the sun.</li>
          <li>Closed preserves are best within a year; use them before the next season.</li>
          <li>An opened jar goes into the fridge — times are in the table.</li>
          <li>Always use a clean, dry spoon, and never put leftovers from the plate back in the jar.</li>
          <li>Label every jar with what it is and when it was made, and put older jars at the front.</li>
        </ol>
      </div>

      <h2>How long they keep</h2>
      <table>
        <thead><tr><th>Preserve</th><th>Closed, in the pantry</th><th>Opened, in the fridge</th></tr></thead>
        <tbody>
          <tr><td>Ajvar</td><td>up to 12 months</td><td>2–3 weeks (cover the top with a thin layer of oil)</td></tr>
          <tr><td>Pickles, pickled peppers</td><td>up to 12 months</td><td>4–6 weeks, vegetables always under the brine</td></tr>
          <tr><td>Plum butter</td><td>up to 12 months</td><td>1–2 months</td></tr>
          <tr><td>Jam, slatko</td><td>up to 12 months</td><td>3–4 weeks</td></tr>
          <tr><td>Tomato passata</td><td>up to 12 months</td><td>4–5 days (or freeze the rest)</td></tr>
          <tr><td>Compote</td><td>up to 12 months</td><td>5–7 days</td></tr>
          <tr><td>Whole-head sauerkraut in a barrel</td><td>until spring, below 10 °C</td><td>a head taken out: 1 week</td></tr>
          <tr><td>Shredded sauerkraut in jars</td><td>4–6 months in the fridge</td><td>2–3 weeks</td></tr>
        </tbody>
      </table>
      <p class="muted">These times are for a jar made properly (water bath, lid pulled in). If the lid has popped, the jar is no longer sealed — see <a href="/guides/when-a-jar-goes-bad/">When a jar goes bad</a>.</p>

      <h2>Where to store them</h2>
      <h3>Cellar or larder</h3>
      <p>The best place: dark, 5–15 °C, not damp. Stand the jars on shelves rather than stacking them — the weight can push up the lid of the jar below.</p>
      <h3>A flat without a cellar</h3>
      <p>A cupboard in the coolest room, away from the kitchen and radiators, or a closed box in a bedroom. Light bleaches ajvar and tomato passata, so keep jars in boxes or behind doors.</p>
      <h3>Balcony and garage</h3>
      <p>Fine for a barrel of sauerkraut until the frosts. Jars freeze and crack in frost, and food that has frozen and thawed changes texture.</p>

      <h2>Order in the pantry</h2>
      <p>Enter what you make into Sofra’s Pantry (the “Made — to the pantry” button) — the menu then uses it for sides and knows how many jars you have. New jars at the back, old ones at the front. In spring, note what is left: that tells you what to make less of and what more.</p>

      <h2>When something goes wrong</h2>
      <dl class="faq">
        <dt>A jar froze</dt>
        <dd>If it cracked or the lid was pushed off — throw it away. If it is whole and the lid is pulled in, it can be eaten, but the vegetables will be softer.</dd>
        <dt>Preserves from last year</dt>
        <dd>If the lid is pulled in and the colour, smell and look are normal, they can be eaten — just weaker in flavour. Use them first.</dd>
        <dt>The lid is rusty</dt>
        <dd>If the rust is only on the outside and the lid is pulled in, use the jar soon. If the rust is underneath, on the rim or touching the food — throw the jar away.</dd>
      </dl>

      <h2>Recipes in Sofra</h2>
      <ul class="related">
        ${ALL}
      </ul>`,
    },
    {
      slug: 'when-a-jar-goes-bad',
      title: 'When a jar goes bad: the signs and what to do',
      metaTitle: 'Spoiled preserves: how to recognise a bad jar and what to do | Sofra',
      desc: 'Signs of spoiled preserves (bulging lid, foam, mould, smell), why a doubtful jar is never tasted, how to throw it away and clean up safely, and what is not a sign of spoilage.',
      card: 'Signs of spoilage, why never to taste, how to dispose and clean up, what is normal.',
      lede: 'Spoiled preserves are recognised with your eyes, ears and nose — never your tongue. If in doubt, throw the whole jar away: one jar of ajvar is not worth the risk.',
      body: `
      <div class="box">
        <h2>In short</h2>
        <ol>
          <li>Throw a jar away if the lid bulges, is loose or clicks, if it spurts when opened, if bubbles rise in it (unless it is sauerkraut), if it has mould or smells strange.</li>
          <li>Never taste a doubtful jar, not even the tip of a spoon, and do not give it to animals.</li>
          <li>Do not open a bulging lid near your face. Put the closed jar in a bag, tie it and put it in the bin.</li>
          <li>If the contents leaked, clean everything with bleach diluted with water (1 : 5) and wash your hands.</li>
          <li>If anyone who ate from a jar gets double vision, drooping eyelids or difficulty swallowing and speaking — call an ambulance at once.</li>
        </ol>
      </div>

      <h2>Signs of spoilage</h2>
      <table>
        <thead><tr><th>What you see</th><th>What it means</th><th>What to do</th></tr></thead>
        <tbody>
          <tr><td>The lid bulges or moves when pressed</td><td>gas is forming in the jar — microbes at work</td><td>throw away, do not open</td></tr>
          <tr><td>The jar spurts or the contents shoot out when opened</td><td>pressure from gas</td><td>throw away, do not taste</td></tr>
          <tr><td>Rising bubbles, foam (in pickles, ajvar, passata, compote)</td><td>fermentation that should not be there</td><td>throw away</td></tr>
          <tr><td>Mould on the surface or under the lid</td><td>the jar was not sealed properly</td><td>throw away the whole jar</td></tr>
          <tr><td>A sour, boozy or rotten smell where there should not be one</td><td>spoilage</td><td>throw away</td></tr>
          <tr><td>Slimy, soft or discoloured contents</td><td>spoilage</td><td>throw away</td></tr>
          <tr><td>Juice has leaked, the jar is sticky outside</td><td>the lid has failed</td><td>throw away</td></tr>
        </tbody>
      </table>

      <h2>Why you never taste it</h2>
      <p>The most dangerous kind of spoilage — botulism — need not be seen or smelt at all. The bacterium grows in a sealed, airless jar of vegetables that are not acidic enough: ajvar, tomato passata without lemon juice, vegetables in oil, beans or meat in jars. The toxin it makes is dangerous even in tiny amounts. That is why a doubtful jar is thrown away untasted, and why ajvar and tomato passata always get acid and the jars are boiled. It does not grow in jam with enough sugar, in properly made pickles or in sauerkraut.</p>

      <h2>How to throw a jar away safely</h2>
      <ol>
        <li>Put the closed jar, lid on, into a plastic bag, tie it and put it into a second bag. Put it in the bin — not on the compost, not down the toilet, not to animals.</li>
        <li>If the jar is open or has leaked: put on gloves, soak up the contents with paper towels and put them in the bag with the jar.</li>
        <li>Wipe the surfaces (shelf, table, sink) with bleach diluted with water (1 part bleach to 5 parts water), leave for 30 minutes, then wash with water.</li>
        <li>Throw away sponges and cloths that touched it. Take off the gloves and wash your hands well with soap.</li>
      </ol>

      <h2>Mould on jam and plum butter</h2>
      <p>People used to scrape the mould off the top and eat the jam. Today the advice is to throw away the whole jar: mould sends threads deeper than you can see, and some kinds make toxins. In an opened jar in the fridge it means it stood too long or was served with a dirty spoon.</p>

      <h2>What is not a sign of spoilage</h2>
      <dl class="faq">
        <dt>A white film on sauerkraut</dt>
        <dd>Yeasts on the air — skim them off. The cabbage under the brine is fine.</dd>
        <dt>Cloudy brine with sauerkraut</dt>
        <dd>Normal with any fermentation.</dd>
        <dt>A little white sediment at the bottom of pickles</dt>
        <dd>Usually salt, spices and hard water. If the lid is pulled in and the smell and colour are normal — it is not dangerous.</dd>
        <dt>Sugar crystals in jam or plum butter</dt>
        <dd>The jam was cooked too long or is old. Not dangerous — warm it with a spoonful of water.</dd>
        <dt>A darker top layer</dt>
        <dd>Air in the jar. If the lid is pulled in and everything else is normal, it is not dangerous.</dd>
      </dl>

      <h2>If someone falls ill</h2>
      <p>Signs of botulism usually start 12–36 hours after eating (sometimes later): double or blurred vision, drooping eyelids, slurred speech and difficulty swallowing, a dry mouth and muscle weakness that spreads. Call an ambulance at once and say what was eaten. Keep the jar and any leftovers closed, in a bag, for the doctors.</p>

      <h2>How to stop it happening again</h2>
      <p>The usual causes: the jar was not boiled in water or not for long enough, too little vinegar or lemon juice, a chipped rim, an old lid, a storage place that is too warm. It is all in the guide <a href="/guides/jars-and-sterilising/">Jars for preserves: washing, sterilising and the water bath</a>.</p>

      <h2>Recipes in Sofra</h2>
      <ul class="related">
        ${ALL}
      </ul>`,
    },
  ],
};
