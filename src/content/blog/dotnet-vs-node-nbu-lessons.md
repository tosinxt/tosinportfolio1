---
title: ".NET Core vs Node.js: What NBU's School Management System Taught Me About Choosing Stacks"
subtitle: "The right answer wasn't the stack I personally love. That's the whole lesson."
description: "Building the Nigerian British University school management system meant choosing .NET Core over my Node.js instincts — a decision about the client's world, not my preferences."
date: "2026-06-12"
slug: "dotnet-vs-node-nbu-lessons"
tags: [".NET Core", "Node.js", "Engineering", "Education"]
related: [doyen-academy-building-for-teachers, p2pdex-pdf-pipeline, manor-restaurant-unsexy-pos-systems]
faqs:
  - q: "What tech stack did Oluwatosin Alli use for the NBU school management system?"
    a: "He built it in .NET Core rather than his preferred Node.js stack, matching Nigerian British University's existing institutional infrastructure so their own IT staff could maintain it long-term."
  - q: "How should engineers choose between competing tech stacks?"
    a: "Base the decision on who maintains the system after launch and what they already know, not on the engineer's personal stack preference."
---

Ask any full-stack engineer their favorite stack and you'll usually hear their comfort zone dressed up as an objective opinion. Mine is Node.js and TypeScript — it's where I think fastest. So when **Nigerian British University** needed a school management system and the existing institutional infrastructure was already heavily invested in the .NET ecosystem, I had a choice: build in what I love, or build in what actually serves the client for the next ten years.

I chose .NET Core. It was the right call, and it was uncomfortable for about three weeks.

## Why the "wrong for me" stack was right for them

NBU's IT staff, the people who'd maintain this system long after my contract ended, already knew C# and the .NET tooling. Their existing infrastructure — auth systems, reporting tools, internal integrations — spoke .NET fluently. Shipping a beautiful Node.js system that nobody on their team could confidently maintain would have been a gift with a expiration date. Good architecture isn't just "what's technically elegant," it's "what survives contact with the humans who inherit it."

## What actually surprised me

.NET Core in 2026 is a genuinely strong platform — the performance characteristics for a system handling student records, grading workflows, and attendance across an entire institution were excellent, and the typed, structured nature of C# scratched a similar itch to TypeScript's discipline, just with different syntax and a more opinionated framework underneath it.

## The bigger principle

Every stack decision I make now starts with a question that isn't about the technology at all: who maintains this when I'm gone, and what do they already know? I learned that lesson properly on this project, not from a conference talk. The best engineers I know aren't loyal to a stack. They're loyal to whoever has to live with their decisions after they leave the room.
