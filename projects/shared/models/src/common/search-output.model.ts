export interface SearchOutput<T = any> {
  totalCount: number;
  limit: number;
  offset: number;
  results: T[];
}

export module SearchOutput {
  export function expectOne<O extends SearchOutput>(output: O): O["results"][0] {
    if (output == null) {
      throw new Error("SearchOutput.expectOne(output): output is null.");
    }
    if (output.results.length === 0) {
      throw new Error("SearchOutput.expectOne(output): no results.");
    } else if (output.results.length > 1) {
      throw new Error("SearchOutput.expectOne(output): more than 1 result was returned.");
    } else {
      return output.results[0];
    }
  }
}
