import { usePrompt } from '@/states/prompts.js'
import { reactive} from 'vue';

export function shufflePrompt() {
  const promptFunc = usePrompt();
  const prompt = reactive({
    value: ""
  });

  prompt.value = promptFunc.getPrompt[Math.floor(Math.random() * promptFunc.getPrompt.length)];
  return prompt.value
};
