// Roštilj guides, bosanski (ijekavica). Built into vodici/<slug>/index.html by tools/grill-guides/build.mjs.
// Rules: no countries/regions, no brands, no sources; recipes linked as /#/recipe/<id>.
const rec = (id, name) => `<li><a href="/#/recipe/${id}">${name}</a></li>`;

export const BS = {
  lang: 'bs', dir: 'vodici', other: 'guides', eyebrow: 'Vodič · Roštilj', all: 'Svi vodiči', menu: 'Sedmični jelovnik', recipes: 'Recepti',
  guidesNav: 'Vodiči', more: 'Još o roštilju', indexTitle: 'Vodiči za kuhanje', indexLede: 'Osnove domaće kuhinje korak po korak: omjeri, porcije, vremena i šta uraditi kad nešto pođe po zlu.',
  basics: 'Osnove', grill: 'Roštilj', grillLede: 'Od mesa do stola: izbor mesa, oblikovanje, marinade, žar, dimljenje, salamurenje i prilozi.',
  guides: [
    {
      slug: 'izbor-mesa-za-rostilj',
      title: 'Koje meso za roštilj i koliko po osobi',
      metaTitle: 'Koje meso za roštilj: komadi, masnoća i količina po osobi | Sofra',
      desc: 'Koji komad mesa kupiti za ćevape, pljeskavice, ražnjiće, odreske i ribu na žaru, na šta paziti u mesnici i koliko mesa treba po osobi.',
      card: 'Komad za svako jelo, masnoća, kupovina i količine po osobi.',
      lede: 'Na roštilju se meso peče brzo i na jakoj vatri, pa mu treba malo masnoće i komad koji ne postaje žilav. Mršava prsa i but traže marinadu i pažnju; vrat, plećka i batak praštaju greške.',
      body: `
      <div class="box">
        <h2>Ukratko</h2>
        <ol>
          <li>Za mljeveno (ćevapi, pljeskavice) uzmi meso s oko 20 % masnoće — junetinu od plećke, vrata ili rebara.</li>
          <li>Za ražnjiće: svinjski vrat, pileći batak bez kosti ili pileća prsa u marinadi.</li>
          <li>Za odreske: ramstek, rozbratna ili vrat, debljine 2–3 cm.</li>
          <li>Računaj 250–300 g sirovog mesa po odrasloj osobi kad je roštilj glavno jelo.</li>
          <li>Meso kupi dan ranije, da stigne odležati u marinadi ili soli.</li>
        </ol>
      </div>

      <h2>Koji komad za šta</h2>
      <table>
        <thead><tr><th>Jelo</th><th>Najbolji komad</th><th>Zašto</th></tr></thead>
        <tbody>
          <tr><td>Ćevapi</td><td>junetina: plećka, vrat, potrbušina; može pola junetine i pola janjetine</td><td>dovoljno masnoće da ostanu sočni, meso se dobro veže</td></tr>
          <tr><td>Pljeskavica</td><td>junetina ili junetina sa svinjskim vratom (2 : 1)</td><td>svinjetina daje sočnost i mekoću</td></tr>
          <tr><td>Svinjski ražnjići</td><td>svinjski vrat</td><td>prošaran masnoćom, ne suši se</td></tr>
          <tr><td>Pileći ražnjići</td><td>otkošteni batak; prsa samo u marinadi</td><td>batak je sočniji, prsa se lako osuše</td></tr>
          <tr><td>Vješalica, odresci</td><td>svinjska slabina (kare), svinjski vrat</td><td>slabina je mršava — puni se ili peče kratko</td></tr>
          <tr><td>Juneći odrezak</td><td>ramstek, rozbratna, juneći vrat</td><td>mekani komadi koji podnesu jaku vatru</td></tr>
          <tr><td>Janjetina</td><td>kotleti, but bez kosti za ražnjiće</td><td>masnoća na rubu se lijepo zapeče</td></tr>
          <tr><td>Piletina s kosti</td><td>batci, karabataci, krilca</td><td>peku se polako sa strane žara</td></tr>
          <tr><td>Riba</td><td>cijela orada, brancin, skuša, pastrmka; lignje</td><td>cijela riba s kožom ne raspada se na rešetki</td></tr>
        </tbody>
      </table>
      <p>Komadi za dugo kuhanje — goveđe koljeno, prednji but za gulaš, rebra s puno vezivnog tkiva — na roštilju ostanu žilavi. Njih ostavi za lonac, ili ih isijeci tanko i mariniraj preko noći.</p>

      <h2>Koliko mesa po osobi</h2>
      <p>Količine su za sirovo meso, bez kosti ako nije drukčije rečeno. Pečenjem meso izgubi oko četvrtinu težine.</p>
      <table>
        <thead><tr><th>Šta</th><th>Po odrasloj osobi</th><th>Za 4 osobe</th></tr></thead>
        <tbody>
          <tr><td>Roštilj kao glavno jelo (miješano meso)</td><td>250–300 g</td><td>1–1,2 kg</td></tr>
          <tr><td>Uz puno priloga i salata</td><td>180–200 g</td><td>750–800 g</td></tr>
          <tr><td>Ćevapi (25–30 g komad)</td><td>8–10 komada</td><td>oko 1 kg mesa</td></tr>
          <tr><td>Pljeskavica</td><td>1 komad od 200–250 g</td><td>800 g–1 kg</td></tr>
          <tr><td>Ražnjići</td><td>2 štapića (200–250 g)</td><td>800 g–1 kg</td></tr>
          <tr><td>Pileći batci, krilca (s kosti)</td><td>300–350 g</td><td>1,2–1,4 kg</td></tr>
          <tr><td>Cijela riba</td><td>1 riba od 350–450 g</td><td>4 ribe</td></tr>
          <tr><td>Lignje (očišćene)</td><td>200–250 g</td><td>800 g–1 kg</td></tr>
        </tbody>
      </table>
      <p class="muted">Djeci obično treba pola porcije odrasle osobe. Za goste dodaj još jednu porciju — roštilj se uvijek pojede.</p>

      <h2>Na šta paziti u mesnici</h2>
      <h3>Boja i miris</h3>
      <p>Junetina je tamnocrvena, svinjetina ružičasta, piletina blijedo ružičasta. Meso ne smije biti ljepljivo ni sivo i ne smije imati kiselkast miris. Masnoća je bijela do krem boje, nikad žuta i mazava.</p>
      <h3>Mljeveno meso</h3>
      <p>Najbolje je izabrati komad i zamoliti mesara da ga samelje pred tobom, dva puta: prvo na krupnoj, pa na sitnoj ploči. Tako znaš šta je unutra i koliko masnoće ima. Gotovo mljeveno meso iskoristi isti dan.</p>
      <h3>Debljina odrezaka</h3>
      <p>Odresci za roštilj neka budu debeli 2–3 cm. Tanji se osuše prije nego što dobiju koricu; deblji traže indirektnu toplinu.</p>
      <h3>Riba</h3>
      <p>Svježa riba ima bistre, ispupčene oči, crvene škrge i čvrsto meso koje se vrati kad ga pritisneš. Zamoli da ti je očiste, ali ostave krljušt na mjestu ako je peče s kožom — štiti meso.</p>

      <h2>Kad nešto pođe po zlu</h2>
      <dl class="faq">
        <dt>Ćevapi su suhi i mrvičasti</dt>
        <dd>Meso je bilo previše mršavo ili nije dovoljno mijeseno. Sljedeći put uzmi masniji komad (oko 20 %) i mijesi dok smjesa ne postane ljepljiva.</dd>
        <dt>Odrezak je žilav</dt>
        <dd>Komad je bio za kuhanje, a ne za roštilj, ili je rezan uzduž vlakana. Reži poprijeko na vlakna i na tanke trake.</dd>
        <dt>Piletina je suha</dt>
        <dd>Prsa su pečena predugo. Uzmi batak ili prsa mariniraj u jogurtu i peci dok u sredini nema 74 °C, ne duže.</dd>
      </dl>

      <h2>Čuvanje</h2>
      <p>Sirovo meso drži u frižideru na 0–4 °C, na najnižoj polici, u zatvorenoj posudi. Komade iskoristi za 2–3 dana, mljeveno i piletinu za 1 dan. Smrznuto meso odmrzavaj polako u frižideru, preko noći, nikad na stolu.</p>

      <h2>Recepti sa žara u Sofri</h2>
      <ul class="related">
        ${rec('cevapi', 'Ćevapi')}${rec('raznjici-svinjski', 'Svinjski ražnjići s lukom i paprikom')}${rec('raznjici-pileci', 'Pileći ražnjići u jogurtu')}
        ${rec('junetina-odrezak-zar', 'Juneći odrezak na žaru')}${rec('janjeci-kotleti-zar', 'Janjeći kotleti na žaru')}${rec('riba-zar-blitva', 'Riba na žaru s blitvom i krompirom')}
      </ul>`,
    },
    {
      slug: 'cevapi-pljeskavice-raznjici',
      title: 'Ćevapi, pljeskavice i ražnjići: mljevenje, rezanje i oblikovanje',
      metaTitle: 'Kako napraviti ćevape, pljeskavice i ražnjiće: mljevenje i oblikovanje | Sofra',
      desc: 'Mljevenje mesa, koliko soli i vode, zašto se smjesa mijesi i odmara, veličina ćevapa i pljeskavica, rezanje i nabadanje ražnjića, tučenje i otkoštavanje.',
      card: 'Mljevenje, so i voda, mijesenje, veličine i nabadanje na štapić.',
      lede: 'Dobar ćevap drži oblik bez jaja i hljeba: meso je dovoljno masno, posoljeno, dobro izmiješano i odmoreno preko noći. Ražnjić je dobar kad su komadi iste veličine.',
      body: `
      <div class="box">
        <h2>Ukratko</h2>
        <ol>
          <li>Meso i mašinu za mljevenje drži hladnim — 20–30 minuta u zamrzivaču prije mljevenja.</li>
          <li>Na 1 kg mljevenog mesa: 16–18 g soli (oko 3 kašičice) i 80–100 ml hladne vode.</li>
          <li>Mijesi 5 minuta dok smjesa ne postane ljepljiva i ne vuče se za rukom.</li>
          <li>Odmori smjesu u frižideru bar 2 sata, najbolje preko noći.</li>
          <li>Ćevap 25–30 g, dug 6–7 cm; pljeskavica 1 cm debela i šira od lepinje.</li>
        </ol>
      </div>

      <h2>Mljevenje</h2>
      <p>Meso isijeci na trake ili kocke od 3–4 cm i skini žile i opne. Ako ga melješ sam, pusti ga dva puta kroz mašinu: prvo kroz krupnu ploču (8 mm), pa kroz sitnu (4–5 mm). Toplo meso se razmaže umjesto da se samelje i masnoća se odvoji, zato sve drži hladnim. Ako nemaš mašinu, mesar će ti samljeti komad koji izabereš.</p>

      <h2>So, voda i mijesenje</h2>
      <table>
        <thead><tr><th>Na 1 kg mesa</th><th>Ćevapi</th><th>Pljeskavica</th></tr></thead>
        <tbody>
          <tr><td>So</td><td>16–18 g</td><td>16–18 g</td></tr>
          <tr><td>Hladna (gazirana) voda</td><td>80–100 ml</td><td>50 ml</td></tr>
          <tr><td>Bijeli luk</td><td>1–2 češnja ili bez</td><td>2 češnja</td></tr>
          <tr><td>Crveni luk</td><td>—</td><td>1 glavica, vrlo sitno</td></tr>
          <tr><td>Biber, ljuta paprika</td><td>malo biber</td><td>po ukusu</td></tr>
        </tbody>
      </table>
      <p>So izvuče bjelančevine iz mesa i one ga vežu — zato se smjesa mijesi dok ne postane ljepljiva, a ne samo izmiješa. Voda čini ćevap sočnim. Jaja, prezle i hljeb ne trebaju; od njih je ćevap mekan kao ćufte.</p>
      <p>Odmaranje preko noći nije samo tradicija: so za to vrijeme prođe kroz cijelo meso, smjesa se stegne i lakše se oblikuje.</p>

      <h2>Oblikovanje</h2>
      <h3>Ćevapi</h3>
      <p>Ruke nakvasi hladnom vodom. Uzmi komad od 25–30 g (veličine oraha u ljusci), razvaljaj ga među dlanovima u prstić dug 6–7 cm i debeo oko 2 cm. Slaži ih na tacnu tako da se ne dodiruju. Brže ide s kesom za ukrašavanje bez nastavka ili s nastavkom od 2 cm: istisni dugu kobasicu i reži je nožem.</p>
      <h3>Pljeskavice</h3>
      <p>Komad od 150–250 g stavi između dvije folije i dlanom ga razvuci u krug debeo oko 1 cm, prečnika 15–20 cm. Na sredini prstima napravi plitko udubljenje — pljeskavica se pečenjem skupi i naduva u sredini, a ovako ostane ravna. Neka bude malo šira od lepinje, jer se skupi.</p>
      <h3>Punjena pljeskavica</h3>
      <p>Napravi dva tanja kruga, na jedan stavi sir i kajmak, ostavi 2 cm ruba, pokrij drugim krugom i rubove dobro stisni prstima. Peci je samo jednom okrenutu.</p>

      <h2>Ražnjići</h2>
      <ol>
        <li>Meso isijeci na kocke od 2,5–3 cm, sve iste veličine, da se peku jednako.</li>
        <li>Drvene štapiće potopi u vodu 30 minuta da ne gore; metalni ne trebaju.</li>
        <li>Nabadaj meso gusto, ali ne nabijeno — između komada neka ostane milimetar da toplina prođe.</li>
        <li>Između mesa stavi luk i papriku isječene na komade iste veličine.</li>
        <li>Mekše i tanje komade (piletinu) peci na posebnim štapićima, ne s junetinom.</li>
        <li>Dva paralelna štapića kroz isto meso sprječavaju da se komadi okreću kad okrećeš ražnjić.</li>
      </ol>

      <h2>Tučenje, otkoštavanje i rezanje na leptir</h2>
      <p><b>Tučenje:</b> odrezak stavi između dvije folije i tuci ravnom stranom batića od sredine prema rubovima, dok ne bude iste debljine svuda. Ne tuci ga da bude tanak kao za šniclu — za roštilj neka ostane 1,5–2 cm.</p>
      <p><b>Otkoštavanje batka:</b> s unutrašnje strane zasijeci uz kost cijelom dužinom, nožem odvoji meso oko kosti i na zglobu presijeci tetive. Dobiješ ravan komad koji se peče brzo i jednako.</p>
      <p><b>Leptir:</b> deblja pileća prsa prereži vodoravno skoro do kraja i otvori ih kao knjigu. Tako se peku duplo brže i ne osuše se izvana.</p>

      <h2>Kad nešto pođe po zlu</h2>
      <dl class="faq">
        <dt>Ćevapi se raspadaju na rešetki</dt>
        <dd>Smjesa nije dovoljno mijesena, nije odmorila ili je meso bilo toplo. Mijesi duže, odmori preko noći i okreni ih tek kad se sami odvoje od rešetke.</dd>
        <dt>Pljeskavica se naduvala kao lopta</dt>
        <dd>Nije bilo udubljenja u sredini ili je bila predebela. Napravi je tanju i udubi sredinu.</dd>
        <dt>Ražnjići su izvana zagorjeli, a u sredini sirovi</dt>
        <dd>Komadi su preveliki ili vatra prejaka. Reži na 2,5 cm i peci na srednjem žaru, okrećući češće.</dd>
      </dl>

      <h2>Čuvanje i zamrzavanje</h2>
      <p>Oblikovane ćevape i pljeskavice drži u frižideru najviše dan. Možeš ih zamrznuti na tacni, pa prebaciti u kesu, do 3 mjeseca. Peci ih odmrznute preko noći u frižideru.</p>

      <h2>Recepti u Sofri</h2>
      <ul class="related">
        ${rec('cevapi', 'Ćevapi')}${rec('pljeskavica', 'Pljeskavica s lukom i hljebom')}${rec('punjena-pljeskavica', 'Punjena pljeskavica sa sirom i kajmakom')}
        ${rec('raznjici-svinjski', 'Svinjski ražnjići s lukom i paprikom')}${rec('raznjici-pileci', 'Pileći ražnjići u jogurtu')}${rec('vjesalica-punjena', 'Punjena vješalica')}${rec('mijesano-meso', 'Miješano meso s roštilja')}
      </ul>`,
    },
    {
      slug: 'marinade-za-rostilj',
      title: 'Marinade za roštilj: šta ide u njih i koliko dugo',
      metaTitle: 'Marinade za roštilj: osnovni recepti i vrijeme mariniranja po vrsti mesa | Sofra',
      desc: 'Šest osnovnih marinada za svinjetinu, piletinu, janjetinu, ribu i povrće, koliko marinade na kilogram mesa, koliko dugo marinirati i kada soliti.',
      card: 'Šest osnovnih marinada, vrijeme po vrsti mesa i kada soliti.',
      lede: 'Marinada daje okus površini mesa i čuva ga da se ne osuši. Duboko u meso ulazi samo so; ulje, začini i bijeli luk ostaju izvana — zato je dovoljno nekoliko sati, a ne dani.',
      body: `
      <div class="box">
        <h2>Ukratko</h2>
        <ol>
          <li>Na 1 kg mesa dovoljno je 100–150 ml marinade.</li>
          <li>Osnova: ulje + začini + bijeli luk; po želji malo kiseline (limun, sirće, jogurt).</li>
          <li>Mariniraj u frižideru, u zatvorenoj posudi ili kesi, i okreni meso jednom-dvaput.</li>
          <li>Piletina i svinjetina 2–12 sati, riba samo 15–30 minuta.</li>
          <li>Prije pečenja višak marinade obriši — kaplje, plamti i gori.</li>
        </ol>
      </div>

      <h2>Koliko dugo</h2>
      <table>
        <thead><tr><th>Meso</th><th>Najmanje</th><th>Najduže</th><th>Napomena</th></tr></thead>
        <tbody>
          <tr><td>Piletina</td><td>1 sat</td><td>24 sata</td><td>u jogurtu najbolje 4–12 sati</td></tr>
          <tr><td>Svinjetina (vrat, slabina)</td><td>2 sata</td><td>24 sata</td><td>preko noći je idealno</td></tr>
          <tr><td>Junetina (odresci)</td><td>—</td><td>12 sati</td><td>dobrim odrescima dosta so, ulje i biber</td></tr>
          <tr><td>Janjetina</td><td>1 sat</td><td>12 sati</td><td>ruzmarin, bijeli luk, limun</td></tr>
          <tr><td>Riba</td><td>15 min</td><td>30 min</td><td>limun duže „skuha“ meso</td></tr>
          <tr><td>Lignje</td><td>15 min</td><td>1 sat</td><td>bez kiseline, samo ulje i luk</td></tr>
          <tr><td>Povrće</td><td>15 min</td><td>2 sata</td><td>patlidžan prvo posoli</td></tr>
        </tbody>
      </table>
      <p>Kiselina (limun, sirće, vino) i jogurt omekšaju samo površinu. Predugo u njima i meso postaje kašasto izvana, pa zato drži vrijeme iz tabele.</p>

      <h2>Kada soliti</h2>
      <p>So ili stavi bar 40 minuta prije pečenja, ili tek neposredno prije nego što meso ide na žar. Ako posoliš 10–20 minuta ranije, so izvuče sok na površinu, a meso ga još nije vratilo — korica se teško stvara. Kod ražnjića i odrezaka sigurnije je soliti na kraju; kod piletine so može odmah u marinadu.</p>

      <h2>Šest osnovnih marinada (za 1 kg mesa)</h2>
      <h3>1. Osnovna, za svinjetinu i junetinu</h3>
      <p>5 kašika ulja, 3 češnja bijelog luka, 1 kašičica slatke aleve paprike, ½ kašičice bibera. Po želji sitno isjeckan crveni luk.</p>
      <h3>2. Jogurt, za piletinu</h3>
      <p>150 ml gustog jogurta, sok od ½ limuna, 2 češnja bijelog luka, 1 kašičica aleve paprike, 2 kašike ulja, 1 kašičica soli.</p>
      <h3>3. Limun i ruzmarin, za janjetinu i batke</h3>
      <p>4 kašike maslinovog ulja, sok od 1 limuna, 4 češnja bijelog luka, 1 kašičica suhog ruzmarina ili dvije grančice svježeg, biber.</p>
      <h3>4. Med i paprika, za krilca i rebarca</h3>
      <p>3 kašike ulja, 1 kašika meda, 2 kašičice slatke aleve paprike, prstohvat ljute, 3 češnja bijelog luka, sok od ½ limuna. Med zagori brzo — peci na indirektnoj toplini, a nad žar tek na kraju.</p>
      <h3>5. Pivo i luk, za svinjski vrat</h3>
      <p>200 ml svijetlog piva, 1 glavica crvenog luka na kolutove, 3 kašike ulja, 1 kašičica bibera, kašičica senfa. Preko noći.</p>
      <h3>6. Za ribu i lignje</h3>
      <p>4 kašike maslinovog ulja, 2 češnja bijelog luka, šaka peršuna. Limun tek kad je riba pečena.</p>

      <h2>Korak po korak</h2>
      <ol>
        <li>Meso osuši ubrusom — marinada se bolje drži za suhu površinu.</li>
        <li>Sastojke marinade izmiješaj u posudi ili kesi, ubaci meso i dobro ga promasiraj.</li>
        <li>Istisni zrak iz kese ili pokrij posudu i stavi u frižider.</li>
        <li>Pola sata prije pečenja meso izvadi iz frižidera.</li>
        <li>Obriši višak marinade, po potrebi posoli i peci.</li>
      </ol>

      <h2>Kad nešto pođe po zlu</h2>
      <dl class="faq">
        <dt>Meso je izvana kašasto</dt>
        <dd>Bilo je predugo u limunu, sirćetu ili jogurtu. Drži se vremena iz tabele, ribu mariniraj bez kiseline.</dd>
        <dt>Marinada gori i dimi</dt>
        <dd>Previše ulja, šećera ili meda na površini. Obriši višak i peci dio vremena sa strane žara.</dd>
        <dt>Okus se ne osjeća</dt>
        <dd>Fali soli. So nosi okus — bez nje ni najbolja marinada ne pomaže.</dd>
      </dl>

      <div class="box tip">
        <h3>Sigurnost</h3>
        <p>Mariniraj uvijek u frižideru, ne na stolu. Marinadu u kojoj je bilo sirovo meso ne koristi kao umak — ako je hoćeš preliti, prokuhaj je 3 minute. Za pečeno meso uzmi čist tanjir, ne onaj na kojem je bilo sirovo.</p>
      </div>

      <h2>Recepti s marinadom u Sofri</h2>
      <ul class="related">
        ${rec('raznjici-pileci', 'Pileći ražnjići u jogurtu')}${rec('pileca-krilca-zar', 'Pileća krilca na žaru')}${rec('pileci-batci-zar', 'Pileći batci s limunom i ruzmarinom')}
        ${rec('raznjici-svinjski', 'Svinjski ražnjići s lukom i paprikom')}${rec('janjeci-kotleti-zar', 'Janjeći kotleti na žaru')}${rec('povrce-zar', 'Povrće na žaru')}
      </ul>`,
    },
    {
      slug: 'salamurenje-i-susenje-mesa',
      title: 'Salamurenje i sušenje mesa kod kuće',
      metaTitle: 'Salamurenje i sušenje mesa: suho i mokro salamurenje, so i vrijeme | Sofra',
      desc: 'Kratka salamura za sočniju piletinu i svinjetinu na roštilju, suho i mokro salamurenje za suho meso, koliko soli na kilogram, temperature i vremena sušenja.',
      card: 'Kratka salamura za roštilj, suho i mokro salamurenje, sušenje.',
      lede: 'Salamurenje je soljenje mesa: kratko, nekoliko sati, da piletina i svinjetina ostanu sočne na žaru — ili dugo, sedmicama, za suho meso koje se poslije dimi i suši. Za dugo salamurenje treba hladno vrijeme, tačna količina soli i so za salamurenje.',
      body: `
      <div class="box">
        <h2>Ukratko</h2>
        <ol>
          <li>Kratka salamura za roštilj: 50 g soli na 1 litar vode, piletina 1–4 sata, svinjetina 4–12 sati.</li>
          <li>Suho meso: 25–30 g soli na 1 kg mesa (2,5–3 %), od toga dio ili sve so za salamurenje.</li>
          <li>Meso se soli na 2–5 °C — u frižideru ili zimi u hladnoj prostoriji.</li>
          <li>Vrijeme: oko 1 sedmica na svaka 3 cm debljine komada.</li>
          <li>Poslije soljenja meso se ispere, osuši, dimi i suši dok ne izgubi trećinu težine.</li>
        </ol>
      </div>

      <h2>Kratka salamura prije roštilja</h2>
      <p>Pileća prsa, batci i svinjska slabina ostanu primjetno sočniji ako prije pečenja odleže u slanoj vodi. So uđe u meso i zadrži vodu dok se peče.</p>
      <table>
        <thead><tr><th>Meso</th><th>Salamura</th><th>Vrijeme</th></tr></thead>
        <tbody>
          <tr><td>Pileća prsa, ražnjići</td><td>50 g soli + 1 l vode</td><td>1–2 sata</td></tr>
          <tr><td>Cijelo pile, batci</td><td>50 g soli + 1 l vode</td><td>4–12 sati</td></tr>
          <tr><td>Svinjska slabina, vrat u komadu</td><td>50 g soli + 1 l vode</td><td>6–12 sati</td></tr>
          <tr><td>Pastrmka, skuša (prije dimljenja)</td><td>50–60 g soli + 1 l vode</td><td>1–2 sata</td></tr>
        </tbody>
      </table>
      <p>U salamuru možeš dodati lovor, biber u zrnu, bijeli luk i kašiku šećera. Meso mora biti potpuno potopljeno, u frižideru. Poslije ga isperi, dobro osuši i ne soli više — samo začini.</p>

      <h2>Salamurenje za suho meso</h2>
      <p>Za suho meso uzimaju se cijeli, čisti komadi bez kosti: goveđi but (bot, frikando), svinjski vrat, slabina ili but. Komadi neka budu do 5–6 cm debeli, da so i dim prođu do sredine.</p>
      <h3>So za salamurenje</h3>
      <p>So za salamurenje je kuhinjska so s malo nitrita. Čuva crvenu boju mesa i, što je važnije, sprječava rast bakterija koje izazivaju botulizam u mesu koje se dugo dimi i suši na niskoj temperaturi. Za meso koje se hladno dimi i suši sedmicama koristi je obavezno i drži se uputstva na pakovanju; ne miješaj je s običnom solju „od oka“.</p>

      <h3>Suho salamurenje</h3>
      <ol>
        <li>Izvagaj meso. Na 1 kg mesa odmjeri 25–30 g soli za salamurenje (ili mješavinu po uputstvu na pakovanju).</li>
        <li>Po želji dodaj 2–3 g šećera, zgnječen biber, lovor, bijeli luk.</li>
        <li>So dobro utrljaj sa svih strana, stavi meso u kesu ili posudu koja ne propušta i stavi na 2–5 °C.</li>
        <li>Svaki drugi dan ga okreni i promasiraj kroz kesu; sok koji pusti neka ostane uz meso.</li>
        <li>Drži ga oko 1 sedmicu na svaka 3 cm debljine (komad od 6 cm — 2 sedmice).</li>
      </ol>
      <h3>Mokro salamurenje</h3>
      <p>Napravi salamuru od 1 l vode i 70–80 g soli za salamurenje (po uputstvu na pakovanju), prokuhaj je s lovorom i biberom i potpuno ohladi. Meso složi u posudu, prelij da bude pokriveno i pritisni tanjirom. Drži na 2–5 °C, oko 1 dan na svaki centimetar debljine, i okreni ga svakih nekoliko dana.</p>

      <h2>Ispiranje, dimljenje i sušenje</h2>
      <ol>
        <li>Meso isperi hladnom vodom i ostavi ga sat-dva u čistoj vodi da se izjednači so na površini.</li>
        <li>Objesi ga da se osuši izvana, dan na hladnom i promajnom mjestu.</li>
        <li>Dimi ga hladnim dimom (ispod 25 °C) nekoliko sati dnevno, 1–3 sedmice — vidi vodič za dimljenje.</li>
        <li>Suši ga na 10–15 °C i umjerenoj vlazi, dok ne izgubi 30–35 % težine. Povremeno ga izvaži.</li>
      </ol>

      <h2>Kad nešto pođe po zlu</h2>
      <dl class="faq">
        <dt>Meso je preslano</dt>
        <dd>So je stavljena „od oka“ umjesto vagom. Preslane komade potopi u hladnu vodu na nekoliko sati prije dimljenja. Ubuduće izvagaj meso i so.</dd>
        <dt>Izvana je tvrdo, a u sredini mekano i vlažno</dt>
        <dd>Sušenje je bilo prebrzo, u toplom i suhom zraku. Kora se zatvorila i voda ne izlazi. Suši na nižoj temperaturi i vlažnijem zraku.</dd>
        <dt>Pojavila se bijela ili zelena plijesan</dt>
        <dd>Malo bijele plijesni na površini obriši krpom natopljenom u sirće. Zelena, crna, ljepljiva površina ili neugodan miris — meso baci.</dd>
      </dl>

      <div class="box tip">
        <h3>Sigurnost</h3>
        <p>Dugo salamurenje i sušenje radi samo s izvaganom solju za salamurenje, svježim mesom i na hladnom — ispod 5 °C dok se soli, ispod 15 °C dok se suši. Ako nemaš hladan prostor, salamuri u frižideru, a meso poslije toplo dimi i jedi kao pečeno, ne sušeno.</p>
      </div>

      <h2>Čuvanje</h2>
      <p>Osušeno meso čuvaj na hladnom i suhom, umotano u papir ili krpu, ne u plastiku. Kad ga načneš, drži ga u frižideru. Vakuumirano traje u frižideru nekoliko mjeseci.</p>

      <h2>U Sofri</h2>
      <ul class="related">
        ${rec('grah-suho-meso', 'Grah sa suhim mesom')}${rec('pileci-batci-zar', 'Pileći batci na žaru (kratka salamura po želji)')}${rec('vjesalica-punjena', 'Punjena vješalica')}
      </ul>`,
    },
    {
      slug: 'vatra-i-zar',
      title: 'Vatra i žar: kako peći na roštilju',
      metaTitle: 'Kako peći na roštilju: ćumur ili drvo, jačina žara, vremena i temperature | Sofra',
      desc: 'Ćumur, briketi ili drvo, kako upaliti vatru, kad je žar spreman, direktna i indirektna toplina, test dlanom, vremena pečenja za svako meso, temperature i odmaranje.',
      card: 'Ćumur ili drvo, jačina žara, dvije zone, vremena i odmaranje.',
      lede: 'Na roštilju se ne peče na plamenu nego na žaru prekrivenom sivim pepelom. Kad imaš vruću i hladniju stranu roštilja, možeš ispeći sve — od ćevapa za osam minuta do batka za četrdeset.',
      body: `
      <div class="box">
        <h2>Ukratko</h2>
        <ol>
          <li>Upali ćumur u dimnjaku za paljenje ili na nekoliko kockica za potpalu — bez benzina i špiritusa.</li>
          <li>Žar je spreman kad je ugalj prekriven sivim pepelom, za 20–30 minuta (drvo 45–60 minuta).</li>
          <li>Žar složi samo na jednu stranu: tamo se peče brzo, sa strane se dopeče polako.</li>
          <li>Rešetku dobro zagrij, očisti i premaži uljem prije nego što staviš meso.</li>
          <li>Pečeno meso odmori 3–10 minuta prije rezanja.</li>
        </ol>
      </div>

      <h2>Ćumur, briketi ili drvo</h2>
      <table>
        <thead><tr><th>Gorivo</th><th>Do žara</th><th>Traje</th><th>Za šta</th></tr></thead>
        <tbody>
          <tr><td>Drveni ugalj (ćumur)</td><td>20–30 min</td><td>45–60 min</td><td>ćevapi, ražnjići, odresci — jak žar</td></tr>
          <tr><td>Briketi</td><td>30–40 min</td><td>1,5–2 sata</td><td>batci, cijelo pile, dugo pečenje</td></tr>
          <tr><td>Tvrdo drvo (bukva, hrast, voćke)</td><td>45–60 min</td><td>dok dodaješ</td><td>miris dima; za veće društvo</td></tr>
        </tbody>
      </table>
      <p>Nikad ne loži četinare (bor, smrča) ni lakirano, farbano i impregnirano drvo — smola i hemikalije idu u meso. Za 1 kg mesa treba oko 1 kg ćumura.</p>

      <h2>Jačina žara: test dlanom</h2>
      <p>Drži dlan 10 cm iznad rešetke i broji koliko sekundi izdržiš.</p>
      <table>
        <thead><tr><th>Izdržiš</th><th>Žar</th><th>Otprilike</th><th>Za šta</th></tr></thead>
        <tbody>
          <tr><td>1–2 s</td><td>jak</td><td>250–300 °C</td><td>odresci, ćevapi, lignje, pljeskavice</td></tr>
          <tr><td>4–5 s</td><td>srednji</td><td>180–220 °C</td><td>ražnjići, piletina bez kosti, riba, povrće</td></tr>
          <tr><td>7–8 s</td><td>slab / sa strane</td><td>120–160 °C</td><td>batci, krilca, kobasice, dopečavanje</td></tr>
        </tbody>
      </table>

      <h2>Direktna i indirektna toplina</h2>
      <p><b>Direktno</b> znači iznad žara: brzo, jaka korica, za komade tanje od 3 cm. <b>Indirektno</b> znači pored žara, najbolje s poklopcem: roštilj radi kao rerna, za meso s kosti i deblje komade. Najlakše je složiti žar na dvije trećine roštilja, a jednu trećinu ostaviti praznu — tamo skloniš meso kad plamti ili kad je izvana gotovo, a unutra nije.</p>

      <h2>Vremena pečenja</h2>
      <table>
        <thead><tr><th>Šta</th><th>Žar</th><th>Ukupno</th></tr></thead>
        <tbody>
          <tr><td>Ćevapi</td><td>jak</td><td>8–10 min, okrećući</td></tr>
          <tr><td>Pljeskavica 1 cm</td><td>jak</td><td>8–10 min, okreni jednom</td></tr>
          <tr><td>Ražnjići (kocke 3 cm)</td><td>srednje jak</td><td>12–15 min</td></tr>
          <tr><td>Pileća prsa, ražnjići</td><td>srednji</td><td>10–12 min</td></tr>
          <tr><td>Pileći batci s kosti</td><td>indirektno + jak na kraju</td><td>35–45 min</td></tr>
          <tr><td>Krilca</td><td>indirektno + jak na kraju</td><td>25–30 min</td></tr>
          <tr><td>Juneći odrezak 2–3 cm</td><td>najjači</td><td>6–8 min srednje pečeno</td></tr>
          <tr><td>Svinjski odrezak 2 cm</td><td>srednje jak</td><td>10–14 min</td></tr>
          <tr><td>Janjeći kotleti</td><td>jak</td><td>6–8 min</td></tr>
          <tr><td>Kobasice, sudžuk</td><td>srednji</td><td>6–10 min</td></tr>
          <tr><td>Cijela riba 350–450 g</td><td>srednji</td><td>12–16 min</td></tr>
          <tr><td>Skuša</td><td>jak</td><td>8–10 min</td></tr>
          <tr><td>Lignje</td><td>najjači</td><td>4–6 min</td></tr>
          <tr><td>Povrće na ploške</td><td>srednji</td><td>6–12 min</td></tr>
        </tbody>
      </table>

      <h2>Temperature u sredini mesa</h2>
      <p>Najsigurnije je mjeriti termometrom zabodenim u najdeblji dio, bez kosti.</p>
      <table>
        <thead><tr><th>Meso</th><th>Gotovo na</th></tr></thead>
        <tbody>
          <tr><td>Piletina, puretina</td><td>74 °C — sok bistar, bez ružičastog</td></tr>
          <tr><td>Mljeveno meso (ćevapi, pljeskavice)</td><td>71 °C — pečeno skroz</td></tr>
          <tr><td>Svinjetina u komadu</td><td>63–70 °C, pa odmor 3 min</td></tr>
          <tr><td>Junetina: krvavo / srednje / dobro</td><td>52 / 57 / 70 °C</td></tr>
          <tr><td>Janjetina</td><td>60–65 °C</td></tr>
          <tr><td>Riba</td><td>55–60 °C — meso se lako odvaja od kosti</td></tr>
        </tbody>
      </table>

      <h2>Korak po korak</h2>
      <h3>1. Upali žar</h3>
      <p>Napuni dimnjak za paljenje ćumurom, ispod stavi zgužvane novine ili dvije kockice za potpalu i upali. Kad gornji ugljevi posijede, istresi ih u roštilj.</p>
      <h3>2. Složi dvije zone</h3>
      <p>Žar rasporedi na dvije trećine dna, deblje uz jedan rub. Stavi rešetku i ostavi je 5 minuta da se zagrije.</p>
      <h3>3. Očisti i nauli rešetku</h3>
      <p>Vruću rešetku očisti četkom, pa je pređi krpom ili pola glavice luka umočenim u ulje. Meso se tada ne lijepi.</p>
      <h3>4. Peci i ne diraj</h3>
      <p>Meso stavi i ostavi ga da se zapeče. Okreni ga kad se samo odvoji od rešetke — ako se lijepi, još nije vrijeme. Ne gnječi pljeskavice lopaticom: istisneš sok u vatru.</p>
      <h3>5. Odmori</h3>
      <p>Pečeno meso stavi na čist tanjir ili dasku. Ćevapi i ražnjići 2–3 minute, odresci 5 minuta, veliki komadi 10 minuta. Sok se vrati u meso.</p>

      <h2>Kad nešto pođe po zlu</h2>
      <dl class="faq">
        <dt>Plamen liže meso</dt>
        <dd>Kaplje masnoća. Skloni meso na hladniju stranu dok se plamen ne smiri. Ne gasi vatru vodom iz flaše — digne pepeo na meso.</dd>
        <dt>Meso se lijepi za rešetku</dt>
        <dd>Rešetka nije bila dovoljno vruća, čista ili nauljena, ili si okretao prerano. Pričekaj da se samo odvoji.</dd>
        <dt>Izvana zagorjelo, unutra sirovo</dt>
        <dd>Žar je prejak za tu debljinu. Prebaci meso na indirektnu stranu i poklopi da se dopeče.</dd>
        <dt>Žar se gasi prije kraja</dt>
        <dd>Premalo goriva ili zatvoreni otvori za zrak. Dodaj ćumur na rub na vrijeme i drži donje otvore otvorene.</dd>
      </dl>

      <div class="box tip">
        <h3>Bez roštilja: grill-tava</h3>
        <p>Sve se može i u teškoj tavi s rebrima ili livenoj tavi: zagrij je jako 5 minuta, meso premaži uljem (tavu ne), otvori prozor. Vremena su ista kao na jakom žaru; meso s kosti dopeci u rerni na 200 °C.</p>
      </div>

      <h2>Sigurnost</h2>
      <p>Roštilj drži napolju, dalje od zida i drveća, nikad u zatvorenom prostoru ni u garaži — ugalj stvara ugljen-monoksid. Djecu i kućne ljubimce drži podalje. Pepeo gasi tek kad se potpuno ohladi, najbolje sutradan, i ne baci ga u plastičnu kantu.</p>

      <h2>Recepti sa žara u Sofri</h2>
      <ul class="related">
        ${rec('cevapi', 'Ćevapi')}${rec('pileci-batci-zar', 'Pileći batci s limunom i ruzmarinom')}${rec('junetina-odrezak-zar', 'Juneći odrezak na žaru')}
        ${rec('riba-zar-blitva', 'Riba na žaru s blitvom i krompirom')}${rec('lignje-zar', 'Lignje na žaru')}${rec('povrce-zar', 'Povrće na žaru')}${rec('mijesano-meso', 'Miješano meso s roštilja')}
      </ul>`,
    },
    {
      slug: 'dimljenje-mesa-i-ribe',
      title: 'Dimljenje mesa i ribe: toplo i hladno',
      metaTitle: 'Dimljenje mesa i ribe: toplo i hladno dimljenje, vrsta drveta i trajanje | Sofra',
      desc: 'Razlika između toplog i hladnog dimljenja, koje drvo koristiti, temperature i vremena za ribu, piletinu, svinjetinu i suho meso, i kako dimiti u roštilju s poklopcem.',
      card: 'Toplo i hladno dimljenje, vrsta drveta, temperature i trajanje.',
      lede: 'Toplim dimom meso se istovremeno dimi i peče — za nekoliko sati je gotovo za jelo. Hladni dim samo daje okus i suši: to je za salamureno meso koje se poslije suši sedmicama.',
      body: `
      <div class="box">
        <h2>Ukratko</h2>
        <ol>
          <li>Toplo dimljenje: 80–110 °C, meso se peče; pastrmka 1–1,5 sati, piletina 2–3 sata.</li>
          <li>Hladno dimljenje: ispod 25 °C, nekoliko sati dnevno kroz 1–3 sedmice, samo za salamureno meso.</li>
          <li>Drvo: bukva, hrast, voćke (jabuka, šljiva, trešnja); nikad četinari ni obrađeno drvo.</li>
          <li>Dim neka bude tanak i plavičast, ne gust i bijel.</li>
          <li>Prije dimljenja meso posoli ili salamuri i osuši izvana.</li>
        </ol>
      </div>

      <h2>Toplo i hladno</h2>
      <table>
        <thead><tr><th></th><th>Toplo dimljenje</th><th>Hladno dimljenje</th></tr></thead>
        <tbody>
          <tr><td>Temperatura</td><td>80–110 °C</td><td>ispod 25 °C (najbolje 15–20 °C)</td></tr>
          <tr><td>Trajanje</td><td>1–6 sati</td><td>1–3 sedmice, s pauzama</td></tr>
          <tr><td>Meso je</td><td>pečeno, jede se odmah</td><td>sirovo, poslije se suši</td></tr>
          <tr><td>Za šta</td><td>pastrmka, skuša, piletina, rebarca, kobasice</td><td>suho meso, slanina, pršut</td></tr>
          <tr><td>Treba</td><td>roštilj s poklopcem ili pušnica</td><td>pušnica s vatrom odvojenom od mesa</td></tr>
        </tbody>
      </table>

      <h2>Koje drvo</h2>
      <table>
        <thead><tr><th>Drvo</th><th>Dim</th><th>Za šta</th></tr></thead>
        <tbody>
          <tr><td>Bukva</td><td>blag, ujednačen</td><td>suho meso, slanina, sve — klasika</td></tr>
          <tr><td>Hrast</td><td>jači, tamnija boja</td><td>junetina, svinjetina</td></tr>
          <tr><td>Jabuka, kruška, trešnja</td><td>blag, slatkast</td><td>piletina, riba, rebarca</td></tr>
          <tr><td>Šljiva</td><td>izražen, mirisan</td><td>svinjetina, kobasice</td></tr>
        </tbody>
      </table>
      <p>Drvo mora biti suho i bez kore koja se ljušti. Četinari, lakirano, farbano i impregnirano drvo daju gorak i štetan dim.</p>

      <h2>Toplo dimljenje u roštilju s poklopcem</h2>
      <ol>
        <li>Ribu ili meso drži 1–12 sati u kratkoj salamuri (50 g soli na 1 l vode — vidi vodič za salamurenje), isperi i ostavi sat vremena na zraku da se površina osuši.</li>
        <li>Upali pola količine ćumura i složi ga uz jedan rub roštilja.</li>
        <li>Na žar stavi šaku drvene piljevine ili sječke, ili komadić tvrdog drveta. Sječku možeš staviti i u posudicu od aluminijske folije s rupicama.</li>
        <li>Meso stavi na drugu stranu rešetke, poklopi, a otvor na poklopcu postavi iznad mesa da dim prođe preko njega.</li>
        <li>Drži 90–110 °C (termometar na poklopcu ili u visini mesa), dodaj sječku kad dim prestane.</li>
        <li>Gotovo je kad je u sredini 74 °C za piletinu, 60 °C za ribu, 70 °C za svinjetinu.</li>
      </ol>
      <table>
        <thead><tr><th>Šta</th><th>Salamura</th><th>Dimljenje na 90–110 °C</th></tr></thead>
        <tbody>
          <tr><td>Pastrmka, skuša (cijele)</td><td>1–2 sata</td><td>1–1,5 sati</td></tr>
          <tr><td>Pileći batci</td><td>4–6 sati</td><td>1,5–2 sata</td></tr>
          <tr><td>Cijelo pile</td><td>8–12 sati</td><td>2,5–3 sata</td></tr>
          <tr><td>Svinjska rebarca</td><td>6–12 sati ili suhi začin</td><td>3–4 sata</td></tr>
          <tr><td>Domaće kobasice</td><td>već slane</td><td>1–2 sata</td></tr>
        </tbody>
      </table>

      <h2>Hladno dimljenje</h2>
      <p>Hladno se dimi samo meso koje je salamureno solju za salamurenje (vidi vodič „Salamurenje i sušenje mesa“). Vatra je odvojena od komore s mesom, a dim do nje stiže kroz cijev ili kanal dug nekoliko metara i usput se ohladi. Pušnica se loži nekoliko sati dnevno, uglavnom zimi i noću kad je hladno, a između toga meso se suši. Za suho meso to traje 1–3 sedmice, dok ne dobije tamnu boju i miris dima.</p>

      <h2>Kad nešto pođe po zlu</h2>
      <dl class="faq">
        <dt>Meso je gorko i crno</dt>
        <dd>Dim je bio pregust, drvo vlažno ili je gorjelo s premalo zraka. Otvori dovod zraka, koristi suho drvo i dodaj ga malo po malo.</dd>
        <dt>Riba se raspala</dt>
        <dd>Nije bila dovoljno salamurena ni osušena prije dimljenja, ili je temperatura bila previsoka. Prvo salamura i sat sušenja, pa najviše 100 °C.</dd>
        <dt>Pri hladnom dimljenju meso se zapeklo izvana</dt>
        <dd>Dim je bio pretopao. Udalji vatru od mesa ili dimi samo kad je vani hladno.</dd>
      </dl>

      <div class="box tip">
        <h3>Sigurnost</h3>
        <p>Hladno dimljeno meso nije pečeno: mora biti salamureno solju za salamurenje i dimljeno na hladnom, inače se u njemu mogu razviti opasne bakterije. Ako nisi siguran, dimi toplo i jedi meso kao pečeno. Pušnicu drži dalje od kuće i ne dimi u zatvorenom.</p>
      </div>

      <h2>Čuvanje</h2>
      <p>Toplo dimljena riba i meso traju u frižideru 3–5 dana, umotani. Hladno dimljeno i osušeno meso čuva se kao suho meso — na hladnom i suhom, ili vakuumirano u frižideru.</p>

      <h2>U Sofri</h2>
      <ul class="related">
        ${rec('grah-suho-meso', 'Grah sa suhim mesom')}${rec('skusa-zar', 'Skuša na žaru')}${rec('pileci-batci-zar', 'Pileći batci na žaru')}
      </ul>`,
    },
    {
      slug: 'prilozi-i-umaci-za-rostilj',
      title: 'Prilozi i umaci za roštilj',
      metaTitle: 'Šta uz roštilj: lepinje, luk, kajmak, ajvar, urnebes i salate | Sofra',
      desc: 'Šta staviti na sto uz ćevape, ražnjiće, piletinu i ribu sa žara: lepinje, luk, kajmak, ajvar, urnebes, umak od jogurta, salate i povrće — i koliko po osobi.',
      card: 'Lepinje, luk, kajmak, ajvar, urnebes, salate — šta uz koje meso.',
      lede: 'Uz roštilj ne treba mnogo: topla lepinja, sitan luk i nešto kremasto — kajmak, ajvar ili urnebes. Jedna svježa salata skine težinu mesa.',
      body: `
      <div class="box">
        <h2>Ukratko</h2>
        <ol>
          <li>Lepinju ili somun kratko ugrij na rešetki i umoči u sok od mesa.</li>
          <li>Uz junetinu i svinjetinu: sitan luk, kajmak, ajvar, urnebes.</li>
          <li>Uz piletinu, ribu i povrće: umak od jogurta i bijelog luka, limun, blitva.</li>
          <li>Jedna svježa salata po sezoni: ljeti šopska ili paradajz, zimi kupus salata.</li>
          <li>Prilozi se spremaju prije nego što se upali žar — kad je meso pečeno, nema čekanja.</li>
        </ol>
      </div>

      <h2>Šta uz koje meso</h2>
      <table>
        <thead><tr><th>Meso</th><th>Uz to</th></tr></thead>
        <tbody>
          <tr><td>Ćevapi, pljeskavice</td><td>lepinja, sitan luk, kajmak, ajvar</td></tr>
          <tr><td>Ražnjići, vješalica</td><td>urnebes, luk, pečene paprike, pomfrit ili krompir</td></tr>
          <tr><td>Piletina</td><td>umak od jogurta, paradajz salata, povrće na žaru</td></tr>
          <tr><td>Janjetina</td><td>mladi luk, salata, umak od jogurta</td></tr>
          <tr><td>Riba, lignje</td><td>blitva s krompirom, limun, zelena salata</td></tr>
          <tr><td>Povrće na žaru</td><td>bijeli sir, kajmak, umak od jogurta, hljeb</td></tr>
        </tbody>
      </table>

      <h2>Koliko po osobi</h2>
      <table>
        <thead><tr><th>Šta</th><th>Po osobi</th><th>Za 4 osobe</th></tr></thead>
        <tbody>
          <tr><td>Lepinja ili somun</td><td>1 komad</td><td>4</td></tr>
          <tr><td>Crveni luk</td><td>½ glavice</td><td>2 glavice</td></tr>
          <tr><td>Kajmak</td><td>30–40 g</td><td>150 g</td></tr>
          <tr><td>Ajvar</td><td>40 g (2–3 kašike)</td><td>150–200 g</td></tr>
          <tr><td>Urnebes</td><td>50–60 g</td><td>250 g sira</td></tr>
          <tr><td>Svježa salata</td><td>150–200 g povrća</td><td>600–800 g</td></tr>
          <tr><td>Krompir (pomfrit, pečeni)</td><td>200 g</td><td>800 g</td></tr>
        </tbody>
      </table>

      <h2>Pripremi prije vatre</h2>
      <h3>Luk</h3>
      <p>Crveni luk isjeckaj sitno ili na tanke polumjesece, posoli i izgnječi rukama — postane blaži. Za salatu od luka dodaj kašiku sirćeta i ulja.</p>
      <h3>Urnebes</h3>
      <p>Bijeli sir izmrvi viljuškom s malo kajmaka, bijelim lukom, ljutom i slatkom paprikom i kašikom ulja. Ako je preljuto, umiješaj ajvar.</p>
      <h3>Umak od jogurta</h3>
      <p>Gusti jogurt, zgnječen bijeli luk, so, kašika maslinovog ulja i po želji izrendan, ocijeđen krastavac i mirođija.</p>
      <h3>Pečene paprike</h3>
      <p>Paprike peci na žaru dok koža ne pocrni sa svih strana, stavi ih u zatvorenu posudu 10 minuta pa oguli. Prelij uljem, sirćetom i bijelim lukom.</p>
      <h3>Lepinje</h3>
      <p>Na kraju pečenja lepinje prereži, stavi ih kratko na rešetku i premaži sokom s tacne na kojoj je meso odmaralo. Kupovne lepinje osvježi tako da ih poprskaš vodom prije grijanja.</p>
      <h3>Krompir u foliji</h3>
      <p>Manje krompire zamotaj u foliju i stavi direktno u žar 40–50 minuta, okrećući. Prereži, pa unutra kajmak i so.</p>

      <h2>Kad nešto pođe po zlu</h2>
      <dl class="faq">
        <dt>Luk je preljut</dt>
        <dd>Isjeckaj ga, posoli i izgnječi, ili ga na pet minuta potopi u hladnu vodu pa ocijedi.</dd>
        <dt>Urnebes je previše tečan</dt>
        <dd>Bilo je previše ulja ili kajmaka. Dodaj još izmrvljenog sira.</dd>
        <dt>Lepinje su tvrde</dt>
        <dd>Predugo su bile na vatri. Grij ih samo pola minute sa svake strane, ili ih zamotaj u foliju sa strane roštilja.</dd>
      </dl>

      <h2>Recepti u Sofri</h2>
      <ul class="related">
        ${rec('urnebes', 'Urnebes')}${rec('umak-jogurt-luk', 'Umak od jogurta i bijelog luka')}${rec('salata-luk', 'Salata od luka')}${rec('uz-kajmak-ajvar', 'Kajmak i ajvar')}
        ${rec('pecene-paprike-salata', 'Pečene paprike s bijelim lukom')}${rec('sopska', 'Šopska salata')}${rec('povrce-zar', 'Povrće na žaru')}${rec('punjeni-sampinjoni-zar', 'Punjeni šampinjoni na žaru')}
      </ul>`,
    },
  ],
};
