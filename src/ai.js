import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, getToken } from 'firebase/app-check';
import { getAI, getGenerativeModel, GoogleAIBackend, InferenceMode } from 'firebase/ai';
const env = import.meta.env;
export const configured = ['VITE_FIREBASE_API_KEY','VITE_FIREBASE_AUTH_DOMAIN','VITE_FIREBASE_PROJECT_ID','VITE_FIREBASE_APP_ID','VITE_RECAPTCHA_SITE_KEY'].every(k => Boolean(env[k]));
let ai;
let appCheck;
export function createModel(localOnly) {
 if (!configured) throw new Error('Firebase is not configured yet. Follow README.md to connect your project and App Check.');
 if (!ai) {
  const app = initializeApp({apiKey:env.VITE_FIREBASE_API_KEY,authDomain:env.VITE_FIREBASE_AUTH_DOMAIN,projectId:env.VITE_FIREBASE_PROJECT_ID,appId:env.VITE_FIREBASE_APP_ID});
  appCheck = initializeAppCheck(app,{provider:new ReCaptchaEnterpriseProvider(env.VITE_RECAPTCHA_SITE_KEY),isTokenAutoRefreshEnabled:true});
  ai = getAI(app,{backend:new GoogleAIBackend()});
 }
 return getGenerativeModel(ai,{mode:localOnly?InferenceMode.ONLY_ON_DEVICE:InferenceMode.PREFER_ON_DEVICE});
}

export async function verifyCloudAccess() { await getToken(appCheck, false); }
