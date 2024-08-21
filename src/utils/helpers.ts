export const checkIsDarkSchemePreferred = () =>
  window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ?? false;
