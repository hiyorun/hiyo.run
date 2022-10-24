import { defineStore } from "pinia";

export const prompt = defineStore("prompt", {
  state: () => ({
    prompt: "",
  }),
});
