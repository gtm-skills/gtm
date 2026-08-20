'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    // In production, send to your analytics/feedback endpoint
    console.log('Feedback:', { feedback, message });
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setFeedback(null);
      setMessage('');
    }, 2000);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-muted hover:bg-accent text-foreground rounded-full text-sm font-medium transition-all shadow-lg border border-border hover:border-border"
      >
        <MessageSquare className="h-4 w-4" />
        <span className="hidden sm:inline">Feedback</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 bg-card rounded-xl shadow-2xl border border-border overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <span className="font-medium text-sm">Quick Feedback</span>
        <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      {submitted ? (
        <div className="p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
            <ThumbsUp className="h-6 w-6 text-green-500" />
          </div>
          <p className="font-medium">Thanks for your feedback!</p>
          <p className="text-sm text-muted-foreground mt-1">It helps us improve.</p>
        </div>
      ) : (
        <div className="p-4">
          <p className="text-sm text-muted-foreground mb-4">How useful is this resource?</p>

          <div className="flex gap-3 mb-4">
            <button
              onClick={() => setFeedback('positive')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition-all ${
                feedback === 'positive'
                  ? 'bg-green-500/20 border-green-500/50 text-green-400'
                  : 'bg-muted border-border text-muted-foreground hover:border-border'
              }`}
            >
              <ThumbsUp className="h-5 w-5" />
              <span className="text-sm font-medium">Useful</span>
            </button>
            <button
              onClick={() => setFeedback('negative')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition-all ${
                feedback === 'negative'
                  ? 'bg-red-500/20 border-red-500/50 text-red-400'
                  : 'bg-muted border-border text-muted-foreground hover:border-border'
              }`}
            >
              <ThumbsDown className="h-5 w-5" />
              <span className="text-sm font-medium">Not yet</span>
            </button>
          </div>

          {feedback && (
            <div className="space-y-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={feedback === 'positive' ? 'What did you find most useful?' : 'What would make this better?'}
                className="w-full h-20 px-3 py-2 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-border"
              />
              <Button onClick={handleSubmit} size="sm" className="w-full gap-2">
                <Send className="h-4 w-4" />
                Send Feedback
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
