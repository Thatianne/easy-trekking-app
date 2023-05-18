import { DifficultLevelEnum } from "src/app/enums/difficult-level.enum";

export interface FilterParams {
  state: number,
  city: number,
  duration: {
    min: number,
    max: number
  },
  difficultLevel: DifficultLevelEnum
}
