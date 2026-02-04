# Contributing to GTM Skills

First off, **thank you** for considering contributing to GTM Skills! It's people like you that make GTM Skills the best open-source ecosystem for agentic GTM.

Whether you're submitting your first prompt or your fiftieth, fixing a typo, or suggesting a whole new category - every contribution matters. This guide will help you get started.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Ways to Contribute](#ways-to-contribute)
- [Adding New Prompts](#adding-new-prompts)
- [Directory Structure](#directory-structure)
- [Style Guide](#style-guide)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Recognition](#recognition)
- [Getting Help](#getting-help)

---

## Code of Conduct

This project and everyone participating in it is governed by our commitment to creating a welcoming, inclusive environment.

**We expect:**
- Respectful, constructive communication
- Openness to feedback and different perspectives
- Focus on what's best for the community

**We don't tolerate:**
- Harassment or discrimination of any kind
- Spam or self-promotion unrelated to GTM Skills
- Sharing proprietary or confidential information

---

## Ways to Contribute

### Submit New Prompts

The most valuable contribution! Share prompts that have worked for you in real sales situations. The best prompts come from practitioners who've battle-tested them.

### Report Issues

Found a typo? Broken link? Outdated information? Prompt that doesn't work well? [Open an issue](https://github.com/gtm-skills/gtm/issues/new/choose).

### Suggest Improvements

Have ideas for new categories, better organization, or missing use cases? We want to hear them. Open a [feature request](https://github.com/gtm-skills/gtm/issues/new?template=feature_request.md).

### Improve Documentation

Help make the repo more accessible with better docs, examples, or clarifications.

### Star the Repo

The simplest contribution - helps others discover GTM Skills and signals that this is a valuable resource.

---

## Adding New Prompts

This is the core of GTM Skills, and we want to make it easy for you to contribute.

### What Makes a Great Prompt?

**Great prompts have:**

1. **Clear context** - Tell the AI who it is and what situation it's in
2. **Specific instructions** - Not vague asks, but concrete guidance
3. **Defined output format** - What should the response look like?
4. **Customizable variables** - Use `{{brackets}}` for parts that change
5. **Real-world testing** - Only submit prompts you've actually used

**Avoid:**

- Generic prompts that could apply to anything
- Prompts requiring proprietary or confidential data
- Copy-pasted content from other sources without attribution
- Overly complex prompts that try to do everything at once

### Prompt Template

Use this structure when adding prompts:

```markdown
## [Prompt Name]

[One-sentence description of what this prompt does]

**Use Case:** [When to use this]
**Role:** [SDR/AE/Manager/RevOps/CSM/Founder]
**Difficulty:** [Beginner/Intermediate/Advanced]

### Prompt

```
[Your prompt here]

Use {{variable_name}} for customizable parts.
Be specific about:
- What context to provide
- What output format you want
- Any constraints (word count, tone, etc.)
```

### Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{company_name}}` | Target company | "Acme Corp" |
| `{{prospect_role}}` | Contact's title | "VP of Sales" |

### Example Output

[Show what good output looks like - this helps users understand the prompt's value]

### Tips

[Optional: Pro tips for getting better results]

---
```

### Step-by-Step: Adding a Prompt

1. **Find the right location** - See [Directory Structure](#directory-structure) below
2. **Create or edit the file** - Use `kebab-case.md` for new files
3. **Follow the template** - Use the structure above
4. **Add horizontal rules** - Use `---` between prompts for readability
5. **Test it** - Make sure it works before submitting

---

## Directory Structure

Place your prompts in the appropriate category:

```
gtm-skills/
├── role/              # Prompts by job function
│   ├── sdr.md         # Sales Development Reps
│   ├── ae.md          # Account Executives
│   ├── sales-manager.md
│   ├── revops.md
│   ├── csm.md         # Customer Success
│   └── founder.md
│
├── industry/          # Industry-specific prompts
│   ├── saas.md
│   ├── fintech.md
│   ├── healthcare.md
│   └── [industry].md
│
├── workflow/          # End-to-end workflows
│   ├── cold-to-close.md
│   ├── discovery.md
│   ├── demo-proposal.md
│   └── [workflow].md
│
├── methodology/       # Sales methodology prompts
│   ├── meddpicc.md
│   ├── spin.md
│   ├── challenger.md
│   └── [methodology].md
│
├── outreach/          # Cold outreach prompts
├── discovery/         # Discovery call prompts
├── objections/        # Objection handling
├── competitive/       # Competitive intel
├── proposals/         # Proposal & pricing
├── follow-up/         # Follow-up sequences
├── linkedin/          # LinkedIn-specific
├── meeting-prep/      # Meeting preparation
│
└── projects/          # Complete AI agent prompts
    └── [project].md   # Full workflow projects
```

**Not sure where something belongs?** Default to the role or workflow it's most relevant to. We can always reorganize during review.

---

## Style Guide

### Formatting Standards

| Element | Convention | Example |
|---------|------------|---------|
| File names | `kebab-case.md` | `cold-email-opener.md` |
| Directories | `kebab-case` | `cold-outreach/` |
| Variables | `{{snake_case}}` | `{{company_name}}` |
| Headers | Title Case | `## Discovery Questions` |
| Lists | Sentence case | `- First item here` |

### Markdown Best Practices

```markdown
# Use proper heading hierarchy
## Don't skip levels
### Like this

# Prompts go in code blocks
```
Your prompt here
```

# Use tables for structured info
| Column | Column |
|--------|--------|
| Data   | Data   |

# Separate prompts with horizontal rules
---
```

### Writing Tone

- **Professional but accessible** - Write for practitioners, not academics
- **Practical over theoretical** - Focus on what works, not what should work
- **Specific over generic** - "Write a 3-sentence email" not "Write an email"
- **Actionable over advisory** - Give people something they can use immediately

### Prompt Writing Best Practices

1. **Set the stage** - "You are an expert SDR who specializes in..."
2. **Be explicit about output** - Specify format, length, tone, structure
3. **Include constraints** - Word limits, things to avoid, required elements
4. **Use numbered lists** - For multi-part outputs, number what you want
5. **Provide context fields** - Create clear sections for user input

**Good example:**
```
Write a cold email under 75 words that:
1. Opens with a specific observation about their business
2. Connects to a problem we solve
3. Ends with a soft CTA (no meeting ask)

Tone: Conversational, peer-to-peer
Avoid: Generic compliments, "I hope this finds you well"
```

**Avoid:**
```
Write a good cold email that will get a response.
```

---

## Testing Requirements

All prompts must be tested before submission.

### Required Testing

- [ ] Test with at least one major LLM (Claude, ChatGPT, or Gemini)
- [ ] Verify the output is useful and matches the intended use case
- [ ] Check that variables work when replaced with real values
- [ ] Confirm formatting renders correctly in markdown

### Testing Tips

1. **Test with different inputs** - Try various company types, roles, industries
2. **Check edge cases** - What happens with minimal or unusual inputs?
3. **Verify output quality** - Is the result actually usable, or does it need heavy editing?
4. **Note which LLMs work best** - Some prompts work better on certain models

### What to Include in Your PR

- Which LLM(s) you tested with
- Brief notes on output quality
- Any tips for getting better results

---

## Pull Request Process

### Before You Start

1. **Search existing content** - Make sure your prompt isn't already covered
2. **Check open issues/PRs** - Someone might already be working on it
3. **Review the style guide** - Consistency helps everyone

### Creating Your PR

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/gtm-skills.git
   cd gtm-skills
   ```

2. **Create a branch**
   ```bash
   git checkout -b add-prompt-[brief-description]
   ```

3. **Make your changes**
   - Add or edit files following the style guide
   - Test your prompts

4. **Commit with a clear message**
   ```bash
   git commit -m "Add: cold email prompts for fintech CFOs"
   ```

5. **Push to your fork**
   ```bash
   git push origin add-prompt-[brief-description]
   ```

6. **Open a Pull Request**
   - Fill out the PR template completely
   - Link any related issues

### Commit Message Format

| Type | Use For | Example |
|------|---------|---------|
| `Add:` | New prompts or content | `Add: MEDDPICC discovery questions` |
| `Fix:` | Bug fixes, typos | `Fix: typo in SDR cold call script` |
| `Update:` | Improvements to existing | `Update: expand competitive displacement prompts` |
| `Docs:` | Documentation changes | `Docs: clarify variable naming convention` |
| `Refactor:` | Reorganization | `Refactor: move email templates to outreach/` |

### Review Process

1. **Initial review** - A maintainer will review within 48 hours
2. **Feedback** - We may request changes or ask questions
3. **Approval** - Once approved, we'll merge your contribution
4. **Recognition** - You'll be added to our contributors list!

### Common Reasons for Requested Changes

- Formatting doesn't match style guide
- Prompt not tested or not working well
- Duplicate of existing content
- Placed in wrong directory
- Missing variables or unclear instructions

Don't worry - we'll help you get it right!

---

## Recognition

### Contributors

All contributors are recognized in our README and on [gtm-skills.com](https://gtm-skills.com).

### Top Contributor Benefits

Active contributors may receive:
- Early access to new Prospeda features
- Co-authorship credit on GTM Skills content
- Invitation to contributor community
- Speaking opportunities at sales/AI events
- Direct line to the Prospeda team

---

## Getting Help

### Questions About Contributing

- Open a [GitHub Discussion](https://github.com/gtm-skills/gtm/discussions)
- Email: hello@gtm-skills.com
- Twitter: [@prospaboricua](https://twitter.com/prospaboricua)

### Found a Problem With This Guide?

Open an issue or PR to improve this CONTRIBUTING.md!

---

## Quick Reference

### Checklist for New Prompts

- [ ] Tested with at least one LLM
- [ ] Follows the prompt template structure
- [ ] Uses `{{snake_case}}` for variables
- [ ] Placed in correct directory
- [ ] File uses `kebab-case.md` naming
- [ ] Includes use case and role
- [ ] Has example output (recommended)

### Checklist for Bug Fixes

- [ ] Verified the fix works
- [ ] Didn't break anything else
- [ ] Updated any related content

### Checklist for PRs

- [ ] Branch name follows convention
- [ ] Commit message is clear
- [ ] PR template is filled out
- [ ] All tests/checks pass

---

## Thank You!

Every contribution makes GTM Skills more valuable for sales teams around the world. Whether it's a single typo fix or a comprehensive new category, your effort is appreciated.

**Questions? Ideas? Just want to say hi?**

Reach out at hello@gtm-skills.com

---

<p align="center">
  <b>Built by the community, for the community</b>
  <br>
  Maintained by <a href="https://prospeda.com">Prospeda</a>
</p>
