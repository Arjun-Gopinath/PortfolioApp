# Arjun Gopinath — Developer Portfolio

**Live:** [eportfolio-arjung.vercel.app](https://eportfolio-arjung.vercel.app/)

A personal portfolio built with React and Vite. Covers my experience, skills, projects, and certifications — with a built-in AI chatbot that answers questions about me using a live LLM.

---

## Features

- **AI Chatbot** — Floating chat panel powered by OpenRouter. Visitors can ask questions about my experience, skills, and projects. Includes suggested prompt chips, clear conversation, and typing indicator.
- **Multilingual** — English, Spanish, and French via i18next with browser language detection.
- **Animated sections** — Framer Motion slide-in and fade animations throughout. Timeline layout for Experience and Education.
- **Scroll UX** — Animated scroll progress bar, scroll-to-top button, smooth animated scroll indicator on the hero.
- **Open to Work badge** — Conditionally shown via `VITE_OPEN_TO_WORK` environment variable.
- **Resume download** — Available from both the Hero and Contact sections.
- **Certifications** — Expandable accordion for Meta Front-End Developer certification courses.
- **Responsive** — Mobile-first layout, tested across breakpoints.

---

## Tech Stack

| Layer | Tools |
|-------|-------|
| UI | React 19, Tailwind CSS v4, Framer Motion |
| Routing / i18n | react-i18next, i18next-browser-languagedetector |
| Icons | react-icons |
| Markdown | react-markdown |
| API | Vercel Edge Functions, OpenRouter |
| Build | Vite 5, vite-plugin-vercel |
| Deploy | Vercel |

---

## Project Structure

```
src/
  components/
    Hero.jsx            # Landing section with CTA buttons and scroll indicator
    Skills.jsx          # Full-width category rows with skill pills
    Experience.jsx      # Timeline with slide animations and accent colours
    Education.jsx       # Timeline matching Experience design
    Certifications.jsx  # Meta cert card with expandable course accordion
    Projects.jsx        # Project cards with GitHub/live links
    Contact.jsx         # Email, LinkedIn, GitHub, and resume download
    ChatWithMe.jsx      # AI chat panel (floating, slide-in)
    TopNavbar.jsx       # Sticky nav with language switcher
    Footer.jsx          # Quick links and social icons
    ScrollProgress.jsx  # Fixed top progress bar
    ScrollToTop.jsx     # Appears after scrolling down
  hooks/
    useScrollPosition.js
  locales/
    en.json / es.json / fr.json
api/
  chat.js              # Edge Function — proxies chat to OpenRouter
  systemPrompt.js      # LLM system prompt with resume content
public/
  resume/
    arjun-gopinath-resume.pdf
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Vercel](https://vercel.com) account (for the chat API in local dev)

### Install

```bash
npm install
```

### Environment variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `VITE_OPEN_TO_WORK` | Set to `"true"` to show the Open to Work badge |
| `OPENROUTER_API_KEY` | API key from [openrouter.ai](https://openrouter.ai/) — server-side only |

### Running locally

The chat API uses a Vercel Edge Function. The standard `npm run dev` won't serve it — use `vercel dev` instead:

```bash
npm install -g vercel
vercel login
vercel link       # link to your Vercel project once
vercel dev        # runs frontend + API together
```

For everything except the chat feature, `npm run dev` works fine.

---

## Chat API

`api/chat.js` is a Vercel Edge Function that:

1. Receives `{ messages }` from the frontend
2. Prepends the system prompt from `api/systemPrompt.js`
3. Forwards to OpenRouter using the configured model
4. Returns `{ reply }` or a structured error

The system prompt in `systemPrompt.js` is the single source of truth for what the chatbot knows about me — it mirrors the resume content and should be kept in sync when the resume is updated.

**Current model:** `nvidia/nemotron-3-super-120b-a12b:free`

Free models on OpenRouter can hit rate limits under load. If you see 429 errors, swap the model ID in `api/chat.js` for another free model from [openrouter.ai/models](https://openrouter.ai/models).

---

## Deployment

The project deploys to Vercel automatically on push to `main`. Edge Functions are picked up via `vite-plugin-vercel`.

Set the following in your Vercel project's Environment Variables dashboard:

- `OPENROUTER_API_KEY`
- `VITE_OPEN_TO_WORK` (optional)

---

## License

MIT
