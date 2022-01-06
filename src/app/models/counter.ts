import { EFrequency } from "../enums/frequency";

export interface Counter {
  name: string;
  frequency: EFrequency;
  isHidden: boolean;
}
