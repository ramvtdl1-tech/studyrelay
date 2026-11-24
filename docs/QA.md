# Live QA

- [x] Production build and automated input-validation tests pass.
- [x] App Check production provider registered with domain verification.
- [x] AI Logic App Check enforcement is ENFORCED.
- [x] Firebase Hosting deployment succeeds; UI loads with Firebase configured.
- [ ] Complete a real local guide on supported desktop Chrome and confirm `on_device` metadata.
- [ ] Complete a real cloud fallback request on a browser without local support and confirm `in_cloud` metadata.
- [ ] Verify Hindi output, quizzes and flashcards with live models.
- [ ] Test cancel, timeout, text import, export and narrow viewport.
- [ ] Verify missing/invalid App Check attestation is rejected.
- [ ] Test offline generation after app/model preparation. A fresh offline reload is not supported.
- [ ] Capture device/browser/version and screenshots of successful model responses.

Do not mark an inference path as passed from policy selection alone. Initial Chrome requests stayed pending. Continue diagnosis using the explicit App Check stage and request timeout before recording the final demo.
