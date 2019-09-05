function $on(target, event, callback) {
    target.addEventListener(event, callback);
}

function sel(selector) {
    return document.querySelector(selector);
}