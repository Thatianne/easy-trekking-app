import { DifficultLevelEnum } from "src/app/enums/difficult-level.enum";

export interface FilterParams {
  state?: number | null;
  city?: number | null;
  durationMin?: number | null,
  durationMax?: number | null,
  difficultLevel?: DifficultLevelEnum | null;
}
