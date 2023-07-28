import { defineStore } from "pinia";

export const usePrompt = defineStore("prompt", {
  state: () => ({
    prompts: [""],
  }),
  getters: {
    choosePrompt(state) {
      let chosen =
        state.prompts[Math.floor(Math.random() * state.prompts.length)];
      return chosen;
    },
  },
  actions: {
    storePrompts(promptList) {
      this.prompts = promptList;
    },
  },
});
