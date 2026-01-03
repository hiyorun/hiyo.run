import { defineStore } from 'pinia';

export const usePrompt = defineStore('prompt', {
  state: () => ({
    prompts: [''],
  }),
  getters: {
    getPrompt(): string[] {
      return this.prompts;
    },
  },
  actions: {
    storePrompts(promptList: string[]) {
      this.prompts = promptList;
    },
  },
});
