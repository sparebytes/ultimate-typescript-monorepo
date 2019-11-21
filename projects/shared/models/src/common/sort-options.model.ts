export type SortOptions<SF extends string = string> = { [K in SF]?: 1 | -1 }[];
