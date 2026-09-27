'use client';
import { useMemo, useState } from 'react';
import { ArrowLeft, Check, ChevronRight, Home as HomeIcon, RotateCcw, Star, Trophy, Volume2, X } from 'lucide-react';

const subjects = {
  Maths: { icon:'🔢', tone:'yellow', desc:'Numbers, counting and problem solving', modules:[
    ['Addition','➕','Add numbers together'],['Subtraction','➖','Take numbers away'],['Tables','✖️','Practice multiplication facts'],['Missing Numbers','❓','Find the number that is missing']
  ]},
  English: { icon:'🔤', tone:'blue', desc:'Words, spelling and sentences', modules:[
    ['2 Letter Words','AB','Read and recognise tiny words'],['3 Letter Words','CAT','Build your first word set'],['4 Letter Words','BOOK','Grow your vocabulary'],['Missing Letters','_A_','Complete the word'],['Jumbled Sentences','☷','Put words in the right order']
  ]},
  EVS: { icon:'🌱', tone:'green', desc:'Explore the world around you', modules:[
    ['Animals','🐾','Homes, food and sounds'],['Plants','🌿','Parts of plants and what they need'],['My Body','🧒','Body parts and five senses'],['Food','🍎','Healthy and unhealthy choices'],['Transport','🚗','Land, water and air'],['Weather','☀️','Seasons and weather']
  ]}
};

const wordSets = {
  '2 Letter Words': [['🅰️','AM','AM'],['🅰️','AN','AN'],['📍','IN','IN'],['❤️','IS','IS'],['⬆️','UP','UP'],['🟠','ON','ON'],['🐜','AT','AT'],['👋','HI','HI']],
  '3 Letter Words': [['🐱','CAT','CAT'],['🐶','DOG','DOG'],['☀️','SUN','SUN'],['🖊️','PEN','PEN'],['🛏️','BED','BED'],['🥤','CUP','CUP'],['🚗','CAR','CAR'],['🐟','FISH','FISH']],
  '4 Letter Words': [['📖','BOOK','BOOK'],['🐟','FISH','FISH'],['🌳','TREE','TREE'],['🥛','MILK','MILK'],['🦆','DUCK','DUCK'],['🐸','FROG','FROG'],['🏠','HOME','HOME'],['🌙','MOON','MOON']]
};
const missing = [['🐱','C _ T','A','CAT'],['🐶','D _ G','O','DOG'],['☀️','S _ N','U','SUN'],['🥛','M _ LK','I','MILK'],['🐟','F _ SH','I','FISH'],['🌳','T _ EE','R','TREE']];
const sentenceBank = [
  ['🐶',['This','is','a','dog.'],'This is a dog.'],['☀️',['The','sun','is','shining.'],'The sun is shining.'],['👧',['Riya','goes','to','school.'],'Riya goes to school.'],['🐱',['The','cat','is','sleeping.'],'The cat is sleeping.']
];
const evs = {
  Animals:[['🐄','Which animal gives us milk?',['Cow','Lion','Tiger'],'Cow'],['🐶','Which animal says “woof”?',['Cat','Dog','Cow'],'Dog'],['🐟','Where does a fish live?',['Water','Tree','Sky'],'Water'],['🦁','Which is a wild animal?',['Lion','Cow','Goat'],'Lion']],
  Plants:[['🌱','What does a plant need to grow?',['Water','Shoes','Toys'],'Water'],['🌳','Which part is usually under the soil?',['Root','Flower','Leaf'],'Root'],['🌻','Which is a flower?',['Sunflower','Carrot','Potato'],'Sunflower'],['🍃','Which part is green and catches sunlight?',['Leaf','Root','Seed'],'Leaf']],
  'My Body':[['👀','Which body part helps us see?',['Eyes','Ears','Nose'],'Eyes'],['👂','Which body part helps us hear?',['Hands','Ears','Feet'],'Ears'],['👃','Which body part helps us smell?',['Nose','Eyes','Teeth'],'Nose'],['🖐️','How many fingers are on one hand?',['Four','Five','Ten'],'Five']],
  Food:[['🍎','Which is a fruit?',['Apple','Rice','Bread'],'Apple'],['🥕','Which is a vegetable?',['Carrot','Cake','Candy'],'Carrot'],['💧','Which drink is best for staying hydrated?',['Water','Soda','Candy'],'Water'],['🥦','Which is a healthy choice?',['Broccoli','Chips','Lollipop'],'Broccoli']],
  Transport:[['✈️','Which travels in the air?',['Aeroplane','Bus','Boat'],'Aeroplane'],['🚤','Which travels on water?',['Boat','Train','Car'],'Boat'],['🚌','Which travels on roads?',['Bus','Rocket','Submarine'],'Bus'],['🚂','Which travels on tracks?',['Train','Bicycle','Boat'],'Train']],
  Weather:[['☀️','Which weather is hot and bright?',['Sunny','Snowy','Stormy'],'Sunny'],['🌧️','What falls from clouds on a rainy day?',['Rain','Sand','Leaves'],'Rain'],['❄️','Which season is usually cold?',['Winter','Summer','Spring'],'Winter'],['🌈','What can appear after rain and sunlight?',['Rainbow','Volcano','Snowman'],'Rainbow']]
};

function makeMath(module){
  const base = Array.from({length:10},(_,i)=>i);
  if(module==='Addition') return base.map(i=> i<5 ? {a:[2,7,4,8,3][i],b:[3,1,5,6,4][i]} : {a:[6,9,1,5,7][i-5],b:[2,5,8,7,3][i-5]}).map((q,i)=>({...q,answer:q.a+q.b,id:i}));
  if(module==='Subtraction') return base.map(i=>{const a=[8,9,7,10,12,15,13,18,16,14][i],b=[3,4,2,6,5,7,4,9,8,6][i];return {a,b,answer:a-b,id:i}});
  if(module==='Tables') return base.map(i=>{const a=(i%5)+2,b=i%10+1;return {a,b,answer:a*b,id:i}});
  return base.map(i=>{const answer=[5,8,10,7,12,9,15,11,14,6][i], add=[2,3,4,1,5,4,6,3,7,2][i];return {a:answer-add,b:add,answer,id:i}});
}

function Header({onBack, onHome, title}){ return <header className="top"><button className="iconBtn" onClick={onBack}><ArrowLeft size={20}/><span>Back</span></button><div className="brand">✨ BrightSteps</div><div className="topRight">🔥 4 day streak <button className="homeBtn" onClick={onHome} title="Home"><HomeIcon size={17}/></button></div></header> }
function Shell({children,onBack,onHome,title}){ return <main><Header onBack={onBack} onHome={onHome} title={title}/>{children}</main> }

export default function App(){
 const [screen,setScreen]=useState('home'), [subject,setSubject]=useState(null), [module,setModule]=useState(null), [answers,setAnswers]=useState({}), [score,setScore]=useState(null), [completed,setCompleted]=useState(12), [stars,setStars]=useState(38);
 const questions=useMemo(()=>makeMath(module),[module]);
 const openSubject=s=>{setSubject(s);setScreen('subject')};
 const start=(s,m)=>{setSubject(s);setModule(m);setAnswers({});setScore(null);setScreen('activity')};
 const home=()=>{setScreen('home');setSubject(null);setModule(null);setAnswers({});setScore(null)};
 const back=()=> screen==='activity'?setScreen('subject'):screen==='subject'?setScreen('home'):screen==='result'?setScreen('activity'):home();
 const finish=(n,total)=>{setScore(n);setCompleted(v=>v+1);setStars(v=>v+Math.max(1,Math.round(n/2)));setScreen('result')};
 return screen==='home'?<Home onSubject={openSubject} completed={completed} stars={stars}/>:screen==='subject'?<Subject subject={subject} onBack={back} onHome={home} onStart={start}/>:screen==='result'?<Result score={score} total={module==='Jumbled Sentences'?4:(module==='Missing Letters'||module==='2 Letter Words'||module==='3 Letter Words'||module==='4 Letter Words'||subject==='EVS'?6:10)} module={module} onRetry={()=>{setAnswers({});setScore(null);setScreen('activity')}} onHome={home}/>:<Activity subject={subject} module={module} questions={questions} answers={answers} setAnswers={setAnswers} onBack={back} onHome={home} finish={finish}/>;
}

function Home({onSubject,completed,stars}){return <Shell onBack={()=>{}} onHome={()=>{}}><section className="hero"><div><div className="eyebrow">TODAY'S LEARNING</div><h1>Hi, little learner! 👋</h1><p>Pick a subject and let's discover something new.</p></div><div className="mascot">🦉</div></section><section className="daily"><div><span className="pill">⭐ DAILY CHALLENGE</span><h2>10 questions. One happy brain.</h2><p>A little practice every day makes a big difference.</p></div><button onClick={()=>onSubject('Maths')}>Start <ChevronRight size={18}/></button></section><h2 className="sectionTitle">Choose a subject</h2><div className="subjectGrid">{Object.entries(subjects).map(([name,s])=><button className={'subject '+s.tone} key={name} onClick={()=>onSubject(name)}><div className="bigIcon">{s.icon}</div><div><h3>{name}</h3><p>{s.desc}</p></div><ChevronRight className="arrow"/></button>)}</div><div className="bottomCards"><div className="progressCard"><div className="miniIcon">🏆</div><div><b>My Progress</b><p>{completed} lessons completed</p></div><ChevronRight size={18}/></div><div className="progressCard"><div className="miniIcon">⭐</div><div><b>My Stars</b><p>{stars} stars earned</p></div><ChevronRight size={18}/></div></div></Shell>}

function Subject({subject,onBack,onHome,onStart}){const s=subjects[subject];return <Shell onBack={onBack} onHome={onHome}><div className="pageIntro"><div className="subjectBadge">{s.icon}</div><div><div className="eyebrow">SUBJECT</div><h1>{subject}</h1><p>{s.desc}</p></div></div><div className="moduleGrid">{s.modules.map(([name,icon,desc],i)=><button className={'module '+s.tone} key={name} onClick={()=>onStart(subject,name)}><div className="moduleIcon">{icon}</div><div className="moduleText"><h3>{name}</h3><p>{desc}</p></div><div className="moduleMeta">{subject==='EVS'?'Quiz':i===0?'Start':'Practice'} <ChevronRight size={16}/></div></button>)}</div></Shell>}

function Activity({subject,module,questions,answers,setAnswers,onBack,onHome,finish}){
 const isMath=subject==='Maths', isWords=['2 Letter Words','3 Letter Words','4 Letter Words'].includes(module), isMissing=module==='Missing Letters', isSentence=module==='Jumbled Sentences', isEVS=subject==='EVS';
 const data=isWords?wordSets[module]:isMissing?missing:isSentence?sentenceBank:isEVS?evs[module]:questions;
 const total=isMath?10:(data?.length||0);
 const submit=()=>{let score=0;if(isMath) score=questions.reduce((n,q)=>n+(Number(answers[q.id])===q.answer?1:0),0);else if(isWords) score=data.reduce((n,w)=>n+(answers[w[1]]===w[2]?1:0),0);else if(isMissing) score=data.reduce((n,w)=>n+(answers[w[1]]===w[2]?1:0),0);else if(isSentence) score=data.reduce((n,s)=>n+(answers[s[0]]===s[2]?1:0),0);else score=data.reduce((n,q)=>n+(answers[q[1]]===q[3]?1:0),0);finish(score,total)};
 return <Shell onBack={onBack} onHome={onHome}><div className="activityHead"><div><span className="pill">{subject.toUpperCase()}</span><h1>{module}</h1><p>{isMath?'Solve all 10 puzzles, then submit your answers.':isMissing?'Look at each picture and choose the missing letter.':isSentence?'Tap the words in the correct order to make a sentence.':isWords?'Look, read and choose the word that matches.':'Look at each picture and choose the best answer.'}</p></div><div className="questionCount">{total}<small> questions</small></div></div>
 {isMath?<MathActivity questions={questions} answers={answers} setAnswers={setAnswers} module={module}/>:isWords?<WordActivity data={data} answers={answers} setAnswers={setAnswers}/>:isMissing?<MissingActivity data={data} answers={answers} setAnswers={setAnswers}/>:isSentence?<SentenceActivity data={data} answers={answers} setAnswers={setAnswers}/>:<EvsActivity data={data} answers={answers} setAnswers={setAnswers}/>}<div className="submitBar"><div><Star size={20}/><span>Take your time — check your answers before submitting.</span></div><button className="submit" onClick={submit}>Submit answers <Check size={19}/></button></div></Shell>
}
function MathActivity({questions,answers,setAnswers,module}){return <div className="mathList">{questions.map((q,i)=><div className="mathQ" key={q.id}><span className="num">{i+1}</span><div className="sum"><div>{q.a}</div><div>{module==='Subtraction'?'−':module==='Tables'?'×':'+'} {q.b}</div><div className="line">?</div></div><input inputMode="numeric" aria-label={'answer '+(i+1)} value={answers[q.id]??''} onChange={e=>setAnswers({...answers,[q.id]:e.target.value})}/></div>)}</div>}
function WordActivity({data,answers,setAnswers}){return <div className="wordGrid">{data.map(([pic,word,answer])=>{const opts=[answer, ...word.split('').filter(Boolean).slice(0,1), 'NO'].filter((x,i,a)=>x&&a.indexOf(x)===i).slice(0,3);return <div className="wordCard" key={word}><div className="picture">{pic}</div><div className="wordPrompt">What is it?</div><div className="wordOptions">{opts.map(o=><button className={answers[word]===o?'selected':''} key={o} onClick={()=>setAnswers({...answers,[word]:o})}>{o}</button>)}</div></div>})}</div>}
function MissingActivity({data,answers,setAnswers}){return <div className="wordGrid">{data.map(([pic,pattern,answer,word])=>{const wrong=answer==='A'?'E':answer==='O'?'U':answer==='U'?'I':answer==='I'?'A':answer==='R'?'T':'E';return <div className="wordCard" key={word}><div className="picture">{pic}</div><b className="pattern">{pattern}</b><div className="wordPrompt">Choose the missing letter</div><div className="wordOptions">{[answer,wrong,'O'].filter((x,i,a)=>a.indexOf(x)===i).map(o=><button className={answers[pattern]===o?'selected':''} key={o} onClick={()=>setAnswers({...answers,[pattern]:o})}>{o}</button>)}</div></div>})}</div>}
function SentenceActivity({data,answers,setAnswers}){const toggle=(id,w)=>{const cur=answers[id]?answers[id].split(' ').filter(Boolean):[];const next=cur.includes(w)?cur.filter(x=>x!==w):[...cur,w];setAnswers({...answers,[id]:next.join(' ')})};return <div className="sentenceList">{data.map(([pic,words])=><div className="sentenceCard" key={pic}><div className="picture">{pic}</div><p>Tap each word in the sentence order:</p><div className="sentenceOptions">{words.map(w=><button className={answers[pic]?.split(' ').includes(w)?'selected':''} key={w} onClick={()=>toggle(pic,w)}>{w}</button>)}</div><div className="answerPreview">{answers[pic]||'Your sentence appears here'}</div><button className="clear" onClick={()=>setAnswers({...answers,[pic]:''})}>Clear</button></div>)}</div>}
function EvsActivity({data,answers,setAnswers}){return <div className="evsGrid">{data.map(([pic,q,opts,answer])=><div className="evsCard" key={q}><div className="picture">{pic}</div><h3>{q}</h3><div className="choiceList">{opts.map(o=><button className={answers[q]===o?'selected':''} key={o} onClick={()=>setAnswers({...answers,[q]:o})}>{o}</button>)}</div></div>)}</div>}
function Result({score,total,module,onRetry,onHome}){const pct=Math.round(score/total*100);return <main className="resultPage"><div className="resultEmoji">{pct===100?'🏆':pct>=70?'🌟':'💪'}</div><div className="eyebrow">{module.toUpperCase()}</div><h1>{pct===100?'Perfect score!':pct>=70?'Great work!':'Keep practicing!'}</h1><div className="scoreCircle"><strong>{score}</strong><span>/ {total}</span></div><p className="resultText">You got <b>{score}</b> correct. Every question you try makes your brain stronger.</p><div className="resultActions"><button className="secondary" onClick={onRetry}><RotateCcw size={18}/> Try again</button><button className="submit" onClick={onHome}>Back to home <ChevronRight size={18}/></button></div></main>}
