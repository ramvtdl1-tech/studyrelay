import './style.css';
import {sample,promptFor} from './core.js';
import {configured,createModel,verifyCloudAccess} from './ai.js';
document.querySelector('#app').innerHTML = `
<header><a class="brand" href="/">◈ StudyRelay<span>YOUR EVERYDAY STUDY COMPANION</span></a><span class="pill">Built with Firebase AI Logic</span></header>
<main><section class="intro"><div><p class="eyebrow">LESS REREADING. MORE UNDERSTANDING.</p><h1>Make it click.</h1><p class="lead">Your lecture notes, turned into a clearer next step.<br>Learn a concept. Test yourself. Keep going.</p></div><aside class="quote">Small sessions.<br>Lasting knowledge.<span>DESIGNED FOR YOUR NEXT AHA MOMENT</span></aside></section>
<div class="workspace"><section class="panel"><div class="panel-title"><h2>Your starting point</h2><button id="sample" class="text">Try sample notes</button></div><label for="notes">Paste your lecture notes</label><textarea id="notes" maxlength="16000" placeholder="Start with a topic you want to understand…"></textarea><div class="meta"><span id="count">0 / 16,000 characters</span><label class="upload">Import .txt<input id="file" type="file" accept=".txt,text/plain" hidden></label></div><div class="options"><div><label for="task">What would help?</label><select id="task"><option value="guide">Revision guide</option><option value="quiz">Practice quiz</option><option value="cards">Flashcards</option></select></div><div><label for="language">Output language</label><select id="language"><option>English</option><option>Hindi</option></select></div></div><div class="processing"><label for="mode">Where should your session run?</label><select id="mode"><option value="local">On this device only</option><option value="hybrid">Prefer this device · allow cloud fallback</option><option value="cloud">Gemini cloud</option></select><p class="footnote">Hybrid and cloud modes allow notes to reach Gemini in the cloud. Local-only requires a supported browser and prepared model.</p></div><button id="generate" class="primary">Create study session</button><button id="cancel" class="text" hidden>Cancel request</button><p id="status" role="status">${configured?'Firebase connected. Ready to start.':'Setup needed: connect Firebase and App Check to enable AI.'}</p></section>
<section class="panel result"><div class="panel-title"><h2>Your study session</h2><span id="route" class="badge">Ready when you are</span></div><div id="empty"><div class="symbol">✳</div><h3>A fresh perspective awaits.</h3><p>Add your notes and choose how you want to learn.<br>Your session will appear right here.</p><div class="steps"><span>01 &nbsp; Bring your notes</span><span>02 &nbsp; Pick your practice</span><span>03 &nbsp; Find your clarity</span></div></div><pre id="output" hidden></pre><button id="download" class="text" hidden>Download session (.txt)</button><p class="footnote">AI can make mistakes. Check explanations against your course material. Sessions are not saved by this app.</p></section></div><footer><span>Made for curious minds and imperfect Wi-Fi.</span><span>Local-first learning · Cloud when you choose</span></footer></main>`;
const $ = id => document.getElementById(id);
function count(){ $('count').textContent=`${$('notes').value.length.toLocaleString()} / 16,000 characters`; }
$('notes').addEventListener('input',count);
$('sample').onclick=()=>{$('notes').value=sample;count();$('status').textContent='Sample source notes loaded. Generate to run a real AI request.';};
$('file').onchange=async e=>{const file=e.target.files[0];if(!file)return;if(file.size>64000){$('status').textContent='Choose a text file smaller than 64 KB.';return;}try{const text=await file.text();if(text.length>16000)throw new Error('File exceeds 16,000 characters.');$('notes').value=text;count();}catch(err){$('status').textContent=err.message;}e.target.value='';};
let controller;
$('cancel').onclick=()=>controller?.abort();
$('generate').onclick=async()=>{
 let timer;
 try{
  controller=new AbortController();
  const signal=controller.signal;
  timer=setTimeout(()=>controller.abort(),180000);
  const canceled=new Promise((_,reject)=>signal.addEventListener('abort',()=>reject(new Error('Request canceled or exceeded three minutes. Retry, or allow cloud fallback if local preparation is taking too long.')),{once:true}));
  const prompt=promptFor($('notes').value,$('task').value,$('language').value);
  const mode=$('mode').value;
  const local=mode==='local';
  const model=createModel(mode);
  $('generate').disabled=true;$('cancel').hidden=false;
  for(const id of ['notes','task','language','mode','sample','file']) $(id).disabled=true;
  $('output').hidden=true;$('download').hidden=true;$('empty').hidden=false;
  $('route').textContent='Working on your session';$('status').textContent='Preparing on-device model. First download may take several minutes…';
  const ready=model.initializeDeviceModel(progress=>{if(signal.aborted)return;$('status').textContent=`Preparing local model: ${Math.round(progress*100)}%`;});
  if(local) await Promise.race([ready,canceled]); else ready.catch(()=>{});
  if(!local){$('status').textContent='Verifying app with Firebase App Check…';await Promise.race([verifyCloudAccess(),canceled]);}
  $('status').textContent=local?'Creating on-device study session…':mode==='cloud'?'Creating session in Gemini cloud…':'Creating session; cloud fallback is allowed…';
  const result=await Promise.race([model.generateContent(prompt,{signal}),canceled]);
  const text=result.response.text();if(!text.trim())throw new Error('No text returned. Try a shorter set of notes.');
  $('output').textContent=text;$('output').hidden=false;$('empty').hidden=true;$('download').hidden=false;
  $('route').textContent=result.response.inferenceSource==='on_device'?'Ran on this device':result.response.inferenceSource==='in_cloud'?'Ran in Gemini cloud':local?'On-device only':'Hybrid request';
  $('status').textContent='Session ready. Review it alongside your notes.';
 }catch(error){$('status').textContent=`Unable to create session: ${error.message} Local mode requires supported Chrome and a downloaded model. Choose hybrid or Gemini cloud mode and retry.`;}finally{clearTimeout(timer);$('generate').disabled=false;$('cancel').hidden=true;controller=null;for(const id of ['notes','task','language','mode','sample','file']) $(id).disabled=false;if($('output').hidden)$('route').textContent='Ready to retry';}
};
$('download').onclick=()=>{const url=URL.createObjectURL(new Blob([$('output').textContent],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='studyrelay-session.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
