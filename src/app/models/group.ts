import { GroupStatusEnum } from "../enums/group-status.enum";
import { Trekking } from "./trekking";
import { User } from "./user";

interface GroupStatus {
  id: GroupStatusEnum;
  value: string;
}

export interface Group {
  id: number;
  name: string;
  date: Date;
  trekking: Trekking;
  touristGuideUser: User;
  tourists: User[];
  groupStatus: GroupStatus;
}
