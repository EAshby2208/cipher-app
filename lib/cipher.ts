// lib/cipher.ts

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function buildKeyword(keyphrase: string): string[] {
  const cleaned = keyphrase.replace(/\s+/g, "").toUpperCase();
  const keyword: string[] = [];

  for (const ch of cleaned) {
    if (!keyword.includes(ch)) {
      keyword.push(ch);
    }
  }

  for (const ch of alphabet) {
    if (!keyword.includes(ch)) {
      keyword.push(ch);
    }
  }

  return keyword;
}

export function processCipher(
  phrase: string,
  keyphrase: string,
  keycode: string,
  mode: "encode" | "decode"
) {
  const finalPhrase = phrase.toUpperCase(); // Convert to uppercase
  const keyword = buildKeyword(keyphrase);

  const keyArray = keycode
    .replace(/\s+/g, "")
    .split("")
    .map((n) => parseInt(n))
    .filter((n) => !isNaN(n)); // Remove spaces and convert to integers, filter out non-numeric
    
  const chars = finalPhrase.split("");

  let keyIndex = 0;

  for (let i = 0; i < chars.length; i++) {
    const index = keyword.indexOf(chars[i]);

    if (index !== -1) {
      const shift = keyArray[keyIndex % keyArray.length];

      const newIndex =
        mode === "encode"
          ? (index + shift) % keyword.length
          : (index - shift + keyword.length) % keyword.length;

      chars[i] = keyword[newIndex];
      keyIndex++;
    }
  }

  return {
    result: chars.join(""),
    keyword,
  };
}
