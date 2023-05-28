import { GroupStatusEnum } from "src/app/enums/group-status.enum";

export const GroupStatusClass = {
  [GroupStatusEnum.WaitingTourist]: 'badge-secondary',
  [GroupStatusEnum.WaitingTouristGuide]: 'badge-secondary',
  [GroupStatusEnum.Confirmed]: 'badge-primary',
  [GroupStatusEnum.Canceled]: 'badge-danger',
  [GroupStatusEnum.Done]: 'basge-succes',
}
