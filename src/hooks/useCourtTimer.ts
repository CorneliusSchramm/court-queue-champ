import { useState, useEffect } from 'react';
import type { CourtSession, CourtStatus } from '@/types/court';

export function useCourtTimer(session: CourtSession | null) {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [status, setStatus] = useState<CourtStatus>('available');

  useEffect(() => {
    if (!session) {
      setTimeRemaining(0);
      setStatus('available');
      return;
    }

    const updateTimer = () => {
      const now = new Date();
      const endTime = new Date(session.startTime.getTime() + session.duration * 60 * 1000);
      const remaining = endTime.getTime() - now.getTime();
      
      setTimeRemaining(Math.floor(remaining / 1000));

      if (remaining > 10 * 60 * 1000) {
        setStatus('available');
      } else if (remaining > 0) {
        setStatus('warning');
      } else {
        setStatus('overtime');
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [session]);

  return { timeRemaining, status };
}

export function formatTime(seconds: number): string {
  const isNegative = seconds < 0;
  const absSeconds = Math.abs(seconds);
  const minutes = Math.floor(absSeconds / 60);
  const remainingSeconds = absSeconds % 60;
  
  const formatted = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  return isNegative ? `-${formatted}` : formatted;
}