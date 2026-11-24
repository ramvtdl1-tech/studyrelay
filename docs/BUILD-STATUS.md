# Build status — November 25, 2026

- Production build and three input-validation tests passed.
- Locked dependency install reported zero vulnerabilities.
- Firebase project `studyrelay-d2f25` and Web app created on Spark (no-cost) plan.
- Gemini Developer API and Firebase AI Logic enabled.
- Production reCAPTCHA Enterprise provider registered, restricted to the two Firebase Hosting domains.
- App Check enforcement for Firebase AI Logic confirmed ENFORCED by management API.
- Hosting deployment succeeded: https://studyrelay-d2f25.web.app
- Hosted UI loaded and sample notes populated in Chrome.
- Real direct cloud revision guide succeeded with `in_cloud` SDK metadata.
- Real hybrid request returned a five-question Hindi quiz with `in_cloud` SDK metadata, verifying cloud fallback.
- Production App Check token acquisition passed; a separate request without attestation was rejected with HTTP 401 (invalid App Check token).
- Generated Hindi session exported as a text file.
- Local-only model preparation stayed pending on desktop Chrome; this device path is unverified. Browser security policy disallowed inspecting chrome:// settings.
- Cancellation verified during local preparation; three-minute timeout added; direct cloud mode allows bypassing slow local preparation.
- Public MIT source published: https://github.com/ramvtdl1-tech/studyrelay
- YouTube video and Devpost entry have not been submitted.

Some workspace sources were offloaded by Google Drive. A local build was restored, preserving original offloaded files under ignored `.recovery/` in the workspace. Never publish `.recovery`, environment files, credentials or debug logs.
