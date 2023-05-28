import { GroupStatusEnum } from "src/app/enums/group-status.enum";

export const GroupStatusLabel = {
  [GroupStatusEnum.WaitingTourist]: 'Aguardando turista',
  [GroupStatusEnum.WaitingTouristGuide]: 'Aguardando guia turístico',
  [GroupStatusEnum.Confirmed]: 'Confirmado',
  [GroupStatusEnum.Canceled]: 'Cancelado',
  [GroupStatusEnum.Done]: 'Realizado',
}
