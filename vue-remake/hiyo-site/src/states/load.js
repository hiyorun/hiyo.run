import { defineStore } from "pinia";

export const loadingStates = defineStore("isloading", {
  state: () => ({
    projects: false,
    title: false,
    needToLoad: 0,
    doneLoading: 0,
  }),
  getters: {
    loadingProgress() {
      return (this.doneLoading / this.needToLoad) * 100 || 0;
    },
  },
  actions: {
    projectCounter(len, done) {
      this.doneLoading += 1;
      if (this.needToLoad === 0) {
        this.needToLoad = len;
      }
      if (len === done) {
        this.projects = true;
        return;
      }
    },
  },
});
