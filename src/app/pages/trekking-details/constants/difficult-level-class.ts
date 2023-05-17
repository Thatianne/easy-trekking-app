import { DifficultLevelEnum } from "src/app/enums/difficult-level.enum";

export const difficultLevelClass = {
  [DifficultLevelEnum.Easy]: 'badge-info',
  [DifficultLevelEnum.Moderate]: 'badge-warning',
  [DifficultLevelEnum.Difficult]: 'badge-danger',
}
