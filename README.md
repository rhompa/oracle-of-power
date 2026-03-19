# Oracle of Power

A Hercules-themed mythological advisor powered by Claude AI that channels the complete wisdom of the 48 Laws of Power.

## Features

- **The Oracle** — Ask any question and receive strategic counsel from an immortal advisor
- **48 Laws Browser** — Browse all laws by category with search and deep-dive links
- **War Room** — Scenario simulator for tactical strategy analysis
- **Daily Law** — Rotating law of the day with related law pairings
- **Sacred Scrolls** — Save and bookmark wisdom for future reference

## Setup

1. Clone the repo
2. `npm install`
3. Copy `.env.example` to `.env.local` and add your Anthropic API key
4. `npm run dev`

## Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add `ANTHROPIC_API_KEY` as an environment variable
4. Deploy

## Tech Stack

- Next.js 14 (App Router)
- Claude Sonnet 4 (via Anthropic API)
- Custom Hercules-inspired design system
