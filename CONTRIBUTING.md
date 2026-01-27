# Contributing to GTM Skills

First off, thank you for considering contributing to GTM Skills! It's people like you that make this the best GTM prompt library on the internet.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Submitting Prompts](#submitting-prompts)
- [Style Guide](#style-guide)
- [Pull Request Process](#pull-request-process)

---

## Code of Conduct

This project and everyone participating in it is governed by our commitment to creating a welcoming, inclusive environment. Be respectful, constructive, and helpful.

---

## How Can I Contribute?

### 🎯 Submit New Prompts
The most valuable contribution! Share prompts that have worked for you in real sales situations.

### 🐛 Report Issues
Found a typo? Broken link? Outdated information? [Open an issue](https://github.com/Prospeda/gtm-skills/issues/new).

### 💡 Suggest Improvements
Have ideas for new categories, better organization, or missing use cases? We want to hear them.

### 📝 Improve Documentation
Help make the repo more accessible with better docs, examples, or translations.

### ⭐ Star the Repo
The simplest contribution - helps others discover GTM Skills.

---

## Submitting Prompts

### What Makes a Good Prompt?

**Include:**
- Clear context setting (role, situation, constraints)
- Specific instructions (not vague asks)
- Expected output format
- Placeholder variables in `{{brackets}}`

**Avoid:**
- Generic prompts that work for any use case
- Prompts that require proprietary data to function
- Copy-pasted content from other sources without attribution

### Prompt Template

```markdown
## [Prompt Name]

**Use Case:** [When to use this prompt]
**Role:** [SDR/AE/Manager/RevOps/CSM/Founder]
**Difficulty:** [Beginner/Intermediate/Advanced]

### Prompt

\`\`\`
[Your prompt here with {{variables}} for customization]
\`\`\`

### Variables
- `{{variable_1}}`: Description of what to put here
- `{{variable_2}}`: Description of what to put here

### Example Output
[Optional: Show what good output looks like]

### Tips
[Optional: Pro tips for getting better results]
```

### Where to Add Prompts

| Prompt Type | Directory |
|-------------|-----------|
| Role-specific | `/role/[role-name]/` |
| Industry-specific | `/industry/[industry-name]/` |
| Workflow | `/workflow/[workflow-name]/` |
| Methodology | `/methodology/[methodology-name]/` |
| Email templates | `/templates/emails/` |
| LinkedIn content | `/templates/linkedin/` |

---

## Style Guide

### Formatting
- Use Markdown for all content
- Use code blocks (```) for prompts
- Use tables for structured comparisons
- Use headers to organize content logically

### Naming Conventions
- File names: `kebab-case.md` (e.g., `cold-email-opener.md`)
- Directories: `kebab-case` (e.g., `cold-outreach`)
- Variables: `{{snake_case}}` (e.g., `{{company_name}}`)

### Tone
- Professional but accessible
- Practical over theoretical
- Specific over generic
- Actionable over advisory

### Prompt Writing Best Practices
1. **Be specific** - "Write a 3-sentence email" not "Write an email"
2. **Set context** - Tell the AI who it is and what situation it's in
3. **Define output** - Specify format, length, tone
4. **Use variables** - Make prompts reusable with `{{placeholders}}`
5. **Test first** - Only submit prompts you've actually used successfully

---

## Pull Request Process

### Before Submitting

1. **Search existing content** - Make sure your prompt isn't already covered
2. **Test your prompt** - Verify it works with Claude, ChatGPT, or your preferred LLM
3. **Follow the style guide** - Consistent formatting helps everyone
4. **Place in correct directory** - Check the directory structure in README

### Submitting Your PR

1. Fork the repository
2. Create a branch: `git checkout -b add-prompt-[description]`
3. Make your changes
4. Commit with a clear message: `git commit -m "Add: cold email for fintech CFOs"`
5. Push to your fork: `git push origin add-prompt-[description]`
6. Open a Pull Request

### PR Title Format
- `Add: [description]` - New prompts or content
- `Fix: [description]` - Bug fixes, typos, corrections
- `Update: [description]` - Improvements to existing content
- `Docs: [description]` - Documentation changes

### What Happens Next

1. A maintainer will review your PR within 48 hours
2. We may request changes or clarifications
3. Once approved, your contribution will be merged
4. You'll be added to our contributors list!

---

## Recognition

All contributors are recognized in our README and on [gtm-skills.com](https://gtm-skills.com).

Top contributors may be invited to:
- Early access to new Prospeda features
- Co-authorship on GTM Skills content
- Speaking opportunities at sales/AI events

---

## Questions?

- 📧 Email: hello@gtm-skills.com
- 🐦 Twitter: [@prospaboricua](https://twitter.com/prospaboricua)
- 💬 [Open a Discussion](https://github.com/Prospeda/gtm-skills/discussions)

---

Thank you for helping make GTM Skills the best resource for AI-powered sales teams! 🚀
