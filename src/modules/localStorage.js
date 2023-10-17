import { browser } from "$app/environment";

const defaultSettings = {
  sound: true,
  showIndicatorOnHover: false,
  theme: "light",
};

export function storeSettings(settings) {
  if (browser)
    localStorage.setItem("settings", JSON.stringify(settings));
}

export function getSettings() {
  if (browser) {
    const settings = localStorage.getItem("settings");
    if (settings) return JSON.parse(settings);
    storeSettings(defaultSettings);
    return defaultSettings;
  }
}

export function getSetting(name) {
  if (browser) {
    const settings = localStorage.getItem("settings");
    if (settings) return JSON.parse(settings)[name];
    storeSettings(defaultSettings);
    return defaultSettings[name];
  }
}

export function updateSettings(newSettings) {
  // uses spread operator to change only the settings provided
  if (browser) {
    const settings = localStorage.getItem("settings");
    newSettings = settings
      ? { ...JSON.parse(settings), ...newSettings }
      : {
          ...JSON.parse(defaultSettings),
          ...newSettings,
        };
    storeSettings(newSettings);
  }
}
