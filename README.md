# StudyRelay

[Open the live app](https://studyrelay-d2f25.web.app)

Turn lecture notes into revision guides, practice quizzes, and flashcards in English or Hindi. Built for the Web/Chrome category of #BuildHybridAI 2026.

## Why hybrid AI?

Students with unreliable connectivity should be able to revise without sending every session to a server. StudyRelay defaults to local-only inference. Choose hybrid mode to explicitly permit Firebase AI Logic to fall back to Gemini in the cloud, or Gemini cloud to run remotely. The response badge reports the SDK's actual inference source when available.

## Run and deploy

Node 22.12+ required (Node 24 recommended).

```
npm ci
cp .env.example .env.local
npm run dev
npm test
npm run build
npx firebase-tools login
npx firebase-tools deploy --only hosting --project YOUR_PROJECT_ID
```

Fill `.env.local` with your Firebase Web app configuration and a production reCAPTCHA Enterprise site key. Firebase Web configuration is browser configuration, not a Gemini API key. Never include service-account credentials or Gemini secrets. The UI opens without configuration; generation requires a configured project.

1. Create/register a Firebase Web app and enable AI Logic with Gemini Developer API.
2. Register a score-based reCAPTCHA Enterprise key for your actual production domains. Keep domain verification enabled. This app uses `ReCaptchaEnterpriseProvider`, not the older v3 provider. Avoid adding localhost to a production key.
3. Register that site key with Firebase App Check for your Web app. Keep App Check enforcement enabled for Firebase AI Logic. The App Check service identifier is `firebaseml.googleapis.com`.
4. Add the configuration to `.env.local`, build, and deploy Hosting. Vite configuration is embedded at build time; rebuild after changing it. A different hostname must be added to the reCAPTCHA domain list before use.
5. For local inference, use supported desktop Chrome (139+ per Firebase docs), enable the Prompt API flag if required, and prepare/download the local model. The Create button initializes the model under user activation. Hardware/model support varies.

The deployed project uses Firebase's Spark plan. No billing account was attached. Review current model availability and quotas before changing cloud models. No paid models are required by this source.

## Architecture and privacy

Browser UI → source-grounded prompt → Firebase AI Logic SDK → Chrome local model or Gemini cloud fallback. `src/ai.js` initializes Firebase and App Check; `src/main.js` calls `initializeDeviceModel()` and `generateContent()` at runtime. The SDK default supported cloud model is retained.

Notes and generated sessions remain in page memory; refresh clears them. A session can be downloaded as text. No account, database, analytics or note persistence is used. reCAPTCHA/App Check contacts Google for attestation. Cloud-permitted sessions may send the notes to Gemini. Generated answers may be inaccurate and should be checked against course materials.

Offline inference requires already-loaded app resources and a prepared local model. Offline page reload/PWA support is not implemented. Requests can be canceled. Initial local model preparation allows up to 15 minutes, followed by a three-minute generation timeout; canceling a local model download may not stop the browser's background download.

## Verification and submission

See [build status](docs/BUILD-STATUS.md), [live QA](docs/QA.md), and [submission draft](docs/SUBMISSION.md). Build success does not establish that either inference path works on a specific device. Real direct cloud generation, hybrid fallback to cloud, Hindi quiz generation and export passed on the hosted app. Local-only generation remains unverified on the test device.

## Disclosure and license

New code created November 25, 2026 with Codex assistance. Firebase and Vite are third-party dependencies. DM Sans/Manrope are loaded through Google Fonts. Study notes were authored for this project. An npm override updates a vulnerable transitive gRPC dependency; installation audit reported zero vulnerabilities at build time. Original project code is MIT licensed. No unrelated existing application code was intentionally reused.

References: [Firebase hybrid guide](https://firebase.google.com/docs/ai-logic/hybrid/web/get-started), [App Check guide](https://firebase.google.com/docs/app-check/web/recaptcha-enterprise-provider), [official rules](https://firebasehybridaihackathon.devpost.com/rules).

Use **Check local model readiness** to see whether Chrome reports ready, downloadable, downloading, or unavailable. Local configuration requests text-only English input/output capability; Hindi output has been verified in cloud mode only.
