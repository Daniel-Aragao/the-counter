import { LogEntry } from "./logEntry";

export interface Log {
  id: string;
  entries: { [guid: string]: LogEntry };
}
