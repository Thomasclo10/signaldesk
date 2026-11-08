# Contributing to SignalDesk

SignalDesk is built in public. Small, focused pull requests are welcome — especially improvements that make research more legible, decisions more traceable or the interface more accessible.

## Development loop

1. Fork the repository and create a branch with a focused name.
2. Install dependencies with `pnpm install`.
3. Run `pnpm dev` while iterating and `pnpm check` before opening a pull request.
4. Keep product copy and interface labels specific; avoid generic dashboard language.
5. Explain the user problem, the chosen trade-off and how the change was checked.

## Contribution areas

- **Product:** case-file workflows, research rituals, evidence graph patterns and decision support.
- **Frontend:** React, TypeScript, responsive layout, keyboard navigation and accessible states.
- **Data:** Drizzle schema design, migrations, workspace ownership and source indexing.
- **Docs:** onboarding, self-hosting, architecture notes and examples.

Please do not include credentials, private research files or real personal data in commits. Use the demo entities for screenshots and fixtures. Keep migrations additive and explain any change that affects stored data.
