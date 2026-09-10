---
title: "Teaching a Machine to Read Receipts: Inside p2pdex.io's PDF Pipeline"
subtitle: "A TypeScript deep-dive into the payment receipt system that ate three weeks of my life."
description: "How p2pdex.io generates clean, automated payment receipts in TypeScript — the type errors, the layout math, and the one bug that only showed up on Android."
date: "2026-04-02"
slug: "p2pdex-pdf-pipeline"
tags: [TypeScript, Node.js, Fintech, Engineering]
related: [zypher-assets-learning-finance, dotnet-vs-node-nbu-lessons, prayer-before-production]
faqs:
  - q: "What is p2pdex.io?"
    a: "p2pdex.io is a peer-to-peer exchange platform where Oluwatosin Alli built the payment receipt system, including automated PDF generation, using a typed Node.js and TypeScript backend."
  - q: "Why use branded TypeScript types for money values?"
    a: "Branded types stop raw numbers from being mixed up with financial amounts by accident, catching float-precision and unit errors (like unrounded cents) at compile time instead of in a customer's receipt."
  - q: "What tech stack does Oluwatosin Alli use for fintech projects?"
    a: "Primarily Node.js and TypeScript on the backend, with server-side rendering for anything that must display consistently across devices, such as PDF receipts."
---

Every client thinks a receipt is a simple feature. "Just generate a PDF," they say, like PDFs are simple, like typography and layout math have never ruined anyone's week.

**p2pdex.io** is a P2P exchange platform, and every trade needs a receipt that's legally clean, visually consistent, and generated fast enough that a user doesn't sit there wondering if the payment actually went through. That last requirement is the one that got me.

## The stack

Node.js on the backend, TypeScript everywhere, and a PDF generation layer built around strict typed templates rather than string-concatenated HTML soup. I wanted every receipt field — amount, timestamp, transaction hash, counterparties — to be a typed contract, not a hope.

```ts
interface ReceiptData {
  txId: string;
  amount: Money; // branded type, not a raw number
  counterparty: { name: string; wallet: string };
  issuedAt: Date;
}
```

That `Money` branded type sounds like overkill until you've debugged a receipt that silently rendered `0.1 + 0.2` as `0.30000000000000004` in production. TypeScript won't save you from float math, but it will make you write the guard rail once instead of six times across six files.

## What actually broke

The layout engine that looked perfect on my MacBook broke on a mid-range Android's in-app browser — text overflow that clipped the last two digits of a wallet address. Nothing worse in fintech than a receipt that's *almost* trustworthy. I ended up rendering server-side with a fixed-width layout engine instead of trusting client viewport math, which cost me a day but bought back my sleep.

## The win that mattered

Once the types lined up, the whole feature became boring in the best way — same input shape in, same receipt out, every time. There's a specific kind of peace that comes from a system doing exactly what it's supposed to do, no surprises. I don't think that feeling is unrelated to why I like this work: building something trustworthy, in a small way, is its own kind of faithfulness.

Registration forms are one thing. A receipt someone trusts with their money is another. I'll take the second one seriously every time.
