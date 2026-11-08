# SignalDesk

> Make the next call with the evidence in view.

SignalDesk is an open-source analyst workspace for turning scattered sources, weak signals and competing hypotheses into a clear, defensible point of view. It is designed for the messy middle between a first signal and a final decision.

## What is in this repository?

The current release is a polished, interactive product preview with two surfaces:

- A public landing page that explains the method, workspace and open-source thesis.
- A no-login demo workspace with dashboards, case files, a signal inbox, source library, reasoning canvas, comparison matrix and decision brief.

The demo uses typed seed data so it is immediately usable without credentials or external services. Buttons and filters are intentionally wired to demonstrate the interaction model without mutating shared production data. The project is structured to connect the existing managed server, database and object storage capabilities in the next phase.

## Run locally

Requirements: Node 20+, pnpm 10.18+.

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`. The typecheck and production build are:

```bash
pnpm check
pnpm build
```

## Product surfaces

| Surface | Purpose |
| --- | --- |
| Overview | Workspace pulse, priority queue, dossier activity and evidence velocity. |
| Case files | Hypotheses, confidence, owners, timelines and linked sources. |
| Signal inbox | Qualify observations by impact and urgency, then move them forward. |
| Sources | Searchable source library with freshness and reliability metadata. |
| Analysis canvas | Evidence, counter-arguments and conclusions in one traceable view. |
| Compare | Weighted scenario matrix for structured trade-offs. |
| Decision brief | Print-ready output for the next decision conversation. |

## Architecture

The app uses React, TypeScript, Vite and the supplied Express/tRPC/Drizzle template. The frontend entry point lives in `client/src`, with reusable shell components in `client/src/components`, demo entities in `client/src/lib/demoData.ts`, and page-level surfaces in `client/src/pages`.

The managed server, database and storage capabilities are enabled for the project. Business tables and authenticated workspace mutations are deliberately left as the next implementation layer so the open preview remains safe to explore. Future entities should preserve the core graph: workspaces, case files, sources, signals, evidence links, comparisons and briefs.

## Design language

SignalDesk uses the “solar terminal” direction: ink surfaces, paper editorial pages, a chartreuse signal color, small mono labels and quiet motion. The aim is density without noise — every metric has context and every claim has a trail.

## Contributing

Read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request. Contributions are welcome across product thinking, interface craft, data modeling, accessibility and documentation.

## License

SignalDesk is released under the [MIT License](./LICENSE).
