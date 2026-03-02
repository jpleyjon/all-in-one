# Security Policy

## Supported Versions

This project currently supports security fixes for the latest stable major version only.

| Version | Supported |
| --- | --- |
| `1.x` | Yes |
| `<1.0` | No |

## Reporting a Vulnerability

Please do **not** open public issues for security vulnerabilities.

Use one of these private channels:

1. GitHub Security Advisories: use the repository's **Report a vulnerability** flow.
2. If private reporting is not available, open a minimal issue requesting a secure contact channel **without** technical details.

## What To Include In A Report

- A clear description of the issue and impact.
- Affected versions and environments.
- Reproduction steps or proof-of-concept.
- Any proposed mitigation or patch idea.

## Response Targets

- Initial acknowledgment: within 3 business days.
- Triage and severity assessment: within 7 business days.
- Fix timeline:
  - Critical: as soon as possible.
  - High/Medium/Low: prioritized by risk and release cadence.

## Disclosure Policy

- Vulnerabilities are handled privately until a fix is available.
- A security note is published with the fix release.
- Reporters are credited unless they request anonymity.

## Security Best Practices For Contributors

- Keep utilities pure and deterministic unless side effects are explicit and documented.
- Validate inputs and fail with explicit error types/messages.
- Avoid dangerous dynamic execution (`eval`, `new Function`, shell execution from library code).
- Avoid introducing runtime dependencies without maintainer approval.
- Preserve immutability expectations in transformations.
- Add/maintain tests for security-relevant behavior and edge cases.
- Run local checks before opening a PR:
  - `./bin/format-check`
  - `./bin/lint`
  - `./bin/test`
- Prefer Docker-based commands in this repository so contributors only need Docker installed.

## Maintainer Release Hygiene

- Publish from a clean, reviewed branch.
- Ensure lint, tests, and build pass before release.
- Keep npm account protections enabled (2FA recommended).
- Rotate/revoke tokens immediately if compromise is suspected.
