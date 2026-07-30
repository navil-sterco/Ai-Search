export type RichTextBlock = {
  type: "richtext";
  heading: string;
  body: string;
  bullets?: string[];
};

export type ListBlock = {
  type: "list";
  heading: string;
  items: string[];
};

export type StatItem = {
  value: string;
  label: string;
};

export type StatsBlock = {
  type: "stats";
  heading: string;
  items: StatItem[];
};

export type LinkItem = {
  label: string;
  url: string;
};

export type LinksBlock = {
  type: "links";
  heading?: string;
  items: LinkItem[];
};

export type ContactItem = {
  label: string;
  value: string;
  href?: string;
};

export type ContactBlock = {
  type: "contact";
  heading: string;
  items: ContactItem[];
};

export type CardItem = {
  title: string;
  description: string;
};

export type CardsBlock = {
  type: "cards";
  heading: string;
  items: CardItem[];
};

// Catch-all for any block type the API introduces later that we don't
// explicitly model yet. Nothing from the response should ever be dropped —
// unrecognized blocks fall back to a generic renderer instead of vanishing.
export type UnknownBlock = {
  type: string;
  heading?: string;
  [key: string]: unknown;
};

export type KnownBlock =
  | RichTextBlock
  | ListBlock
  | StatsBlock
  | LinksBlock
  | ContactBlock
  | CardsBlock;

export type ResultBlock = KnownBlock | UnknownBlock;

export const KNOWN_BLOCK_TYPES = [
  "richtext",
  "list",
  "stats",
  "links",
  "contact",
  "cards",
] as const;

export type SearchData = {
  query: string;
  answer: string;
  title: string;
  subtitle: string;
  blocks: ResultBlock[];
  suggested_queries: string[];
};

export type SearchResponse = {
  status: boolean;
  data: SearchData;
};

