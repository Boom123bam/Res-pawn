import { browser } from "$app/environment";

export function storeUserSettings(settings) {
  if (browser)
    localStorage.setItem("settings", JSON.stringify(settings));
}

export function getUserSettings() {
  if (browser) {
    const settings = localStorage.getItem("settings");
    if (settings) return JSON.parse(settings);
    else return null;
  }
}
