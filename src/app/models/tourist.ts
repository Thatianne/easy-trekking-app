import { Document } from "./document";

export interface TouristRegister {
  name: string;
  email: string;
  password: string;
  documents: Document[];
  phone: string;
}
