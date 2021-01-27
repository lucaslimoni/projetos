export function getPref(key, defaultValue) {
  return window.localStorage.getItem(`user-preference-${key}`) || defaultValue;
}

export function getInt(key, defaultValue) {
  return (
    parseInt(window.localStorage.getItem(`user-preference-${key}`)) ||
    defaultValue
  );
}

export function setPref(key, value) {
  window.localStorage.setItem(`user-preference-${key}`, value);
}
