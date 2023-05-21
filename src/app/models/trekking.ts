import { City } from "./city";
import { DifficultLevel } from "./difficult-level";
import { State } from "./state";
import { TrekkingImage } from "./trekking-image";

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
  prices: TrekkingPrice[];
  images: TrekkingImage[];
  minPeople: number;
  maxPeople: number;
  daysFormGroup: number;
  daysCompletePayment: number;
}

export interface TrekkingDescription {
  id: number;
  description: string;
}

export interface TrekkingPrice {
  id: number;
  price: number;
  startDate: string;
  endDate: string;
}

export interface AddTrekkingRequest {
  name: string;
  start: string;
  end: string;
  state: number;
  city: number;
  distanceInMeters: number;
  durationInHours: number;
  difficultLevel: number;
  descriptions: string[];
  images: string[];
  prices: AddTrekkingPriceRequest[];
  minPeople: number;
  maxPeople: number;
  daysFormGroup: number;
  daysCompletePayment: number;
}

export interface AddTrekkingPriceRequest {
  startDate: string; // date.toISOString()
  endDate: string;
  price: number;
}
