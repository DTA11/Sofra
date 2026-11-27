// Forgiving search: ignores diacritics (cufte → ćufte, dj → đ), word endings (salate → salata,
// ćevape → ćevapi, salads → salad) and, when nothing matches exactly, one typo per word.

// lower case, strip diacritics, đ/dj → d, punctuation → space
export function fold(s) {
  return String(s || '').toLowerCase()
    .replace(/đ/g, 'd').replace(/dž/g, 'dz').replace(/dj/g, 'd')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ').trim();
}

// stem a query word: drop a plural -s / -es and one final vowel, keep at least 3 letters
function stem(w) {
  if (w.length >= 5 && w.endsWith('es')) w = w.slice(0, -2);
  else if (w.length >= 4 && w.endsWith('s') && !w.endsWith('ss')) w = w.slice(0, -1);
  if (w.length >= 4 && /[aeiou]$/.test(w)) w = w.slice(0, -1);
  return w;
}

export function queryWords(q) {
  return fold(q).split(' ').filter(Boolean).map(stem);
}

// at most one edit (insert, delete, substitute, swap of neighbours) between a and b
function near(a, b) {
  if (a === b) return true;
  const la = a.length, lb = b.length;
  if (Math.abs(la - lb) > 1) return false;
  let i = 0;
  while (i < la && i < lb && a[i] === b[i]) i++;
  if (la === lb) {
    if (a.slice(i + 1) === b.slice(i + 1)) return true;
    return a[i] === b[i + 1] && a[i + 1] === b[i] && a.slice(i + 2) === b.slice(i + 2);
  }
  return la > lb ? a.slice(i + 1) === b.slice(i) : a.slice(i) === b.slice(i + 1);
}

// does one query stem fit a word of the text? fuzzy: typo allowed for stems of 4+ letters
function wordHit(word, s, fuzzy) {
  if (word.includes(s)) return true;
  if (!fuzzy || s.length < 4) return false;
  // compare with the start of the word (the query is usually a prefix), allowing ±1 letter
  // (a prefix shorter than the query only for 5+ letters, else „sram“ would hit every word starting with „sam“)
  for (let n = s.length - (s.length >= 5 ? 1 : 0); n <= s.length + 1; n++) if (n <= word.length && near(word.slice(0, n), s)) return true;
  return false;
}

// hay = folded text; words = queryWords(); every query word must be found
export function textMatch(hay, words, fuzzy = false) {
  if (!words.length) return true;
  if (!fuzzy) return words.every((s) => hay.includes(s));
  const hw = hay.split(' ');
  return words.every((s) => hw.some((w) => wordHit(w, s, true)));
}

// search the list strictly; if nothing is found, search again allowing one typo per word
export function search(list, q, hayOf) {
  const words = queryWords(q);
  if (!words.length) return { list, fuzzy: false };
  const exact = list.filter((x) => textMatch(hayOf(x), words));
  if (exact.length) return { list: exact, fuzzy: false };
  return { list: list.filter((x) => textMatch(hayOf(x), words, true)), fuzzy: true };
}
