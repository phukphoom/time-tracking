// Shared TypeScript types for the application

export interface Account {
  id: number;
  username: string;
  password?: string; // Optional as it's not always returned
  role: string;
  name: string;
}

export interface Session {
  id: number;
  username: string;
  role: string;
  name: string;
}

export interface ClockingRecord {
  id: number;
  accountId: number;
  clockingType: "clock-in" | "clock-out";
  clockingTime: string;
}
