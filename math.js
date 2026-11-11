const buMath = (() => {
  'use strict';
  const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
  const superscript = '⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁿᵐ';
  const subscript = '₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎ₙₘ';
  const plainScript = '0123456789+−=()nm';
  const fractionAtom = String.raw`[−-]?(?:√)?(?:\d+(?:[,.]\d+)?|[A-Z]{2,4}|[a-zA-Zα-ωΑ-Ω]|\([a-zA-Zα-ωΑ-Ω0-9., +−*×^²³-]+\))(?:(?:\^|_)[0-9]+|[⁰¹²³⁴⁵⁶⁷⁸⁹₀₁₂₃₄₅₆₇₈₉]+)?`;
  const fractionPattern = new RegExp(String.raw`(?<![\p{L}\p{N}/.,′_^])(${fractionAtom})[ \t]*/[ \t]*(${fractionAtom})(?![\p{L}\p{N}/′_^])`, 'gu');
  const units = /^(?:mm|cm|m|km|g|kg|l|ml)\/(?:s[²³]?|h|min|m²|m³|cm²|cm³)$/i;
  const plainToken = /(?<!\p{L})(?:arcsin|arccos|arctan|sin|cos|tan|cot|log|ln|lim|max|min)(?!\p{L})|(?<!\p{L})[A-Z]{2,4}(?!\p{L})|(?<![\p{L}/])[A-Za-zα-ωΑ-Ω](?:[′']+)?(?![\p{L}/])|\d+(?:[.,]\d+)*|[+−×÷·=≠≤≥≡<>∥⊥∈∉⊂⊄∩∪⇒⇔↔→∑∫∞∠△%°±]/gu;

  function group(text, start, left = '{', right = '}') {
    if (text[start] !== left) return null;
    let depth = 0;
    for (let index = start; index < text.length; index++) {
      if (text[index] === left) depth++;
      if (text[index] === right && --depth === 0) {
        return { text: text.slice(start + 1, index), end: index + 1 };
      }
    }
    return null;
  }
  function normalize(value) {
    return String(value ?? '').normalize('NFC')
      .replace(/<=>/g, '⇔').replace(/=>/g, '⇒')
      .replace(/<=/g, '≤').replace(/>=/g, '≥').replace(/!=/g, '≠')
      .replace(/⟂/g, '⊥')
      .replace(/(?<=[a-zA-Z0-9])[ \t]*\*[ \t]*(?=[a-zA-Z0-9])/g, ' × ')
      .replace(/(?<=[0-9)²³⁴])-(?=[0-9a-zA-Z(])/g, ' − ')
      .replace(/(?<!\p{L})([a-zA-Zα-ωΑ-Ω])-(?=[0-9(]|[a-zA-Zα-ωΑ-Ω](?!\p{L}))/gu, '$1 − ')
      .replace(/(^|[\s([={])-(?=\d|√)/g, '$1−')
      .replace(/[ \t]*([∥⊂⊄∩∪∈∉⇒⇔≠≤≥⊥=<>])[ \t]*/gu, ' $1 ')
      .replace(fractionPattern, (match, numerator, denominator) => units.test(numerator + '/' + denominator)
        ? match : '\\frac{' + numerator + '}{' + denominator + '}');
  }
  function tokens(text) {
    return Array.from(text.matchAll(plainToken)).reduce((out, match) => {
      const token = match[0];
      const variable = /^[A-Za-zα-ωΑ-Ω](?:[′']+)?$/u.test(token) || /^[A-Z]{2,4}$/.test(token);
      out.html += escapeHTML(text.slice(out.end, match.index)) +
        '<span class="math-token' + (variable ? ' math-var' : '') + '">' +
        escapeHTML(variable ? token.replace(/'/g, '′') : token) + '</span>';
      out.end = match.index + token.length;
      return out;
    }, { html: '', end: 0 });
  }
  function plain(text) {
    const parts = tokens(text);
    return parts.html + escapeHTML(text.slice(parts.end));
  }
  function span(className, body) {
    return '<span class="' + className + '">' + body + '</span>';
  }
  function script(kind, html) {
    const tag = kind === 'sub' ? 'sub' : 'sup';
    return span('math-script', '<' + tag + '>' + html + '</' + tag + '>');
  }
  function root(body) {
    return span('math-root', '<span>√</span>' + span('math-rad', body));
  }
  function format(text) {
    const pattern = /\\(frac|sqrt|vec|widehat|overrightarrow|overline)(?=\{)|√|([_^])|([⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁿᵐ]+)|([₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎ₙₘ]+)/gu;
    let result = '', end = 0;
    for (let match = pattern.exec(text); match; match = pattern.exec(text)) {
      const next = pattern.lastIndex;
      let body, consumed;
      if (match[3] || match[4]) {
        const source = match[3] ? superscript : subscript;
        const contents = [...match[0]].map(char => plainScript[source.indexOf(char)]).join('');
        body = script(match[3] ? 'sup' : 'sub', plain(contents));
        consumed = next;
      } else {
        const single = (match[0] === '√' ? /^(?:\d+(?:[,.]\d+)?|[a-zA-Zα-ωΑ-Ω])/u : /^(?:[−-]?\d+|[a-zA-Zα-ωΑ-Ω])/u).exec(text.slice(next));
        const first = group(text, next) || (match[0] === '√' ? group(text, next, '(', ')') : null) ||
          ((match[2] || match[0] === '√') && single ? { text: single[0], end: next + single[0].length } : null);
        if (!first) continue;
        const fraction = match[1] === 'frac' ? group(text, first.end) : null;
        if (match[1] === 'frac' && !fraction) continue;
        const rendered = format(first.text);
        if (fraction) body = span('math-frac', '<span>' + rendered + '</span><span>' + format(fraction.text) + '</span>');
        else if (match[1] === 'sqrt' || match[0] === '√') body = root(rendered);
        else if (match[1] === 'widehat') body = span('math-angle', rendered);
        else if (match[1] === 'overline') body = span('math-bar', rendered);
        else if (match[1] === 'vec' || match[1] === 'overrightarrow') body = span('math-vec', rendered);
        else body = script(match[2] === '_' ? 'sub' : 'sup', rendered);
        consumed = (fraction || first).end;
      }
      result += plain(text.slice(end, match.index)) + body;
      end = pattern.lastIndex = consumed;
    }
    return result + plain(text.slice(end));
  }
  return Object.freeze({ render: value => format(normalize(value)) });
})();
