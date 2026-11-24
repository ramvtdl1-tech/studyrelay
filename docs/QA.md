# Live QA

- [x] Production build and automated input-validation tests pass.
- [x] App Check production provider registered with domain verification.
- [x] AI Logic App Check enforcement is ENFORCED.
- [x] Firebase Hosting deployment succeeds; UI loads with Firebase configured.
- [ ] Complete a real local guide on supported desktop Chrome and confirm `on_device` metadata.
- [x] Real hybrid request fell back to cloud and returned `in_cloud` metadata in the in-app browser.
- [x] Direct cloud mode returned a revision guide with `in_cloud` metadata.
- [x] Hindi five-question quiz with answers generated.
- [ ] Verify flashcards with live models.
- [x] Generated Hindi session downloaded as text. Narrow in-app layout visually inspected.
- [ ] Test cancel, timeout and text import.
- [x] Missing App Check token rejected with HTTP 401; valid production attestation acquired by the app.
- [ ] Test offline generation after app/model preparation. A fresh offline reload is not supported.
- [ ] Capture device/browser/version and screenshots of successful model responses.

Do not mark an inference path as passed from policy selection alone. Initial Chrome local requests stayed pending. The browser security policy prevents inspection of chrome:// flags. The user must prepare a supported on-device environment for the local demo; no local-success claim has been made.
