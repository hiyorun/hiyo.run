export type CodeObj = {
  id: number;
  date: string;
  title: string;
  _relations?: {
    codeDetails: CodeDetails[];
  };
  repository: string;
  description: string;
  stacks: string[];
  link: string;
  licenses: {
    name: string;
    link?: string;
  }[];
};

export type CodeDetails = {
  id: number;
  sections: {
    title: string;
    body: CodeDetailsBody[];
  }[];
};

export type CodeDetailsBody = {
  type: 'p' | 'ol' | 'ul';
  value: string[] | string;
};
