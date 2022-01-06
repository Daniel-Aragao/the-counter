import { Counter } from "./counter";

export interface User {
  id: string;
  counters: {[guid: string]: Counter} ;
  weekStart: number;
}
