# fd-llm

## Purpose

A collection of Tools, Agents and Skills for agentic code generation. This repo is focussed on the OpenCode agent, Agents and Skilla are comaptible with Claude Code and Copilot CLI. Tools are not.

## OpenCode Referrences

- **custom tools**: https://opencode.ai/docs/custom-tools
- **agents**: https://opencode.ai/docs/agents
- **skills**: https://opencode.ai/docs/skills

## Repo Layout

Skills, tools and agents are organised into common usecases, with skills and tool adjacents to the agents that use them in the following structure:

```
Repository root    
│
└───use case 
│   └───agent
│       │   AGENT.md
│   └───skill
│       │   SKILL.md
│   └───tool
│       │   tool_file.ts
│       │   ...

```
   
