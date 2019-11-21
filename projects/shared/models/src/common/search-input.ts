import { PageOptions } from "./page-options.model";
import { SortOptions } from "./sort-options.model";

const allCount = Number.MAX_SAFE_INTEGER - 2;

export interface SearchInput<T = any, SF extends string = string> extends PageOptions {
  sortOptions?: SortOptions<SF>;
  filters?: T;
}

export module SearchInput {
  export function take<T = any, SF extends string = string>(limit: number, filters: T): SearchInput<T, SF> {
    return {
      offset: 0,
      limit: limit,
      filters: filters,
    };
  }

  export function one<T = any, SF extends string = string>(filters: T): SearchInput<T, SF> {
    return take<T, SF>(1, filters);
  }

  export function all<T = any, SF extends string = string>(filters: T): SearchInput<T, SF> {
    return take<T, SF>(allCount, filters);
  }

  export function defaultSorts<T = any, SF extends string = string>(
    searchInput: SearchInput<T, SF>,
    defaultSortOptions?: SortOptions<SF> | null,
  ) {
    if (defaultSortOptions == null) defaultSortOptions = [];
    const oldSortOptions = searchInput.sortOptions;
    const resolvedSortOptions =
      oldSortOptions != null && oldSortOptions.length > 0 && Object.keys(oldSortOptions[0]).length > 0
        ? oldSortOptions
        : defaultSortOptions;
    return {
      ...searchInput,
      sortOptions: resolvedSortOptions,
    };
  }

  export function defaults<T = any, SF extends string = string>(
    searchInput: Partial<SearchInput<T, SF>> | null | undefined,
    defaultLimit: number,
    defaultSortOptions?: SortOptions<SF> | null,
  ) {
    return defaultSorts(
      {
        offset: 0,
        limit: defaultLimit,
        ...searchInput,
      },
      defaultSortOptions,
    );
  }
}
