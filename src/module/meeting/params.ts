import { parseAsInteger, parseAsString,parseAsStringEnum } from "nuqs/server";
import { DEFAULT_PAGE } from "@/constant";
import { MeetingStatus } from "./types";

export const FilterSearchParams = {
    search: parseAsString
      .withDefault("")
      .withOptions({ clearOnDefault: true }),
    page: parseAsInteger
      .withDefault(DEFAULT_PAGE)
      .withOptions({ clearOnDefault: true }),
    status: parseAsStringEnum(Object.values(MeetingStatus)),
    agentId: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
};

export const loadSearchParams = (searchParamsConfig: typeof FilterSearchParams) => {
  return async (searchParams: Promise<Record<string, string | string[] | undefined>>) => {
    const params = await searchParams;
    const result: Record<string, any> = {};
    
    for (const [key, parser] of Object.entries(searchParamsConfig)) {
      result[key] = parser.parseServerSide(params[key]);
    }
    
    return result;
  };
};