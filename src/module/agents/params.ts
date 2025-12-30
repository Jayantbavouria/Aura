import { parseAsInteger, parseAsString } from "nuqs/server";
import { DEFAULT_PAGE } from "@/constant";

export const FilterSearchParams = {
  search: parseAsString
    .withDefault("")
    .withOptions({ clearOnDefault: true }),
  page: parseAsInteger
    .withDefault(DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
};

export const loadSearchParams = (searchParamsConfig: typeof FilterSearchParams) => {
  return async (searchParams: Promise<Record<string, string | string[] | undefined>>) => {
    const params = await searchParams;
    const result: Record<string, unknown> = {};

    for (const [key, parser] of Object.entries(searchParamsConfig)) {
      result[key] = parser.parseServerSide(params[key]);
    }

    return result;
  };
};