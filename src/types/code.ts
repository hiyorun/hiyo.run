export type CodeObj = {
  id: number;
  date: string;
  title: string;
  _relations?: {
    codeDetails: CodeDetails[];
  };
  repository: string;
  description: string;
};

export type CodeDetails = {
  id: number;
  sections: {
    title: string;
    body: string;
  }[];
  stacks: string[];
  links: string;
};
