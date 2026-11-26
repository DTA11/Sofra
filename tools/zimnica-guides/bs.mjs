// Zimnica guides, bosanski (ijekavica). Built into vodici/<slug>/index.html by tools/grill-guides/build.mjs
// (that script builds every guide set and both index pages). Paired with en.mjs by position.
// Rules: no countries/regions, no brands, no sources; recipes linked as /#/recipe/<id>.
// Food safety: hot fill + boiling-water bath, vinegar/lemon for low-acid vegetables, never taste a doubtful jar.
const rec = (id, name) => `<li><a href="/#/recipe/${id}">${name}</a></li>`;
const ALL = `${rec('ajvar', 'Ajvar')}${rec('tursija-mijesana', 'Miješana turšija')}${rec('kisela-paprika', 'Kisela paprika')}${rec('pekmez-sljive', 'Pekmez od šljiva')}
        ${rec('dzem-kajsije', 'Džem od kajsija')}${rec('slatko-jagode', 'Slatko od jagoda')}${rec('domaci-paradajz-sos', 'Domaći paradajz sos')}${rec('kompot-sljive', 'Kompot od šljiva')}
        ${rec('kiseli-kupus-glavice', 'Kiseli kupus u glavicama')}${rec('kiseli-kupus-ribani', 'Ribani kiseli kupus u teglama')}`;

export const BS = {
  lang: 'bs', dir: 'vodici', eyebrow: 'Vodič · Zimnica', more: 'Još o zimnici', section: 'Zimnica', app: '/#/zimnica',
  sectionLede: 'Tegle i sterilizacija, omjeri sirćeta, soli i šećera, kiseli kupus, čuvanje i šta uraditi kad se tegla pokvari.',
  guides: [
    {
      slug: 'tegle-i-sterilizacija',
      title: 'Tegle za zimnicu: pranje, sterilizacija i kuhanje u vodi',
      metaTitle: 'Kako sterilizirati tegle za zimnicu i koliko ih kuhati u vodi | Sofra',
      desc: 'Kako pripremiti tegle i poklopce, sterilizirati ih u rerni ili vodi, puniti vruće i kuhati zatvorene tegle u loncu — vremena za ajvar, turšiju, pekmez, džem, kompot i paradajz sos.',
      card: 'Pregled, pranje i sterilizacija, punjenje, vremena kuhanja i provjera poklopca.',
      lede: 'Zimnica se kvari zbog mikroba koji ostanu u tegli ili uđu kroz loš poklopac. Čiste i vruće tegle, vruć sadržaj i kuhanje zatvorenih tegli u loncu s vodom rješavaju gotovo sve — a ne traju dugo.',
      body: `
      <div class="box">
        <h2>Ukratko</h2>
        <ol>
          <li>Tegle bez pukotina i okrhnutog ruba; poklopci novi, ili bez rđe, udubljenja i oštećene gume.</li>
          <li>Operi ih toplom vodom i deterdžentom, pa steriliziraj: 20 minuta u rerni na 120 °C ili 10 minuta u kipućoj vodi. Poklopce prokuhaj 5 minuta.</li>
          <li>Vruće puni u vruće tegle: do 1 cm ispod ruba (paradajz sos 1,5 cm, kompot 1,5 cm).</li>
          <li>Rub obriši i zatvori, pa zatvorene tegle kuhaj u loncu s vodom — vremena su u tabeli ispod.</li>
          <li>Sutradan provjeri: poklopac je uvučen i ne „klika“ kad ga pritisneš.</li>
        </ol>
      </div>

      <h2>Koliko kuhati zatvorene tegle</h2>
      <p>Vrijeme se računa od trenutka kad voda ponovo proključa. Voda mora biti 2–3 cm iznad poklopaca.</p>
      <table>
        <thead><tr><th>Zimnica</th><th>Tegla 0,25–0,5 l</th><th>Tegla 0,72–1 l</th></tr></thead>
        <tbody>
          <tr><td>Džem, pekmez, slatko</td><td>10 min</td><td>15 min</td></tr>
          <tr><td>Turšija, kisela paprika (sa sirćetom)</td><td>10 min</td><td>15 min</td></tr>
          <tr><td>Kompot</td><td>20 min</td><td>25 min</td></tr>
          <tr><td>Ajvar (sa sirćetom)</td><td>30 min</td><td>40 min</td></tr>
          <tr><td>Paradajz sos (s limunovim sokom u tegli)</td><td>40 min</td><td>45 min</td></tr>
          <tr><td>Ribani kiseli kupus</td><td colspan="2">ne kuha se — kiseli se sam, pa se drži na hladnom</td></tr>
        </tbody>
      </table>
      <p class="muted">Ako živiš iznad 300 m nadmorske visine, dodaj 5 minuta; iznad 900 m dodaj 10 minuta — voda tamo ključa na nižoj temperaturi.</p>

      <h2>Koliko tegli za zimu</h2>
      <p>Okvirno, za porodicu koja zimnicu jede nekoliko puta sedmično. Prvu godinu zapiši koliko je potrošeno — sljedeće jeseni znaš tačno.</p>
      <table>
        <thead><tr><th>Zimnica</th><th>Po osobi za zimu</th><th>Za 4 osobe</th></tr></thead>
        <tbody>
          <tr><td>Ajvar (0,5 l)</td><td>2–3 tegle</td><td>8–12 tegli</td></tr>
          <tr><td>Turšija i kisela paprika (0,72 l)</td><td>2–3 tegle</td><td>8–12 tegli</td></tr>
          <tr><td>Pekmez i džem (0,5 l)</td><td>2 tegle</td><td>8 tegli</td></tr>
          <tr><td>Paradajz sos (0,5 l)</td><td>4–6 tegli</td><td>16–24 tegle</td></tr>
          <tr><td>Kompot (0,72 l)</td><td>3 tegle</td><td>12 tegli</td></tr>
          <tr><td>Kiseli kupus u glavicama</td><td>3–4 glavice</td><td>12–15 glavica (bure od 30–40 l)</td></tr>
        </tbody>
      </table>

      <h2>Korak po korak</h2>
      <h3>1. Pregled tegli i poklopaca</h3>
      <p>Prstom pređi po rubu svake tegle — okrhnut rub ili pukotina znače da tegla neće dobro zatvoriti ili će puknuti u loncu. Poklopce s rđom, udubljenjem ili ispucalom gumom baci. Poklopac se može koristiti više puta samo ako je potpuno ravan i čist; najsigurniji je nov.</p>
      <h3>2. Pranje</h3>
      <p>Tegle i poklopce operi toplom vodom i deterdžentom, isperi vrućom vodom i ostavi naopako na čistoj krpi. Stare naljepnice skini — ispod njih se drži prljavština.</p>
      <h3>3. Sterilizacija</h3>
      <p><b>U rerni:</b> mokre tegle složi na rešetku u hladnu rernu, zagrij na 120 °C i drži 20 minuta. Ostavi ih unutra dok ne puniš. <b>U vodi:</b> tegle potopi u lonac s vodom, zakuhaj i kuhaj 10 minuta. Poklopce uvijek kuhaj u vodi (5 minuta) — u rerni se guma ošteti.</p>
      <h3>4. Punjenje</h3>
      <p>Vruću zimnicu sipaj u vruće tegle — hladna tegla od vrelog sadržaja može puknuti. Ostavi propisani prostor do ruba, kašikom ili štapićem istisni mjehuriće zraka, rub obriši čistom vlažnom krpom i odmah zatvori. Poklopac zavrni čvrsto rukom, ne „na silu“.</p>
      <h3>5. Kuhanje u vodi</h3>
      <p>Na dno velikog lonca stavi krpu ili rešetku (tegla ne smije stajati direktno na dnu). Složi tegle tako da se ne dodiruju, nalij vruću vodu 2–3 cm iznad poklopaca, poklopi lonac i zakuhaj. Kad voda proključa, počni mjeriti vrijeme. Kad je gotovo, ugasi vatru i ostavi tegle u vodi još 5 minuta.</p>
      <h3>6. Hlađenje i provjera</h3>
      <p>Tegle izvadi hvataljkom ili krpom, uspravno, i stavi na drvenu dasku ili krpu, dalje od propuha. Ne pritiskaj poklopce dok se ne ohlade — dok se hlade čućeš „klik“ kad se uvuku. Sutradan provjeri svaku teglu: poklopac je udubljen i ne pomjera se kad ga pritisneš. Na teglu napiši šta je i datum.</p>

      <div class="box tip">
        <h3>A okretanje tegli naopako i umotavanje u deke?</h3>
        <p>Mnogi tako rade, i za džem, pekmez i turšiju to obično prođe. Ali to nije isto što i kuhanje u vodi: sadržaj se ne zagrije jednako do sredine tegle. Za ajvar, paradajz sos i sve od povrća sa malo kiseline kuhanje zatvorenih tegli u vodi je obavezno.</p>
      </div>

      <h2>Kad nešto pođe po zlu</h2>
      <dl class="faq">
        <dt>Tegla je pukla u loncu</dt>
        <dd>Bila je hladna kad je ušla u vruću vodu, ili je stajala direktno na dnu lonca. Sljedeći put tegle i voda neka budu slične temperature, a na dnu krpa ili rešetka.</dd>
        <dt>Poklopac se nije uvukao</dt>
        <dd>Tegla nije dobro zatvorena. U roku od 24 sata možeš je ponovo kuhati s novim poklopcem, ili je stavi u frižider i potroši u 2 sedmice.</dd>
        <dt>Sadržaj je iscurio za vrijeme kuhanja</dt>
        <dd>Tegla je bila prepuna ili poklopac preslabo zavrnut. Ostavi propisani prostor do ruba. Ako se poklopac poslije ipak uvukao, obriši teglu i čuvaj je normalno.</dd>
        <dt>Gornji sloj je potamnio</dt>
        <dd>U tegli je ostalo previše zraka. Ako je poklopac uvučen i miris normalan, nije opasno — sljedeći put istisni mjehuriće i puni do propisane visine.</dd>
      </dl>

      <h2>Čuvanje</h2>
      <p>Zatvorene tegle drži na tamnom, hladnom i suhom mjestu (5–15 °C). Otvorena tegla ide u frižider. Više: <a href="/vodici/cuvanje-zimnice/">Kako čuvati zimnicu i koliko traje</a>.</p>

      <h2>Recepti za zimnicu u Sofri</h2>
      <ul class="related">
        ${ALL}
      </ul>`,
    },
    {
      slug: 'sirce-so-i-secer-za-zimnicu',
      title: 'Sirće, so i šećer: omjeri za zimnicu',
      metaTitle: 'Omjeri sirćeta, soli i šećera za turšiju, kupus, džem i ajvar | Sofra',
      desc: 'Koliko sirćeta, soli i šećera ide u salamuru za turšiju i papriku, u kiseli kupus, džem, pekmez, ajvar i paradajz sos — i zašto se omjeri ne smiju smanjivati od oka.',
      card: 'Salamura za turšiju, so za kupus, šećer za džem, kiselina za ajvar i sos.',
      lede: 'Zimnicu čuva kiselina (sirće ili limun), so ili šećer. Ukus se može mijenjati, ali te tri stvari ne smiješ smanjivati od oka — one su razlog zašto tegla izdrži do proljeća.',
      body: `
      <div class="box">
        <h2>Ukratko</h2>
        <ol>
          <li>Salamura za turšiju i kiselu papriku: 1 dio sirćeta od 9 % na najviše 2 dijela vode (sirće od 5 %: pola-pola).</li>
          <li>U litar salamure: 20 g soli i 50–70 g šećera, po ukusu.</li>
          <li>Kiseli kupus u glavicama: 50 g krupne soli na litar vode. Ribani kupus: 20 g soli na kilogram kupusa.</li>
          <li>Džem: najmanje 500 g šećera na 1 kg očišćenog voća. S manje šećera — kuhanje u vodi i frižider nakon otvaranja.</li>
          <li>Ajvar: oko 100 ml sirćeta od 9 % na 5 kg paprika. Paradajz sos: 1 kašika limunovog soka u svaku teglu od 0,5 l.</li>
        </ol>
      </div>

      <h2>Zašto kiselina</h2>
      <p>Paprika, patlidžan, mrkva, karfiol, krastavac pa i paradajz nisu dovoljno kiseli da bi bili sigurni sami u zatvorenoj tegli. U takvoj tegli, bez zraka, može se razviti bakterija koja stvara opasan otrov (botulizam), a ne mijenja ni miris ni ukus. Kiselina to sprečava — zato se sirće u turšiji ne razrjeđuje više nego što piše, a u ajvar i paradajz sos se uvijek dodaje kiselina.</p>

      <h2>Sirće</h2>
      <table>
        <thead><tr><th>Sirće</th><th>Kiselost</th><th>Salamura (sirće : voda)</th></tr></thead>
        <tbody>
          <tr><td>Alkoholno (bijelo) sirće</td><td>9 %</td><td>1 : 2 (najviše)</td></tr>
          <tr><td>Alkoholno sirće</td><td>6 %</td><td>1 : 1,3</td></tr>
          <tr><td>Jabukovo ili vinsko sirće</td><td>5 %</td><td>1 : 1</td></tr>
          <tr><td>Domaće sirće nepoznate jačine</td><td>?</td><td>ne koristi za zimnicu u teglama</td></tr>
        </tbody>
      </table>
      <p>Kiselost piše na boci. Ako je turšija previše kisela za tvoj ukus, dodaj više šećera ili je prije jela isperi — ne smanjuj sirće.</p>

      <h2>So</h2>
      <table>
        <thead><tr><th>Šta</th><th>Koliko soli</th><th>Napomena</th></tr></thead>
        <tbody>
          <tr><td>Salamura za turšiju i papriku</td><td>20 g na litar</td><td>za ukus; čuva sirće</td></tr>
          <tr><td>Kiseli kupus u glavicama</td><td>50 g na litar vode (5 %)</td><td>+ puna kašika u izdubljeni kocen</td></tr>
          <tr><td>Ribani kiseli kupus</td><td>20 g na 1 kg kupusa (2 %)</td><td>kupus se vaga nakon čišćenja</td></tr>
          <tr><td>Dolijevanje salamure za ribani kupus</td><td>20 g na litar vode</td><td>kad sok padne ispod kupusa</td></tr>
          <tr><td>Ajvar</td><td>oko 30 g na 5 kg paprika</td><td>za ukus</td></tr>
        </tbody>
      </table>
      <p>Za kiseljenje je najbolja krupna so bez joda i bez dodataka protiv grudvanja. Jodirana so nije opasna, ali može zamutiti salamuru i potamniti povrće. Kod kupusa so važe — premalo soli i kupus omekša i pokvari se, previše i ne kiseli se.</p>

      <h2>Šećer</h2>
      <table>
        <thead><tr><th>Šta</th><th>Šećer</th><th>Napomena</th></tr></thead>
        <tbody>
          <tr><td>Džem</td><td>500–700 g na 1 kg voća</td><td>manje šećera = kraće trajanje nakon otvaranja</td></tr>
          <tr><td>Slatko</td><td>1 kg na 1 kg voća</td><td>gust sirup čuva cijele plodove</td></tr>
          <tr><td>Pekmez od šljiva</td><td>0–100 g na 1 kg šljiva</td><td>čuva ga dugo kuhanje; bez šećera — obavezno kuhanje u vodi</td></tr>
          <tr><td>Kompot</td><td>200–300 g na litar vode</td><td>samo za ukus — čuva ga kuhanje u vodi</td></tr>
          <tr><td>Salamura za turšiju</td><td>50–70 g na litar</td><td>za ukus</td></tr>
        </tbody>
      </table>

      <h2>Limunov sok</h2>
      <p>U paradajz sos ide 1 kašika limunovog soka u teglu od 0,5 l (2 kašike u teglu od 1 l), ili ¼ kašičice limunske kiseline. Najujednačeniju kiselost ima sok iz boce; svježi limuni su različiti, pa ako koristiš njih, ne štedi. Kiselina se gotovo ne osjeti, a kad otvoriš teglu, može se ublažiti prstohvatom šećera.</p>

      <h2>Kad nešto pođe po zlu</h2>
      <dl class="faq">
        <dt>Turšija je previše kisela</dt>
        <dd>Ne smanjuj sirće sljedeći put — dodaj šećera u salamuru, a turšiju prije jela kratko isperi hladnom vodom.</dd>
        <dt>Salamura u turšiji je mutna</dt>
        <dd>Ako je poklopac uvučen i miris normalan, uzrok je obično jodirana so ili tvrda voda. Ako je poklopac ispupčen, salamura pjeni ili čudno miriše — baci teglu bez kušanja.</dd>
        <dt>Džem se ne zgušnjava</dt>
        <dd>Kuhaj ga još, u kraćim razmacima radi probu na hladnom tanjiru. Rijedak džem nije pokvaren, samo se razlije — koristi ga za kolače.</dd>
        <dt>Kupus je mekan i sluzav</dt>
        <dd>Bilo je premalo soli ili pretoplo (iznad 22 °C). Sluzav kupus koji ružno miriše se baca; sljedeći put važi so i drži bure na 15–20 °C.</dd>
      </dl>

      <h2>Recepti u Sofri</h2>
      <ul class="related">
        ${ALL}
      </ul>`,
    },
    {
      slug: 'kiseli-kupus-kod-kuce',
      title: 'Kiseli kupus kod kuće: glavice u buretu i ribani u teglama',
      metaTitle: 'Kako ukiseliti kupus: glavice u buretu, salamura, pretakanje i ribani kupus | Sofra',
      desc: 'Kiseljenje kupusa korak po korak: koje glavice, koliko soli i salamure, temperatura, pretakanje, kada je gotov, ribani kupus u teglama i šta je normalno, a šta znak kvara.',
      card: 'Glavice, salamura od 5 %, pretakanje, temperatura i ribani kupus u teglama.',
      lede: 'Kupus se kiseli sam: so izvuče sok, a dobre bakterije pretvore šećer iz kupusa u kiselinu. Tvoj posao je da kupus uvijek bude pod salamurom, da je so tačna i da bure stoji na pravoj temperaturi.',
      body: `
      <div class="box">
        <h2>Ukratko</h2>
        <ol>
          <li>Uzmi kasne, tvrde i teške glavice — rane ljetne su mekane i omekšaju u salamuri.</li>
          <li>Salamura: 50 g krupne soli na litar hladne prokuhane vode; u svaki izdubljeni kocen još kašika soli.</li>
          <li>Glavice moraju biti pod salamurom bar 5 cm, pritisnute podlogom i kamenom.</li>
          <li>Bure drži na 15–20 °C i pretači salamuru svaka 2–3 dana prve tri sedmice.</li>
          <li>Kupus je gotov za 4–6 sedmica; poslije ga drži na hladnom (ispod 10 °C).</li>
        </ol>
      </div>

      <h2>Koliko kupusa, salamure i soli</h2>
      <table>
        <thead><tr><th>Bure ili kanta</th><th>Kupus</th><th>Salamura</th><th>Krupna so</th></tr></thead>
        <tbody>
          <tr><td>20 l</td><td>6–7 glavica (6–7 kg)</td><td>oko 8 l vode</td><td>400 g + 7 kašika u kocene</td></tr>
          <tr><td>30 l</td><td>10 glavica (oko 10 kg)</td><td>oko 12 l vode</td><td>600 g + 10 kašika u kocene</td></tr>
          <tr><td>50 l</td><td>16–18 glavica</td><td>oko 20 l vode</td><td>1 kg + 17 kašika u kocene</td></tr>
        </tbody>
      </table>
      <p>Za porodicu od četvoro koja zimi pravi sarmu, podvarak i kupus salatu, bure od 30 l obično je dovoljno: računaj 3–4 glavice po osobi za cijelu zimu.</p>

      <h2>Glavice u buretu, korak po korak</h2>
      <h3>1. Posuda</h3>
      <p>Bure ili kanta moraju biti za hranu (plastika s oznakom za hranu, drvo ili glazirana keramika), čisti i oprani vrućom vodom. Najpraktičnija je kanta sa slavinom na dnu — kroz nju se salamura pretače. Trebaju ti i podloga koja ulazi u bure i težak, čist kamen ili posuda s vodom.</p>
      <h3>2. Glavice</h3>
      <p>Skini vanjske zelene listove (nekoliko lijepih sačuvaj za pokrivanje). Nožem izdubi kocen u obliku kupe, 4–5 cm duboko, i u rupu stavi kašiku krupne soli.</p>
      <h3>3. Slaganje</h3>
      <p>Glavice slaži gusto, rupom prema gore, a praznine popuni manjim glavicama ili polovinama. Između stavi lovor, biber u zrnu i, po želji, komad rena ili dunje. Odozgo pokrij sačuvanim listovima.</p>
      <h3>4. Salamura i pritisak</h3>
      <p>Salamuru napravi od hladne prokuhane vode i soli, pa je prelij preko glavica. Stavi podlogu i kamen — glavice moraju biti pod salamurom bar 5 cm, i tako ostati do kraja. Bure pokrij poklopcem ili čistom krpom.</p>
      <h3>5. Temperatura</h3>
      <p>Najbolje je 15–20 °C. Na hladnijem kupus se kiseli sporo i ostaje bljutav; iznad 22 °C omekša i lako se pokvari.</p>
      <h3>6. Pretakanje</h3>
      <p>Nakon 3–4 dana počni pretakati: kroz slavinu (ili crijevom koje spustiš do dna) ispusti 4–5 litara salamure i prelij je odozgo. Tako se so izjednači, a gasovi izađu. Prve 3 sedmice pretači svaka 2–3 dana, a poslije jednom sedmično. Ako salamura padne, dolij novu (50 g soli na litar).</p>
      <h3>7. Kada je gotov</h3>
      <p>Za 4–6 sedmica list je kiseo, proziran i lijepo žut. Tada bure premjesti na hladno — podrum, balkon ili garaža ispod 10 °C, ali tako da se ne smrzne. Glavice vadi čistim rukama ili hvataljkom i odmah vrati podlogu i kamen.</p>

      <h2>Ribani kupus u teglama</h2>
      <p>Očišćen kupus izribaj, izvagaj i na svaki kilogram umiješaj 20 g soli (i po želji kim). Gnječi rukama dok ne pusti puno soka, pa ga čvrsto nabij u tegle dok ga sok ne pokrije, a do ruba ostavi 3–4 cm. Odozgo list kupusa i nešto teško (manja tegla s vodom). Poklopac samo prisloni — gasovi moraju izlaziti — i tegle stavi na tanjir. Drži ih na 18–20 °C i svaki dan kupus pritisni čistom kašikom. Za 2–4 sedmice prestane vrjeti i kiseo je: tada tegle zatvori i stavi u frižider ili hladan podrum.</p>

      <h2>Šta je normalno, a šta nije</h2>
      <dl class="faq">
        <dt>Bijela skrama na površini salamure</dt>
        <dd>Normalno je — to su kvasci na zraku. Skini je kašikom pri pretakanju. Kupus ispod salamure je dobar.</dd>
        <dt>Mjehurići, pjena i miris na kiselo prvih sedmica</dt>
        <dd>Znak da kiseljenje radi. Zato se pretače i zato se ribani kupus pritiska svaki dan.</dd>
        <dt>Salamura je mutna</dt>
        <dd>Kod kiselog kupusa to je normalno. Opasno je samo uz ostale znakove ispod.</dd>
        <dt>Kupus je mekan, sluzav, ružičast ili miriše na trulo</dt>
        <dd>Bilo je premalo soli, pretoplo ili kupus nije bio pod salamurom. Takve glavice baci; ako je cijelo bure takvo — sve baci, posudu dobro operi.</dd>
        <dt>Na površini je dlakava, zelena ili crna pljesan</dt>
        <dd>Skini pljesan i gornje glavice koje je dodiruju; ako je pljesan prodrla u kupus ili se širi, baci sve. Spriječi je tako što kupus uvijek drži pod salamurom.</dd>
        <dt>Kupus se ne kiseli</dt>
        <dd>Prehladno je. Prenesi bure na toplije mjesto (15–20 °C) i nastavi pretakati.</dd>
      </dl>

      <h2>Čuvanje</h2>
      <p>Glavice u buretu traju do proljeća ako su na hladnom i pod salamurom; kad zatopli, omekšaju. Ribani kupus u zatvorenim teglama u frižideru traje 4–6 mjeseci. Kiseli kupus se može i zamrznuti u porcijama.</p>

      <h2>Recepti u Sofri</h2>
      <ul class="related">
        ${rec('kiseli-kupus-glavice', 'Kiseli kupus u glavicama')}${rec('kiseli-kupus-ribani', 'Ribani kiseli kupus u teglama')}${rec('sarma-junetina', 'Sarma')}${rec('posna-sarma', 'Posna sarma')}
        ${rec('podvarak-piletina', 'Podvarak s piletinom')}${rec('jota', 'Jota')}${rec('kranjska-zelje', 'Kobasica s kiselim kupusom')}${rec('kupus-salata', 'Kupus salata')}${rec('uz-kiseli-kupus', 'Kiseli kupus uz jelo')}
      </ul>`,
    },
    {
      slug: 'cuvanje-zimnice',
      title: 'Kako čuvati zimnicu i koliko traje',
      metaTitle: 'Kako čuvati zimnicu: gdje, na kojoj temperaturi i koliko traje otvorena tegla | Sofra',
      desc: 'Gdje i kako čuvati tegle zimnice, koliko traju zatvorene i otvorene — ajvar, turšija, pekmez, džem, paradajz sos, kompot i kiseli kupus — i kako tegle složiti da se ništa ne baci.',
      card: 'Tamno i hladno, koliko traje zatvorena i otvorena tegla, red u ostavi.',
      lede: 'Dobro zatvorena tegla ne kvari se preko noći, ali svjetlost, toplina i vlaga polako joj uzimaju boju, ukus i poklopac. Ostava za zimnicu treba biti tamna, hladna i suha.',
      body: `
      <div class="box">
        <h2>Ukratko</h2>
        <ol>
          <li>Tegle drži na tamnom, hladnom i suhom mjestu, na 5–15 °C — nikad iznad šporeta, uz radijator ili na suncu.</li>
          <li>Zatvorena zimnica je najbolja do godinu dana; potroši je do sljedeće sezone.</li>
          <li>Otvorena tegla ide u frižider — rokovi su u tabeli.</li>
          <li>Uvijek vadi čistom i suhom kašikom, i ne vraćaj ostatke s tanjira u teglu.</li>
          <li>Na svaku teglu napiši šta je i kad je napravljena, a starije stavi naprijed.</li>
        </ol>
      </div>

      <h2>Koliko traje</h2>
      <table>
        <thead><tr><th>Zimnica</th><th>Zatvorena, u ostavi</th><th>Otvorena, u frižideru</th></tr></thead>
        <tbody>
          <tr><td>Ajvar</td><td>do 12 mjeseci</td><td>2–3 sedmice (površinu prelij tankim slojem ulja)</td></tr>
          <tr><td>Turšija, kisela paprika</td><td>do 12 mjeseci</td><td>4–6 sedmica, povrće uvijek u salamuri</td></tr>
          <tr><td>Pekmez od šljiva</td><td>do 12 mjeseci</td><td>1–2 mjeseca</td></tr>
          <tr><td>Džem, slatko</td><td>do 12 mjeseci</td><td>3–4 sedmice</td></tr>
          <tr><td>Paradajz sos</td><td>do 12 mjeseci</td><td>4–5 dana (ili zamrzni ostatak)</td></tr>
          <tr><td>Kompot</td><td>do 12 mjeseci</td><td>5–7 dana</td></tr>
          <tr><td>Kiseli kupus u buretu</td><td>do proljeća, ispod 10 °C</td><td>izvađena glavica 1 sedmicu</td></tr>
          <tr><td>Ribani kupus u teglama</td><td>4–6 mjeseci u frižideru</td><td>2–3 sedmice</td></tr>
        </tbody>
      </table>
      <p class="muted">Rokovi vrijede za teglu koja je napravljena kako treba (kuhana u vodi, poklopac uvučen). Ako je poklopac popustio, tegla više nije zatvorena — vidi <a href="/vodici/pokvarena-tegla/">Kad se tegla pokvari</a>.</p>

      <h2>Gdje čuvati</h2>
      <h3>Podrum ili ostava</h3>
      <p>Najbolje mjesto: tamno, 5–15 °C, bez vlage. Tegle slaži na police, ne jednu na drugu — težina može izbiti poklopac donje tegle.</p>
      <h3>Stan bez podruma</h3>
      <p>Ormar u najhladnijoj prostoriji, dalje od kuhinje i radijatora, ili zatvorena kutija u spavaćoj sobi. Svjetlost izbijeli ajvar i paradajz sos, pa tegle drži u kutijama ili iza vrata.</p>
      <h3>Balkon i garaža</h3>
      <p>Dobri za bure s kupusom dok ne padne mraz. Tegle se na mrazu smrznu i pucaju, a smrznut pa odmrznut sadržaj promijeni teksturu.</p>

      <h2>Red u ostavi</h2>
      <p>Napravljenu zimnicu u Sofri unesi u Ostavu (dugme „Napravljeno — u ostavu“) — jelovnik je onda bira za priloge i zna koliko tegli imaš. Novo stavi pozadi, staro naprijed. U proljeće zapiši šta je ostalo: tako znaš šta praviti manje, a šta više.</p>

      <h2>Kad nešto pođe po zlu</h2>
      <dl class="faq">
        <dt>Tegla se smrzla</dt>
        <dd>Ako je pukla ili je poklopac izbačen — baci je. Ako je cijela i poklopac uvučen, može se jesti, ali povrće je mekše.</dd>
        <dt>Zimnica od prošle godine</dt>
        <dd>Ako je poklopac uvučen, a boja, miris i izgled normalni, može se jesti — samo je slabija. Potroši je prvu.</dd>
        <dt>Na poklopcu je rđa</dt>
        <dd>Ako je rđa samo izvana a poklopac uvučen, teglu potroši uskoro. Ako je rđa ispod, na rubu ili je sadržaj dodiruje — baci teglu.</dd>
      </dl>

      <h2>Recepti u Sofri</h2>
      <ul class="related">
        ${ALL}
      </ul>`,
    },
    {
      slug: 'pokvarena-tegla',
      title: 'Kad se tegla pokvari: znakovi i šta uraditi',
      metaTitle: 'Pokvarena zimnica: kako prepoznati pokvarenu teglu i šta uraditi | Sofra',
      desc: 'Znakovi pokvarene zimnice (ispupčen poklopac, pjena, pljesan, miris), zašto se sumnjiva tegla nikad ne kuša, kako je sigurno baciti i očistiti, i šta nije znak kvara.',
      card: 'Znakovi kvara, zašto ne kušati, kako baciti i očistiti, šta je normalno.',
      lede: 'Pokvarena zimnica se prepoznaje okom, uhom i nosom — nikad jezikom. Ako sumnjaš, baci cijelu teglu: jedna tegla ajvara nije vrijedna rizika.',
      body: `
      <div class="box">
        <h2>Ukratko</h2>
        <ol>
          <li>Baci teglu ako je poklopac ispupčen, labav ili „klika“, ako šikne kad je otvaraš, ako se u njoj dižu mjehurići (a nije kiseli kupus), ako ima pljesni ili čudno miriše.</li>
          <li>Sumnjivu teglu ne kušaj, ni vrh kašike, i ne daj je životinjama.</li>
          <li>Ispupčen poklopac ne otvaraj blizu lica. Zatvorenu teglu stavi u kesu, zaveži i baci u smeće.</li>
          <li>Ako je sadržaj iscurio, očisti sve izbjeljivačem razrijeđenim s vodom (1 : 5) i operi ruke.</li>
          <li>Ako neko nakon jela iz tegle dobije dvoslike, spuštene kapke ili teško guta i govori — odmah hitna pomoć.</li>
        </ol>
      </div>

      <h2>Znakovi kvara</h2>
      <table>
        <thead><tr><th>Šta vidiš</th><th>Šta znači</th><th>Šta uraditi</th></tr></thead>
        <tbody>
          <tr><td>Poklopac ispupčen ili se pomjera kad ga pritisneš</td><td>u tegli se stvara plin — rade mikrobi</td><td>baci, ne otvaraj</td></tr>
          <tr><td>Tegla šikne ili sadržaj izleti pri otvaranju</td><td>pritisak od plina</td><td>baci, ne kušaj</td></tr>
          <tr><td>Mjehurići koji se dižu, pjena (u turšiji, ajvaru, sosu, kompotu)</td><td>vrenje koje ne treba biti</td><td>baci</td></tr>
          <tr><td>Pljesan na površini ili ispod poklopca</td><td>tegla nije dobro zatvorena</td><td>baci cijelu teglu</td></tr>
          <tr><td>Kiseo, alkoholni ili truo miris tamo gdje ga ne treba biti</td><td>kvarenje</td><td>baci</td></tr>
          <tr><td>Sluzav, mekan ili promijenjene boje sadržaj</td><td>kvarenje</td><td>baci</td></tr>
          <tr><td>Iscurio sok, ljepljiva tegla izvana</td><td>poklopac je popustio</td><td>baci</td></tr>
        </tbody>
      </table>

      <h2>Zašto se ne kuša</h2>
      <p>Najopasniji kvar zimnice — botulizam — ne mora se ni vidjeti ni osjetiti. Bakterija raste u zatvorenoj tegli bez zraka, u povrću koje nije dovoljno kiselo: ajvar, paradajz sos bez limunovog soka, povrće u ulju, grah ili meso u tegli. Otrov koji stvara je opasan već u maloj količini. Zato se sumnjiva tegla baca bez kušanja, i zato se u ajvar i paradajz sos uvijek dodaje kiselina, a tegle kuhaju u vodi. U džemu s dovoljno šećera, ispravnoj turšiji i kiselom kupusu ova bakterija ne raste.</p>

      <h2>Kako sigurno baciti teglu</h2>
      <ol>
        <li>Zatvorenu teglu, s poklopcem, stavi u plastičnu kesu, zaveži je i stavi u drugu kesu. Baci u kantu za smeće — ne u kompost, ne u WC, ne životinjama.</li>
        <li>Ako je tegla otvorena ili je iscurila: obuci rukavice, upij sadržaj papirnim ubrusima i baci ih s teglom u kesu.</li>
        <li>Površine (polica, sto, sudopera) premaži izbjeljivačem razrijeđenim s vodom (1 dio izbjeljivača na 5 dijelova vode), ostavi 30 minuta, pa operi vodom.</li>
        <li>Spužve i krpe koje su to dodirnule baci. Rukavice skini i dobro operi ruke sapunom.</li>
      </ol>

      <h2>Pljesan na džemu i pekmezu</h2>
      <p>Nekad se pljesan sa vrha skidala, a džem jeo. Danas se savjetuje baciti cijelu teglu: pljesan pušta niti dublje nego što se vidi, a neke stvaraju otrove. Kod otvorene tegle u frižideru to znači da je stajala predugo ili da je vađena prljavom kašikom.</p>

      <h2>Šta nije znak kvara</h2>
      <dl class="faq">
        <dt>Bijela skrama na kiselom kupusu</dt>
        <dd>Kvasci na zraku — skini ih. Kupus ispod salamure je dobar.</dd>
        <dt>Mutna salamura kod kiselog kupusa</dt>
        <dd>Normalno kod svakog kiseljenja.</dd>
        <dt>Malo bijelog taloga na dnu turšije</dt>
        <dd>Obično so, začini i tvrda voda. Ako je poklopac uvučen, a miris i boja normalni — nije opasno.</dd>
        <dt>Kristali šećera u džemu ili pekmezu</dt>
        <dd>Džem je kuhan predugo ili je star. Nije opasno — zagrij ga s kašikom vode.</dd>
        <dt>Potamnio gornji sloj</dt>
        <dd>Zrak u tegli. Ako je poklopac uvučen i sve ostalo normalno, nije opasno.</dd>
      </dl>

      <h2>Ako se neko razboli</h2>
      <p>Znakovi botulizma počinju obično 12–36 sati nakon jela (nekad i kasnije): dvoslike ili mutan vid, spušteni kapci, otežan govor i gutanje, suha usta, slabost mišića koja se širi. Odmah pozovi hitnu pomoć i reci šta je jedeno. Teglu i ostatak sačuvaj zatvorene, u kesi, za ljekare.</p>

      <h2>Kako da se ne ponovi</h2>
      <p>Najčešći uzroci: tegla nije kuhana u vodi ili premalo, premalo sirćeta ili limunovog soka, okrhnut rub, star poklopac, pretoplo mjesto čuvanja. Sve je u vodiču <a href="/vodici/tegle-i-sterilizacija/">Tegle za zimnicu: pranje, sterilizacija i kuhanje u vodi</a>.</p>

      <h2>Recepti u Sofri</h2>
      <ul class="related">
        ${ALL}
      </ul>`,
    },
  ],
};
