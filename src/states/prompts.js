import { defineStore } from "pinia";

export const usePrompt = defineStore("prompt", {
  state: () => ({
    prompts: [""],
  }),
  getters: {
    getPrompt(state) {
      return this.prompts;
    },
  },
  actions: {
    storePrompts(promptList) {
      this.prompts = promptList;
    },
  },
});
