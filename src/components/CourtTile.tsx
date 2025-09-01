import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Clock, Play } from 'lucide-react';
import type { CourtSession, CourtStatus } from '@/types/court';
import { useCourtTimer, formatTime } from '@/hooks/useCourtTimer';
import { cn } from '@/lib/utils';

interface CourtTileProps {
  courtNumber: number;
  session: CourtSession | null;
  onStartSession: (courtNumber: number) => void;
  onEditSession: (session: CourtSession) => void;
}

export function CourtTile({ courtNumber, session, onStartSession, onEditSession }: CourtTileProps) {
  const { timeRemaining, status } = useCourtTimer(session);

  const getStatusStyles = (status: CourtStatus) => {
    switch (status) {
      case 'available':
        return 'bg-court-surface border-court-available';
      case 'warning':
        return 'bg-gradient-to-br from-court-warning/10 to-court-warning/5 border-court-warning';
      case 'overtime':
        return 'bg-gradient-to-br from-court-overtime/10 to-court-overtime/5 border-court-overtime';
    }
  };

  const getTimerColor = (status: CourtStatus) => {
    switch (status) {
      case 'available':
        return 'text-court-available';
      case 'warning':
        return 'text-court-warning';
      case 'overtime':
        return 'text-court-overtime';
    }
  };

  return (
    <Card className={cn(
      'p-4 transition-all duration-300 hover:shadow-lg border-2',
      getStatusStyles(status)
    )}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-primary">
          Court {courtNumber}
        </h3>
        {session && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users size={14} />
            <span>{session.playerCount}</span>
          </div>
        )}
      </div>

      {session ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={16} className={getTimerColor(status)} />
              <span className={cn('font-mono text-lg font-bold', getTimerColor(status))}>
                {formatTime(timeRemaining)}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {session.playerCount === 2 ? 'Singles' : 'Doubles'}
            </span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEditSession(session)}
            className="w-full"
          >
            Edit Session
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="text-center py-4">
            <Play size={24} className="mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Court available</p>
          </div>
          
          <Button 
            onClick={() => onStartSession(courtNumber)}
            className="w-full"
          >
            Start Session
          </Button>
        </div>
      )}
    </Card>
  );
}