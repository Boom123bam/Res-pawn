import { browser } from "$app/environment";

export function storeSettings(settings) {
  if (browser)
    localStorage.setItem("settings", JSON.stringify(settings));
}

export function getSettings() {
  if (browser) {
    const settings = localStorage.getItem("settings");
    if (settings) return JSON.parse(settings);
    else return null;
  }
}

export function updateSettings(newSettings) {
  // uses spread operator to change only the settings provided
  if (browser) {
    const settings = localStorage.getItem("settings");
    if (settings) {
      newSettings = JSON.parse(settings);
      newSettings = { ...settings, newSettings };
    }
    return newSettings;
  }
}
