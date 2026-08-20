'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Mic,
  Clock,
  Copy,
  Check,
  Play,
  Zap,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Rocket,
} from 'lucide-react';

interface VoiceTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: string;
  duration_minutes: number;
  system_prompt: string;
  first_message: string;
  model: string;
  voice: string;
  variables: string[];
  objection_handlers: Record<string, string>;
  success_criteria: string[];
  tags: string[];
}

const difficultyColors: Record<string, string> = {
  beginner: 'bg-green-500/20 text-green-400',
  intermediate: 'bg-amber-500/20 text-amber-400',
  advanced: 'bg-red-500/20 text-red-400',
};

export default function VoiceTemplateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [template, setTemplate] = useState<VoiceTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [expandedHandlers, setExpandedHandlers] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [vapiKey, setVapiKey] = useState('');
  const [variables, setVariables] = useState<Record<string, string>>({});
  const [deploying, setDeploying] = useState(false);
  const [deployResult, setDeployResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    async function fetchTemplate() {
      try {
        const response = await fetch(`/api/v1/voice/templates/${id}`);
        const data = await response.json();
        if (data.data) {
          setTemplate(data.data);
          // Initialize variables with empty strings
          const initialVars: Record<string, string> = {};
          data.data.variables.forEach((v: string) => {
            initialVars[v] = '';
          });
          setVariables(initialVars);
        }
      } catch (error) {
        console.error('Error fetching template:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTemplate();
  }, [id]);

  const handleCopy = async (text: string, section: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleDeploy = async () => {
    if (!template || !vapiKey) return;

    setDeploying(true);
    setDeployResult(null);

    try {
      const response = await fetch('/api/v1/voice/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          template_id: template.id,
          vapi_api_key: vapiKey,
          variables,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setDeployResult({
          success: true,
          message: `Assistant created! ID: ${data.assistant.id}`,
        });
      } else {
        setDeployResult({
          success: false,
          message: data.error || 'Deployment failed',
        });
      }
    } catch (error) {
      setDeployResult({
        success: false,
        message: 'Network error. Please try again.',
      });
    } finally {
      setDeploying(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="inline-block w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-muted-foreground">Loading template...</p>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="py-20 text-center">
        <Mic className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h1 className="text-2xl font-bold mb-2">Template Not Found</h1>
        <p className="text-muted-foreground mb-4">This voice template doesn't exist.</p>
        <Link href="/voice-templates">
          <Button>Browse Templates</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Link */}
        <Link
          href="/voice-templates"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Voice Templates
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="outline" className="border-purple-500/30 text-purple-400">
              <Mic className="w-3 h-3 mr-1" />
              Voice Template
            </Badge>
            <Badge className={difficultyColors[template.difficulty]}>
              {template.difficulty}
            </Badge>
            <Badge variant="secondary">
              <Clock className="w-3 h-3 mr-1" />
              {template.duration_minutes} min
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{template.name}</h1>
          <p className="text-lg text-muted-foreground">{template.description}</p>
        </div>

        {/* Deploy Button */}
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1">
              <h2 className="font-semibold mb-1">Deploy to Vapi</h2>
              <p className="text-sm text-muted-foreground">
                Create a live AI voice agent using this template
              </p>
            </div>
            <Button
              onClick={() => setShowDeployModal(true)}
              className="bg-purple-500 hover:bg-purple-600"
            >
              <Rocket className="w-4 h-4 mr-2" />
              Deploy Now
            </Button>
          </div>
        </div>

        {/* System Prompt */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold">System Prompt</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy(template.system_prompt, 'system')}
            >
              {copiedSection === 'system' ? (
                <>
                  <Check className="w-4 h-4 mr-1 text-green-500" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <div className="bg-card rounded-xl p-4 font-mono text-sm">
            <pre className="text-foreground whitespace-pre-wrap">{template.system_prompt}</pre>
          </div>
        </div>

        {/* First Message */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold">Opening Line</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy(template.first_message, 'first')}
            >
              {copiedSection === 'first' ? (
                <>
                  <Check className="w-4 h-4 mr-1 text-green-500" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <div className="bg-secondary rounded-xl p-4">
            <p className="text-lg italic">"{template.first_message}"</p>
          </div>
        </div>

        {/* Variables */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Variables</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Replace these placeholders with your specific information
          </p>
          <div className="flex flex-wrap gap-2">
            {template.variables.map((variable) => (
              <code
                key={variable}
                className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-sm"
              >
                {`{{${variable}}}`}
              </code>
            ))}
          </div>
        </div>

        {/* Objection Handlers */}
        {Object.keys(template.objection_handlers).length > 0 && (
          <div className="mb-8">
            <button
              onClick={() => setExpandedHandlers(!expandedHandlers)}
              className="flex items-center justify-between w-full text-left mb-3"
            >
              <h2 className="text-xl font-semibold">Objection Handlers</h2>
              {expandedHandlers ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            {expandedHandlers && (
              <div className="space-y-3">
                {Object.entries(template.objection_handlers).map(([objection, response]) => (
                  <div key={objection} className="bg-secondary rounded-xl p-4">
                    <div className="font-medium text-red-400 mb-2">"{objection}"</div>
                    <div className="text-sm text-muted-foreground">{response}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Success Criteria */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Success Criteria</h2>
          <ul className="space-y-2">
            {template.success_criteria.map((criteria, i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span>{criteria}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {template.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Technical Details */}
        <div className="bg-secondary/50 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Technical Details</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Model</div>
              <div className="font-mono">{template.model}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Voice</div>
              <div className="font-mono">{template.voice}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Category</div>
              <div className="capitalize">{template.category.replace('_', ' ')}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Template ID</div>
              <div className="font-mono text-xs">{template.id}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Deploy Modal */}
      {showDeployModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-background/60 backdrop-blur-sm"
            onClick={() => setShowDeployModal(false)}
          />
          <div className="relative bg-background border border-border rounded-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Deploy to Vapi</h2>

              {deployResult ? (
                <div className={`p-4 rounded-lg mb-4 ${
                  deployResult.success
                    ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                    : 'bg-red-500/10 border border-red-500/20 text-red-400'
                }`}>
                  {deployResult.message}
                </div>
              ) : (
                <>
                  {/* Vapi API Key */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Vapi API Key <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      value={vapiKey}
                      onChange={(e) => setVapiKey(e.target.value)}
                      placeholder="vapi_..."
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-purple-500 focus:outline-none font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Get your API key at{' '}
                      <a href="https://vapi.ai" target="_blank" rel="noopener noreferrer" className="text-purple-400">
                        vapi.ai
                      </a>
                    </p>
                  </div>

                  {/* Variables */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Variables</label>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {template.variables.map((variable) => (
                        <div key={variable}>
                          <label className="block text-xs text-muted-foreground mb-1">
                            {variable}
                          </label>
                          <input
                            type="text"
                            value={variables[variable] || ''}
                            onChange={(e) =>
                              setVariables((prev) => ({ ...prev, [variable]: e.target.value }))
                            }
                            placeholder={`Enter ${variable.replace(/_/g, ' ')}`}
                            className="w-full px-3 py-2 rounded-lg bg-secondary border border-border focus:border-purple-500 focus:outline-none text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                {deployResult?.success ? (
                  <Button onClick={() => setShowDeployModal(false)} className="flex-1">
                    Done
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleDeploy}
                      disabled={deploying || !vapiKey}
                      className="flex-1 bg-purple-500 hover:bg-purple-600"
                    >
                      {deploying ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Deploying...
                        </>
                      ) : (
                        <>
                          <Rocket className="w-4 h-4 mr-2" />
                          Deploy
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={() => setShowDeployModal(false)}>
                      Cancel
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
