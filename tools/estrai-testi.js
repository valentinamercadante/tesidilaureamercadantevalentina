const fs=require('fs'),vm=require('vm');
const ctx={};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(''+require('path').join(__dirname,'..','data.js')+'','utf8')+';this.o={SPOTS,GUIDA,INTRO}',ctx);
const {SPOTS,GUIDA,INTRO}=ctx.o, out={};
for(const s of SPOTS){
  out[s.id+'-story']=s.story.join(' ');
  out[s.id+'-word']='Parola nuova: '+s.word.join('. ');
  out[s.id+'-facts']=s.facts.join(' ');
  out[s.id+'-quiz']=s.quiz.q+' '+s.quiz.options.map((o,i)=>'Risposta '+'ABC'[i]+': '+o).join('. ');
}
out['guida-home']=GUIDA.home; out['guida-stop']=GUIDA.stop; out['intro']=INTRO;
// pronuncia: sostituzioni per il sintetizzatore
const fix=t=>t.replace(/Isolato IV/g,'Isolato quarto').replace(/«\?»/g,'il punto interrogativo').replace(/[«»]/g,'').replace(/\ba\.C\./g,'avanti Cristo').replace(/\bIV\b/g,'quarto');
for(const k in out)out[k]=fix(out[k]);
console.log(JSON.stringify(out,null,1));
