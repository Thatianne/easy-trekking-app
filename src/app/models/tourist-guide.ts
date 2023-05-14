import { Document } from "./document";

export interface TouristGuideRegister {
  name: string;
  email: string;
  password: string;
  associations: number[];
  documents: Document[];
  phone: string;
}
