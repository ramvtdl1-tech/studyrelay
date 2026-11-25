import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, getToken } from 'firebase/app-check';
import { getAI, getGenerativeModel, GoogleAIBackend, InferenceMode } from 'firebase/ai';
const env = import.meta.env;
export const configured = ['VITE_FIREBASE_API_KEY','VITE_FIREBASE_AUTH_DOMAIN','VITE_FIREBASE_PROJECT_ID','VITE_FIREBASE_APP_ID','VITE_RECAPTCHA_SITE_KEY'].every(k => Boolean(env[k]));
const textOnlyOptions={expectedInputs:[{type:'text',languages:['en']}],expectedOutputs:[{type:'text',languages:['en']}]};
let ai;
let appCheck;
export function createModel(mode) {
 if (!configured) throw new Error('Firebase is not configured yet. Follow README.md to connect your project and App Check.');
 if (!ai) {
  const app = initializeApp({apiKey:env.VITE_FIREBASE_API_KEY,authDomain:env.VITE_FIREBASE_AUTH_DOMAIN,projectId:env.VITE_FIREBASE_PROJECT_ID,appId:env.VITE_FIREBASE_APP_ID});
  appCheck = initializeAppCheck(app,{provider:new ReCaptchaEnterpriseProvider(env.VITE_RECAPTCHA_SITE_KEY),isTokenAutoRefreshEnabled:true});
  ai = getAI(app,{backend:new GoogleAIBackend()});
 }
 return getGenerativeModel(ai,{mode:mode==='local'?InferenceMode.ONLY_ON_DEVICE:mode==='cloud'?InferenceMode.ONLY_IN_CLOUD:InferenceMode.PREFER_ON_DEVICE,onDeviceParams:{createOptions:textOnlyOptions}});
}

export async function verifyCloudAccess() { await getToken(appCheck, false); }

export async function checkLocalModel() {
 const api=globalThis.LanguageModel;
 if(!api?.availability) return 'Local model unavailable: this Chrome profile does not expose the Prompt API. Check Chrome support and enable the required Prompt API flag, then relaunch.';
 let timer;
 try {
  const status=await Promise.race([api.availability(textOnlyOptions),new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('Chrome did not finish its local availability check within 20 seconds.')),20000);})]);
  const messages={available:'Local model ready. Choose On this device only and create a session.',downloadable:'Local model needs a download. Choose On this device only and create a session to start it.',downloading:'Local model is downloading. Keep Chrome open and retry after the download finishes.',unavailable:'Local model unavailable on this Chrome profile or device. Check browser version, supported hardware, storage and Prompt API setup.'};
  return messages[status] || `Chrome reported local model status: ${status}`;
 } finally {clearTimeout(timer);}
}
