export interface PageOptions {
  limit: number;
  offset: number;
}

export interface PageIndexOptions {
  pageIndex: number;
  pageSize: number;
}

export type PageChange = { offset: number; limit?: number } | { pageIndex: number; pageSize?: number };

export module PageOptions {
  export function isPageOptions(page: any): page is PageOptions {
    return (
      page != null && "limit" in page && "offset" in page && typeof page.limit === "number" && typeof page.offset === "number"
    );
  }

  export function isPageIndexOptions(page: any): page is PageIndexOptions {
    return (
      page != null &&
      "pageIndex" in page &&
      "pageSize" in page &&
      typeof page.pageIndex === "number" &&
      typeof page.pageSize === "number"
    );
  }

  export function getPageIndex(page?: PageChange | null): number | null {
    if (page == null) {
      return null;
    } else if ("pageIndex" in page && page.pageIndex != null && !isNaN(page.pageIndex)) {
      return page.pageIndex;
    } else if ("offset" in page && typeof page.offset === "number") {
      if ("limit" in page && typeof page.limit === "number") {
        const pageIndex = Math.floor(page.offset / page.limit);
        if (isNaN(pageIndex)) {
          console.error("getPageIndex(): calculated pageIndex isNaN");
          return null;
        }
        return pageIndex;
      } else {
        console.error("getPageIndex(): Unable to determine pageIndex from limit*offset because one of the values is null");
        return null;
      }
    } else {
      return null;
    }
  }

  export function toPageIndexOptions(page?: null): null;
  export function toPageIndexOptions(page: PageOptions | PageIndexOptions): PageIndexOptions;
  export function toPageIndexOptions(page?: PageOptions | PageIndexOptions | null): PageIndexOptions | null {
    if (page == null) {
      return null;
    } else if (isPageOptions(page)) {
      return {
        pageIndex: Math.floor(page.offset / page.limit),
        pageSize: page.limit,
      };
    } else if (isPageIndexOptions(page)) {
      return page;
    } else {
      throw new Error("toPageIndexOptions(page): page is invalid.");
    }
  }

  export function toPageOptions(page?: null): null;
  export function toPageOptions(page: PageOptions | PageIndexOptions): PageOptions;
  export function toPageOptions(page?: PageOptions | PageIndexOptions | null): PageOptions | null {
    if (page == null) {
      return null;
    } else if (isPageOptions(page)) {
      return page;
    } else if (isPageIndexOptions(page)) {
      return {
        limit: page.pageSize,
        offset: page.pageIndex * page.pageSize,
      };
    } else {
      throw new Error("toPageIndexOptions(page): page is invalid.");
    }
  }
}
