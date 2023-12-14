import { CampusType, StateType } from "@/types";

export function mapToOptions(arrayFromApi: StateType[] | CampusType[]) {
  if (!arrayFromApi) {
    return [];
  }

  return arrayFromApi.map((fromAPI) => ({
    value: fromAPI.id,
    label: fromAPI.name,
    isdisabled: fromAPI.name !== "PA",
  }));
}
