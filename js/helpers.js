function $on(target, event, callback) {
  target.addEventListener(event, callback);
}

function sel(selector) {
  return document.querySelector(selector);
}

function asArray(stringOrArray) {
  let vals = stringOrArray;
  if (stringOrArray.constructor === String) {
    vals = [stringOrArray];
  } else {
    vals = [...stringOrArray];
  }
  return vals;
}
