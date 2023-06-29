import { defineStore } from "pinia";

export const usePrompt = defineStore("prompt", {
  state: () => ({
    prompts: [""],
    chosen:"",
  }),
  getters: {
    getPrompt(state){
      return state.chosen
    },
    choosePrompt(state) {
      state.chosen =  state.prompts[Math.floor(Math.random() * state.prompts.length)]
      return state.chosen
    },
  },
  actions: {
    storePrompts(promptList){
      this.prompts = promptList
    }
  },
});
