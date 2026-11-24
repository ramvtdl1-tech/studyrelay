# Devpost draft

Title: StudyRelay — your notes, your pace

Category: Web/Chrome

App: https://studyrelay-d2f25.web.app
Repository: https://github.com/ramvtdl1-tech/studyrelay
Video: pending

## Inspiration
Students with unreliable Wi-Fi need useful revision tools without depending on a cloud request for every session.

## What it does
Transforms pasted or imported text notes into revision guides, practice quizzes, and flashcards in English or Hindi. Sessions can be downloaded. No payment or account is required.

## How it is built
Vite and Firebase AI Logic use ONLY_ON_DEVICE by default and PREFER_ON_DEVICE when the user permits cloud fallback; ONLY_IN_CLOUD is also available. Production App Check uses domain-restricted reCAPTCHA Enterprise attestation. A response badge reports the actual SDK inference source. No database or analytics is used. See README for limitations and Codex/third-party disclosures.

## Three-minute demo plan
0:00–0:25: Explain the unreliable-connectivity student problem.
0:25–1:05: Load notes, run a real local guide, show the SDK source badge.
1:05–1:35: Create a quiz and export a session.
1:35–2:15: Demonstrate real cloud fallback with permission on a browser without local support.
2:15–2:45: Explain App Check and English/Hindi output.
2:45–3:00: Show public source and app links.

Complete live QA before recording. Do not present sample source notes as generated output or claim a model path passed without evidence.

## Remaining entry steps
- Complete and record the local device test. Direct cloud and hybrid cloud fallback tests passed.
- Record a functioning demo, at most three minutes, public on YouTube, in English or with English subtitles.
- Verify public source contains MIT license, full source and setup instructions.
- Add eligible team members and disclose AI assistance/prior work accurately.
- Keep judging access free through December 16, 2026.
- Submit before November 30, 2026 2 PM PST / December 1, 2026 3:30 AM IST.

Rules: https://firebasehybridaihackathon.devpost.com/rules
