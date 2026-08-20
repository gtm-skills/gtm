'use client';

import { useState, useMemo } from 'react';
import { CopyButton } from '@/components/copy-button';
import { Workflow } from 'lucide-react';

interface WorkflowOption {
  slug: string;
  name: string;
  shortName: string;
}

interface TripleWorkflowFilterProps {
  /** Label used in copy-tracking, e.g. "SaaS SDR". */
  comboLabel: string;
  /** Default prompt list shown when no workflow is selected. */
  basePrompts: string[];
  /** Every workflow, in display order. */
  workflows: WorkflowOption[];
  /** Workflow-scoped prompts, keyed by workflow slug. */
  workflowPrompts: Record<string, string[]>;
}

const ALL_VALUE = 'all';

export function TripleWorkflowFilter({
  comboLabel,
  basePrompts,
  workflows,
  workflowPrompts,
}: TripleWorkflowFilterProps) {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>(ALL_VALUE);

  const activeWorkflow = workflows.find((w) => w.slug === selectedWorkflow);

  const prompts = useMemo(() => {
    if (selectedWorkflow === ALL_VALUE) return basePrompts;
    return workflowPrompts[selectedWorkflow] ?? basePrompts;
  }, [selectedWorkflow, basePrompts, workflowPrompts]);

  const promptLabel = activeWorkflow
    ? `${comboLabel} ${activeWorkflow.shortName}`
    : comboLabel;

  return (
    <div>
      {/* Workflow filter */}
      <div className="flex flex-wrap items-center gap-3 mb-6 p-4 rounded-lg bg-card/50 border border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
          <Workflow className="h-4 w-4" />
          Narrow to a workflow
        </div>
        <select
          value={selectedWorkflow}
          onChange={(e) => setSelectedWorkflow(e.target.value)}
          className="flex-1 min-w-[200px] px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50"
        >
          <option value={ALL_VALUE}>All Workflows</option>
          {workflows.map((workflow) => (
            <option key={workflow.slug} value={workflow.slug}>
              {workflow.name}
            </option>
          ))}
        </select>
        {selectedWorkflow !== ALL_VALUE && (
          <button
            onClick={() => setSelectedWorkflow(ALL_VALUE)}
            className="text-xs text-orange-400 hover:text-orange-300 shrink-0"
          >
            Clear
          </button>
        )}
      </div>

      {/* Prompts */}
      <div className="space-y-6">
        {prompts.map((prompt, index) => (
          <div
            key={`${selectedWorkflow}-${index}`}
            className="p-6 rounded-xl bg-card border border-border hover:border-border transition-colors"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="text-sm text-muted-foreground">
                Prompt {index + 1}
              </div>
              <CopyButton text={prompt} label={`${promptLabel} - Prompt ${index + 1}`} />
            </div>
            <pre className="whitespace-pre-wrap text-sm text-foreground font-mono bg-card/50 p-4 rounded-lg overflow-x-auto">
              {prompt}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
