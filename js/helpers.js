function $on(target, event, callback) {
  target.addEventListener(event, callback);
}

function sel(selector) {
  return document.querySelector(selector);
}

function asArray(stringOrArray) {
  let vals = stringOrArray;
  if (
    stringOrArray.constructor === String ||
    stringOrArray.constructor === Number
  ) {
    vals = [stringOrArray];
  } else {
    vals = [...stringOrArray];
  }
  return vals;
}

const escapeForHTML = s =>
  s.replace(/[&<]/g, c => (c === "&" ? "&amp;" : "&lt;"));
