// A very simple "private site" lock for a single user.
// The login/password come from `privateLogin` in languages.js.
// This only hides the course in the browser; it is NOT real security,
// because the static files (and this code) can still be downloaded by anyone.
import {languageConfig} from "../languages";

const config = languageConfig.privateLogin;
const STORAGE_KEY = "private-login";

export const privateLoginEnabled = !!(config && config.username && config.password);

// Changing the login or password in languages.js logs everyone out.
const token = privateLoginEnabled ? `v1:${config.username}:${config.password.length}:${hash(config.password)}` : "";

function hash(text) {
  let h = 0;
  for (let i = 0; i < text.length; i++) {
    h = (Math.imul(31, h) + text.charCodeAt(i)) | 0;
  }
  return h.toString(36);
}

function readStorage() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    return null;
  }
}

function writeStorage(value) {
  try {
    if (value === null) {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, value);
    }
  } catch (e) {
    // Storage may be unavailable (e.g. private mode); the user just has to log in again next time.
  }
}

export function isLoggedIn() {
  return !privateLoginEnabled || readStorage() === token;
}

export function tryLogin(username, password) {
  if (!privateLoginEnabled) {
    return true;
  }
  const ok = username.trim() === config.username && password === config.password;
  if (ok) {
    writeStorage(token);
  }
  return ok;
}

export function logout() {
  writeStorage(null);
  window.location.reload();
}
