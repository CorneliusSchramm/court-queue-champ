import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { CourtSession } from '@/types/court';

interface SessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courtNumber: number;
  existingSession?: CourtSession | null;
  onSave: (session: Omit<CourtSession, 'id'>) => void;
  onDelete?: () => void;
}

export function SessionDialog({
  open,
  onOpenChange,
  courtNumber,
  existingSession,
  onSave,
  onDelete
}: SessionDialogProps) {
  const [playerCount, setPlayerCount] = useState<'2' | '4'>(
    existingSession?.playerCount.toString() as '2' | '4' || '2'
  );
  const [startTime, setStartTime] = useState(() => {
    if (existingSession) {
      const date = new Date(existingSession.startTime);
      return date.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
    return new Date().toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  });

  const handleSave = () => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const sessionDate = new Date();
    sessionDate.setHours(hours, minutes, 0, 0);

    const duration = playerCount === '2' ? 60 : 120; // 1h for singles, 2h for doubles

    onSave({
      courtNumber,
      startTime: sessionDate,
      playerCount: parseInt(playerCount) as 2 | 4,
      duration
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {existingSession ? 'Edit' : 'Start'} Session - Court {courtNumber}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium">Number of Players</Label>
            <RadioGroup
              value={playerCount}
              onValueChange={(value) => setPlayerCount(value as '2' | '4')}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="singles" />
                <Label htmlFor="singles">2 Players (Singles - 1 hour)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4" id="doubles" />
                <Label htmlFor="doubles">4 Players (Doubles - 2 hours)</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="start-time" className="text-base font-medium">
              Start Time
            </Label>
            <Input
              id="start-time"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="mt-2"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex-1">
              {existingSession ? 'Update' : 'Start'} Session
            </Button>
            
            {existingSession && onDelete && (
              <Button variant="destructive" onClick={onDelete}>
                End Session
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}