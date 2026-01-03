import { defineStore } from 'pinia';

const STORAGE_KEY = 'preferences';

type Preferences = {
  theme: 'light' | 'dark' | 'system';
  forceReducedMotion: boolean;
};

function loadPreferences(): Preferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPreferences();
    return { ...defaultPreferences(), ...JSON.parse(raw) };
  } catch {
    return defaultPreferences();
  }
}

function defaultPreferences(): Preferences {
  return {
    theme: 'light',
    forceReducedMotion: false,
  };
}

export const usePreferences = defineStore('preferences', {
  state: () => ({
    prefs: loadPreferences(),
  }),

  getters: {
    getPreferences(state) {
      return state.prefs;
    },
    theme(state) {
      return state.prefs.theme;
    },
    reducedMotion(state) {
      if (state.prefs.forceReducedMotion) {
        return true;
      }
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },
  },

  actions: {
    setPreference<K extends keyof Preferences>(key: K, value: Preferences[K]) {
      this.prefs[key] = value;
      this.persist();
    },

    setPreferences(prefs: Partial<Preferences>) {
      this.prefs = { ...this.prefs, ...prefs };
      this.persist();
    },

    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.prefs));
    },

    reset() {
      this.prefs = defaultPreferences();
      this.persist();
    },
  },
});
