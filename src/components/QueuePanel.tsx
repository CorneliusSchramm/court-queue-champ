import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, Plus } from 'lucide-react';
import type { QueueEntry } from '@/types/court';

interface QueuePanelProps {
  queue: QueueEntry[];
  onAddToQueue: () => void;
  onRemoveFromQueue: (id: string) => void;
}

export function QueuePanel({ queue, onAddToQueue, onRemoveFromQueue }: QueuePanelProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Queue</CardTitle>
          <Button onClick={onAddToQueue} size="sm">
            <Plus size={16} className="mr-1" />
            Join Queue
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {queue.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            No one in queue
          </p>
        ) : (
          <div className="space-y-3">
            {queue.map((entry, index) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-3 bg-court-surface rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="w-8 h-8 rounded-full p-0 flex items-center justify-center">
                    {index + 1}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span className="font-medium">{entry.playerCount} players</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {entry.expectedStartTime && (
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Expected start</div>
                      <div className="text-sm font-medium flex items-center gap-1">
                        <Clock size={12} />
                        {entry.expectedStartTime.toLocaleTimeString('en-US', {
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                        {entry.expectedCourtNumber && (
                          <span className="text-xs text-muted-foreground">
                            (Court {entry.expectedCourtNumber})
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRemoveFromQueue(entry.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}