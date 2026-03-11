# Bluweave — B2B Analytics Dashboard SaaS

> Marketing and demo site for a service that builds custom analytics dashboards for businesses.

**Live:** [dashboard-business-five.vercel.app](https://dashboard-business-five.vercel.app)

---

## What it does

Bluweave lets prospective clients explore live demo dashboards, upload their own CSV/Excel data for instant AI analysis, and book a custom dashboard consultation via an AI chat assistant. The chat qualifies leads through a structured conversation funnel before capturing contact details.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS, Framer Motion |
| Charts | Plotly.js via react-plotly.js |
| AI/LLM | Groq API (`llama-3.1-8b-instant`), Ollama (local fallback) |
| File parsing | PapaParse (CSV), xlsx (Excel) |
| Email | Resend |
| Deployment | Vercel |

## Architecture

```
src/
├── app/
│   ├── page.js                 # Landing page
│   ├── chat/page.js            # AI consultation flow
│   ├── demos/                  # 4 live demo dashboards
│   └── api/
│       ├── chat/               # LLM route (Groq → Ollama fallback)
│       ├── analyze-file/       # CSV/Excel upload + analysis
│       └── submit-inquiry/     # Lead capture + Resend email
├── components/
│   ├── dashboards/             # Finance, Marketing, Operations, Retail
│   ├── charts/                 # Plotly wrappers
│   ├── chat/                   # Chat UI + file upload + contact form
│   └── landing/                # Hero, ValueProps, DemoShowcase, CTA
└── lib/
    ├── llm-service.js          # Groq/Ollama abstraction
    └── file-analyzer.js        # Data analysis helpers
```

### AI Chat Funnel

The `/api/chat` route drives a **stage-based lead qualification flow**:

```
introduction → data_discovery → data_offer → file_upload → file_analysis → recommendation → lead_capture
```

Each stage has a defined system prompt and transition logic. The LLM is stateless per request — conversation history and current stage are passed from the client on each turn.

## Demo Dashboards

Four fully interactive dashboards built with Plotly.js, each with realistic sample data:

- **Finance** — Revenue, expenses, P&L trends
- **Marketing** — Campaign performance, funnel metrics
- **Operations** — KPIs, throughput, efficiency
- **Retail** — Sales by category, inventory, regional breakdown

## Running Locally

```bash
npm install
cp .env.example .env.local   # add GROQ_API_KEY and RESEND_API_KEY
npm run dev
```

Requires a [Groq API key](https://console.groq.com). Ollama with `llama3.1:8b` pulled locally will be used as fallback if Groq is unavailable.
