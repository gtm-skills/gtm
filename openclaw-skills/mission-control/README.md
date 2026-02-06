# Mission Control

Launch and coordinate multiple AI agents working in parallel. Based on the [Mission Control architecture](https://x.com/pbteja1998/status/2017662163540971756).

## The Idea

Instead of one AI assistant, run a **team** of specialized agents that work together:

- Each agent has their own personality (SOUL)
- Agents run in parallel, not sequentially
- Tasks coordinate work between agents
- Results get synthesized into deliverables

## Predefined Teams

### GTM Team
| Agent | Role |
|-------|------|
| Scout | Research & intelligence |
| Rep | Outreach & engagement |
| Closer | Deals & proposals |

### Content Team
| Agent | Role |
|-------|------|
| Researcher | Deep research, sources |
| Writer | First drafts, structure |
| Editor | Polish, cut, strengthen |

### Dev Team
| Agent | Role |
|-------|------|
| Architect | Design, planning |
| Builder | Implementation |
| Reviewer | QA, security |

### Product Team
| Agent | Role |
|-------|------|
| Analyst | User research, requirements |
| Designer | UX, mockups, copy |
| Engineer | Technical feasibility |

## Usage

### Claude Code
```bash
# Install the skill
cp SKILL.md ~/.claude/commands/mission-control.md

# Use it
/mission-control
```

### Example
```
You: /mission-control

Mission Control: What would you like to do?
1. Launch Team - GTM, Content, Dev, or Product
2. Custom Squad - Define your own agents
3. Status - Check current tasks
4. Assign - Create task for specific agents

You: Launch the content team to write a blog post about AI agents

Mission Control: Launching 3 agents in parallel...
- Researcher: Gathering facts and examples
- Writer: Drafting the post
- Editor: Standing by to polish

[Agents work in parallel, return results]

Mission Control: Here's your blog post...
```

## How It Works

1. **Master Task** - Creates a parent task for the objective
2. **Agent Tasks** - Each agent gets a subtask with their SOUL + instructions
3. **Parallel Launch** - All agents spawn simultaneously via Task tool
4. **Synthesis** - Results combined into final deliverable

## Agent SOULs

Each agent has a SOUL that defines:
- **Personality** - How they think and communicate
- **Expertise** - What they're good at
- **Work style** - Rules for how they operate

See `SKILL.md` for full SOUL templates.

## Best Practices

1. **Start with 2-3 agents** - Don't over-orchestrate
2. **Clear objectives** - Each agent needs to know what success looks like
3. **Let agents surprise you** - They'll find angles you didn't consider
4. **Stagger if needed** - For dependent work, launch in phases

---

*Based on the Mission Control system by [@pbteja1998](https://x.com/pbteja1998)*
