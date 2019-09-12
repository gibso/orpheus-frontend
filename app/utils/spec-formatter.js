import { htmlSafe } from '@ember/string';

export function formatSpec2Html(spec) {
  // replace newlines with <br> element
  spec = spec.replace(/\n/g, '<br>');
  // replace spaces with &nbsp;
  spec = spec.replace(/ /g, '&nbsp;');
  // escape unsafe characters
  return htmlSafe(spec);
}
