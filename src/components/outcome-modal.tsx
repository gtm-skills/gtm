'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  X,
  Trophy,
  Calendar,
  MessageSquare,
  Send,
  DollarSign,
  Check,
  Sparkles,
} from 'lucide-react';

interface OutcomeModalProps {
  promptId: string;
  promptTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const outcomeTypes = [
  {
    value: 'reply_received',
    label: 'Got a Reply',
    icon: MessageSquare,
    description: 'Prospect responded to your outreach',
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
  },
  {
    value: 'meeting_booked',
    label: 'Meeting Booked',
    icon: Calendar,
    description: 'Scheduled a call or demo',
    color: 'text-green-400',
    bg: 'bg-green-500/20',
  },
  {
    value: 'demo_completed',
    label: 'Demo Completed',
    icon: Sparkles,
    description: 'Successfully delivered a demo',
    color: 'text-purple-400',
    bg: 'bg-purple-500/20',
  },
  {
    value: 'proposal_sent',
    label: 'Proposal Sent',
    icon: Send,
    description: 'Sent a proposal or quote',
    color: 'text-amber-400',
    bg: 'bg-amber-500/20',
  },
  {
    value: 'deal_won',
    label: 'Deal Won!',
    icon: Trophy,
    description: 'Closed the deal',
    color: 'text-orange-400',
    bg: 'bg-orange-500/20',
  },
];

export function OutcomeModal({
  promptId,
  promptTitle,
  isOpen,
  onClose,
  onSuccess,
}: OutcomeModalProps) {
  const [selectedOutcome, setSelectedOutcome] = useState('');
  const [outcomeValue, setOutcomeValue] = useState('');
  const [testimonial, setTestimonial] = useState('');
  const [email, setEmail] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/v1/prompts/${promptId}/outcome`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          outcome_type: selectedOutcome,
          outcome_value: outcomeValue ? parseFloat(outcomeValue) : undefined,
          testimonial: testimonial || undefined,
          user_email: email || undefined,
          is_public: isPublic,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit outcome');
      }

      setSuccess(true);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedOutcome('');
    setOutcomeValue('');
    setTestimonial('');
    setEmail('');
    setError('');
    setSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-background border border-border rounded-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h2 className="font-semibold">Report an Outcome</h2>
            <p className="text-sm text-muted-foreground truncate max-w-[300px]">
              {promptTitle}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Thanks for Sharing!</h3>
            <p className="text-muted-foreground mb-6">
              Your outcome helps the community find prompts that actually work.
            </p>
            <Button onClick={handleClose}>Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 space-y-6">
            {/* Outcome Type Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">
                What happened? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 gap-2">
                {outcomeTypes.map((outcome) => (
                  <button
                    key={outcome.value}
                    type="button"
                    onClick={() => setSelectedOutcome(outcome.value)}
                    className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                      selectedOutcome === outcome.value
                        ? 'border-orange-500 bg-orange-500/10'
                        : 'border-border hover:border-orange-500/50'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${outcome.bg}`}>
                      <outcome.icon className={`w-5 h-5 ${outcome.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{outcome.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {outcome.description}
                      </div>
                    </div>
                    {selectedOutcome === outcome.value && (
                      <Check className="w-5 h-5 text-orange-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Deal Value (for deal_won) */}
            {selectedOutcome === 'deal_won' && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Deal Value (optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <input
                    type="number"
                    value={outcomeValue}
                    onChange={(e) => setOutcomeValue(e.target.value)}
                    placeholder="50,000"
                    className="w-full pl-8 pr-4 py-3 rounded-lg bg-secondary border border-border focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Share the deal size to help others see ROI
                </p>
              </div>
            )}

            {/* Testimonial */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Quick testimonial (optional)
              </label>
              <textarea
                value={testimonial}
                onChange={(e) => setTestimonial(e.target.value)}
                placeholder="This prompt helped me book 3 meetings in one day..."
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-orange-500 focus:outline-none resize-none"
                rows={3}
                maxLength={280}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {testimonial.length}/280 characters
              </p>
            </div>

            {/* Email for verification */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email (optional, for verification)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-orange-500 focus:outline-none"
              />
              <p className="text-xs text-muted-foreground mt-1">
                We may reach out to verify large outcomes
              </p>
            </div>

            {/* Public toggle */}
            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <div>
                <div className="font-medium text-sm">Show publicly</div>
                <div className="text-xs text-muted-foreground">
                  Display on prompt page & impact dashboard
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPublic(!isPublic)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  isPublic ? 'bg-orange-500' : 'bg-secondary'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    isPublic ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={!selectedOutcome || isSubmitting}
                className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Trophy className="w-4 h-4 mr-2" />
                    Submit Outcome
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
