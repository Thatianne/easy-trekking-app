import { City } from "./city";
import { DifficultLevel } from "./difficult-level";
import { State } from "./state";

export interface Trekking {
  id: number;
  name: string;
  start: string;
  end: string;
  state: State,
  city: City,
  distanceInMeters: number;
  durationInHours: number;
  difficultLevel: DifficultLevel,
  descriptions: TrekkingDescription[];
}

export interface TrekkingDescription {
  id: number;
  description: string;
}

export interface Price {
  id: number;
  price: number;
  startDate: Date;
  endDate: Date;
}
