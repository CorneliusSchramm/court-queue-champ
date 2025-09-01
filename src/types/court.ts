export interface CourtSession {
  id: string;
  courtNumber: number;
  startTime: Date;
  playerCount: 2 | 4;
  duration: number; // in minutes
}

export interface QueueEntry {
  id: string;
  playerCount: 2 | 4;
  addedAt: Date;
  expectedCourtNumber?: number;
  expectedStartTime?: Date;
}

export type CourtStatus = 'available' | 'warning' | 'overtime';