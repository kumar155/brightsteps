'use client';
import { useMemo, useState } from 'react';
import { ArrowLeft, Check, ChevronRight, Home as HomeIcon, RotateCcw, Shuffle, Star } from 'lucide-react';

const subjects = {
  Maths:{icon:'🔢',tone:'yellow',desc:'Numbers, patterns and problem solving',modules:[
    ['Addition','➕','Add numbers together'],['Subtraction','➖','Take numbers away'],['Tables','✖️','Tables 1 to 10 — fill the result'],['Missing Numbers','❓','Find the missing number in a sequence'],['Shape Patterns','🔷','Find the missing shape in a pattern'],['Ascending Order','⬆️','Arrange numbers from smallest to biggest'],['Descending Order','⬇️','Arrange numbers from biggest to smallest'],['Symbols','⚖️','Choose >, < or =']
  ]},
  English:{icon:'🔤',tone:'blue',desc:'Words, spelling and sentences',modules:[
    ['2 Letter Words','AB','Read and recognise tiny words'],['3 Letter Words','CAT','Build your first word set'],['4 Letter Words','BOOK','Grow your vocabulary'],['Missing Letters','_A_','Complete the word'],['Jumbled Sentences','☷','Put words in the right order']
  ]},
  EVS:{icon:'🌱',tone:'green',desc:'Explore the world around you',modules:[
    ['Animals','🐾','Homes, food and sounds'],['Plants','🌿','Parts of plants and what they need'],['My Body','🧒','Body parts and five senses'],['Food','🍎','Healthy and unhealthy choices'],['Transport','🚗','Land, water and air'],['Weather','☀️','Seasons and weather']
  ]},
  Telugu:{icon:'తెలుగు',tone:'purple',desc:'తెలుగు అక్షరాలు, పదాలు మరియు వాక్యాలు నేర్చుకోండి',modules:[
    ['అచ్చులు','అ','అచ్చులను గుర్తించండి'],['హల్లులు','క','హల్లులను గుర్తించండి'],['గుణింతాలు','కా','గుణింతాల అభ్యాసం'],['పదాలు','పదం','చిత్రాన్ని చూసి పదాన్ని ఎంచుకోండి'],['Missing Telugu Letters','_','తెలుగు అక్షరానికి సరైన ఎంపికను ఎంచుకోండి'],['వాక్యాలు','వాక్యం','పదాలను సరైన క్రమంలో అమర్చండి']
  ]},
  Hindi:{icon:'हिं',tone:'red',desc:'हिंदी अक्षर, शब्द और वाक्य सीखें',modules:[
    ['स्वर','अ','स्वरों को पहचानें'],['व्यंजन','क','व्यंजनों को पहचानें'],['Missing Varnamala','अ_इ','क्रम में अगला अक्षर चुनें'],['Missing Vyanjan','क_ग','क्रम में छूटा व्यंजन चुनें'],['2 अक्षर शब्द','घर','छोटे हिंदी शब्द पढ़ें'],['3 अक्षर शब्द','कमल','शब्द पढ़ें और पहचानें'],['खाली अक्षर','_','शब्द में सही अक्षर भरें'],['वाक्य क्रम','☷','शब्दों को सही क्रम में लगाएँ']
  ]}
};

const englishWords={
 '2 Letter Words':[['🅰️','AM'],['🅰️','AN'],['📍','IN'],['❤️','IS'],['⬆️','UP'],['🟠','ON'],['🐜','AT'],['👋','HI']],
 '3 Letter Words':[['🐱','CAT'],['🐶','DOG'],['☀️','SUN'],['🖊️','PEN'],['🛏️','BED'],['🥤','CUP'],['🚗','CAR'],['🐟','FISH']],
 '4 Letter Words':[['📖','BOOK'],['🐟','FISH'],['🌳','TREE'],['🥛','MILK'],['🦆','DUCK'],['🐸','FROG'],['🏠','HOME'],['🌙','MOON']]
};
const englishMissing=[['🐱','C _ T','A'],['🐶','D _ G','O'],['☀️','S _ N','U'],['🥛','M _ LK','I'],['🐟','F _ SH','I'],['🌳','T _ EE','R'],['🚗','C _ R','A'],['🖊️','P _ N','E']];
const englishSentences=[['🐶',['This','is','a','dog.'],'This is a dog.'],['☀️',['The','sun','is','shining.'],'The sun is shining.'],['👧',['Riya','goes','to','school.'],'Riya goes to school.'],['🐱',['The','cat','is','sleeping.'],'The cat is sleeping.']];

const teluguVowels=['అ','ఆ','ఇ','ఈ','ఉ','ఊ','ఎ','ఏ','ఐ','ఒ','ఓ','ఔ'];
const teluguConsonants=['క','ఖ','గ','ఘ','చ','ఛ','జ','ఝ','ట','ఠ','డ','ఢ','త','థ','ద','ధ','న','ప','ఫ','బ','భ','మ','య','ర','ల','వ','శ','ష','స','హ'];
const teluguWords=[['🐘','ఏనుగు'],['🐱','పిల్లి'],['🌸','పువ్వు'],['🏠','ఇల్లు'],['🌳','చెట్టు'],['🐟','చేప']];
const teluguMissing=[['🐘','ఏ _ గు','న'],['🏠','ఇ _ ్లు','ల'],['🌳','చె _ ు','ట్'],['🐟','చే _','ప'],['🌸','పువ్ _','వు']];
const teluguSentences=[['👦',['రాము','బడి','వెళ్తాడు'],'రాము బడి వెళ్తాడు'],['🐄',['ఆవు','పాలు','ఇస్తుంది'],'ఆవు పాలు ఇస్తుంది'],['☀️',['సూర్యుడు','ప్రకాశిస్తాడు'],'సూర్యుడు ప్రకాశిస్తాడు']];
const hindiVowels=['अ','आ','इ','ई','उ','ऊ','ए','ऐ','ओ','औ','अं','अः'];
const hindiConsonants=['क','ख','ग','घ','ङ','च','छ','ज','झ','ञ','ट','ठ','ड','ढ','ण','त','थ','द','ध','न','प','फ','ब','भ','म','य','र','ल','व','श','ष','स','ह'];
const hindiWords2=[['🏠','घर'],['💧','जल'],['🍎','फल'],['🌳','वन'],['🚰','नल'],['🚌','बस']];
const hindiWords3=[['🌸','कमल'],['🐊','मगर'],['🏙️','नगर'],['✏️','कलम'],['☁️','गगन'],['👦','नमन']];
const hindiMissing=[['🏠','घ _','र'],['🍎','फ _','ल'],['🌳','व _','न'],['✏️','क _ म','ल']];
const hindiSentences=[['👦',['राम','स्कूल','जाता','है'],'राम स्कूल जाता है'],['🐄',['गाय','दूध','देती','है'],'गाय दूध देती है'],['☀️',['सूरज','चमक','रहा','है'],'सूरज चमक रहा है']];

const evs={Animals:[['🐄','Which animal gives us milk?',['Cow','Lion','Tiger'],'Cow'],['🐶','Which animal says “woof”?',['Cat','Dog','Cow'],'Dog'],['🐟','Where does a fish live?',['Water','Tree','Sky'],'Water'],['🦁','Which is a wild animal?',['Lion','Cow','Goat'],'Lion']],Plants:[['🌱','What does a plant need to grow?',['Water','Shoes','Toys'],'Water'],['🌳','Which part is usually under the soil?',['Root','Flower','Leaf'],'Root'],['🌻','Which is a flower?',['Sunflower','Carrot','Potato'],'Sunflower'],['🍃','Which part is green and catches sunlight?',['Leaf','Root','Seed'],'Leaf']], 'My Body':[['👀','Which body part helps us see?',['Eyes','Ears','Nose'],'Eyes'],['👂','Which body part helps us hear?',['Hands','Ears','Feet'],'Ears'],['👃','Which body part helps us smell?',['Nose','Eyes','Teeth'],'Nose'],['🖐️','How many fingers are on one hand?',['Four','Five','Ten'],'Five']],Food:[['🍎','Which is a fruit?',['Apple','Rice','Bread'],'Apple'],['🥕','Which is a vegetable?',['Carrot','Cake','Candy'],'Carrot'],['💧','Which drink is best for staying hydrated?',['Water','Soda','Candy'],'Water'],['🥦','Which is a healthy choice?',['Broccoli','Chips','Lollipop'],'Broccoli']],Transport:[['✈️','Which travels in the air?',['Aeroplane','Bus','Boat'],'Aeroplane'],['🚤','Which travels on water?',['Boat','Train','Car'],'Boat'],['🚌','Which travels on roads?',['Bus','Rocket','Submarine'],'Bus'],['🚂','Which travels on tracks?',['Train','Bicycle','Boat'],'Train']],Weather:[['☀️','Which weather is hot and bright?',['Sunny','Snowy','Stormy'],'Sunny'],['🌧️','What falls from clouds on a rainy day?',['Rain','Sand','Leaves'],'Rain'],['❄️','Which season is usually cold?',['Winter','Summer','Spring'],'Winter'],['🌈','What can appear after rain and sunlight?',['Rainbow','Volcano','Snowman'],'Rainbow']]};

const pick=(a)=>a[Math.floor(Math.random()*a.length)];
const shuffle=(a)=>[...a].sort(()=>Math.random()-.5);
function makeMath(module){
 if(module==='Addition') return Array.from({length:10},(_,i)=>{const a=1+Math.floor(Math.random()*9),b=1+Math.floor(Math.random()*9);return {id:i,a,b,answer:a+b}});
 if(module==='Subtraction') return Array.from({length:10},(_,i)=>{const a=5+Math.floor(Math.random()*16),b=1+Math.floor(Math.random()*a);return {id:i,a,b,answer:a-b}});
 if(module==='Tables') return Array.from({length:10},(_,i)=>{const a=1+Math.floor(Math.random()*10),b=1+Math.floor(Math.random()*10);return {id:i,a,b,answer:a*b}});
 if(module==='Missing Numbers') return Array.from({length:10},(_,i)=>{const start=1+Math.floor(Math.random()*10),step=1+Math.floor(Math.random()*5),missingIndex=1+Math.floor(Math.random()*3),seq=Array.from({length:5},(_,j)=>start+j*step);const answer=seq[missingIndex];seq[missingIndex]='?';return {id:i,seq,answer}});
 if(module==='Ascending Order'||module==='Descending Order') return Array.from({length:10},(_,i)=>{const nums=shuffle(Array.from({length:4},()=>1+Math.floor(Math.random()*50)));const sorted=[...nums].sort((a,b)=>a-b);return {id:i,nums,answer:(module==='Ascending Order'?sorted:sorted.reverse()).join(',')}});
 if(module==='Symbols') return Array.from({length:10},(_,i)=>{const a=1+Math.floor(Math.random()*20),b=1+Math.floor(Math.random()*20),answer=a>b?'>':a<b?'<':'=';return {id:i,a,b,answer}});
 if(module==='Shape Patterns') {const shapes=['●','■','▲','◆','★'];return Array.from({length:10},(_,i)=>{const s=pick(shapes),t=pick(shapes.filter(x=>x!==s));const pattern=[s,t,s,t,'?'];return {id:i,pattern,answer:s}})}
 return [];
}
function Header({onBack,onHome}){return <header className="top"><button className="iconBtn" onClick={onBack}><ArrowLeft size={20}/><span>Back</span></button><div className="brand">✨ BrightSteps</div><div className="topRight">🔥 4 day streak <button className="homeBtn" onClick={onHome}><HomeIcon size={17}/></button></div></header>}
function Shell({children,onBack,onHome}){return <main><Header onBack={onBack} onHome={onHome}/>{children}</main>}

export default function App(){
 const [screen,setScreen]=useState('home'),[subject,setSubject]=useState(null),[module,setModule]=useState(null),[answers,setAnswers]=useState({}),[score,setScore]=useState(null),[setNo,setSetNo]=useState(0),[completed,setCompleted]=useState(12),[stars,setStars]=useState(38);
 const questions=useMemo(()=>makeMath(module),[module,setNo]);
 const openSubject=s=>{setSubject(s);setScreen('subject')};
 const start=(s,m)=>{setSubject(s);setModule(m);setAnswers({});setScore(null);setSetNo(n=>n+1);setScreen('activity')};
 const generate=()=>{setAnswers({});setScore(null);setSetNo(n=>n+1)};
 const home=()=>{setScreen('home');setSubject(null);setModule(null);setAnswers({});setScore(null)};
 const back=()=>screen==='activity'?setScreen('subject'):screen==='subject'?setScreen('home'):home();
 const finish=(n,total)=>{setScore({value:n,total});setCompleted(v=>v+1);setStars(v=>v+Math.max(1,Math.round(n/2)));setScreen('result')};
 if(screen==='home') return <Home onSubject={openSubject} completed={completed} stars={stars}/>;
 if(screen==='subject') return <Subject subject={subject} onBack={back} onHome={home} onStart={start}/>;
 if(screen==='result') return <Result score={score?.value||0} total={score?.total||10} module={module} onRetry={()=>{setAnswers({});setScore(null);setScreen('activity')}} onGenerate={()=>{generate();setScreen('activity')}} onHome={home}/>;
 return <Activity key={setNo} subject={subject} module={module} questions={questions} setNo={setNo} answers={answers} setAnswers={setAnswers} onBack={back} onHome={home} finish={finish} onGenerate={generate}/>;
}

function Home({onSubject,completed,stars}){return <Shell onBack={()=>{}} onHome={()=>{}}><section className="hero"><div><div className="eyebrow">TODAY'S LEARNING</div><h1>Hi, little learner! 👋</h1><p>Pick a subject and let's discover something new.</p></div><div className="mascot">🦉</div></section><section className="daily"><div><span className="pill">⭐ DAILY CHALLENGE</span><h2>Practice a little every day.</h2><p>New questions can be generated whenever you are ready.</p></div><button onClick={()=>onSubject('Maths')}>Start <ChevronRight size={18}/></button></section><h2 className="sectionTitle">Choose a subject</h2><div className="subjectGrid">{Object.entries(subjects).map(([name,s])=><button className={'subject '+s.tone} key={name} onClick={()=>onSubject(name)}><div className="bigIcon">{s.icon}</div><div><h3>{name}</h3><p>{s.desc}</p></div><ChevronRight className="arrow"/></button>)}</div><div className="bottomCards"><div className="progressCard"><div className="miniIcon">🏆</div><div><b>My Progress</b><p>{completed} lessons completed</p></div></div><div className="progressCard"><div className="miniIcon">⭐</div><div><b>My Stars</b><p>{stars} stars earned</p></div></div></div></Shell>}
function Subject({subject,onBack,onHome,onStart}){const s=subjects[subject];return <Shell onBack={onBack} onHome={onHome}><div className="pageIntro"><div className="subjectBadge">{s.icon}</div><div><div className="eyebrow">SUBJECT</div><h1>{subject}</h1><p>{s.desc}</p></div></div><div className="moduleGrid">{s.modules.map(([name,icon,desc],i)=><button className={'module '+s.tone} key={name} onClick={()=>onStart(subject,name)}><div className="moduleIcon">{icon}</div><div className="moduleText"><h3>{name}</h3><p>{desc}</p></div><div className="moduleMeta">Practice <ChevronRight size={16}/></div></button>)}</div></Shell>}


function makeActivityData(subject,module,setNo){
  if(subject==='Maths') return [];
  if(['2 Letter Words','3 Letter Words','4 Letter Words'].includes(module)){
    const bank=englishWords[module]; return shuffle([...bank]).slice(0,10);
  }
  if(module==='Missing Letters'){
    const bank=[...englishMissing,['🐝','B _ E','E'],['🐔','H _ N','E']];
    return shuffle(bank).slice(0,10);
  }
  if(module==='Jumbled Sentences') return shuffle(englishSentences).slice(0,4);
  if(module==='Animals'||module==='Plants'||module==='My Body'||module==='Food'||module==='Transport'||module==='Weather') return shuffle(evs[module]).slice(0,4);
  if(module==='పదాలు') return shuffle(teluguWords).slice(0,6);
  if(module==='Missing Telugu Letters') return shuffle(teluguMissing).slice(0,5);
  if(module==='వాక్యాలు') return shuffle(teluguSentences).slice(0,3);
  if(module==='అచ్చులు'||module==='హల్లులు') return shuffle(module==='అచ్చులు'?teluguVowels:teluguConsonants).slice(0,10);
  if(module==='गुणिंतాలు') return [];
  if(module==='स्वर'||module==='व्यंजन') return shuffle(module==='स्वर'?hindiVowels:hindiConsonants).slice(0,10);
  if(module==='Missing Varnamala'||module==='Missing Vyanjan') return makeHindiSequence(module);
  if(module==='2 अक्षर शब्द') return shuffle(hindiWords2).slice(0,6);
  if(module==='3 अक्षर शब्द') return shuffle(hindiWords3).slice(0,6);
  if(module==='खाली अक्षर') return shuffle(hindiMissing).slice(0,4);
  if(module==='वाक्य क्रम') return shuffle(hindiSentences).slice(0,3);
  return [];
}

function Activity({subject,module,questions,setNo,answers,setAnswers,onBack,onHome,finish,onGenerate}){
 const isMath=['Addition','Subtraction','Tables'].includes(module), isWords=['2 Letter Words','3 Letter Words','4 Letter Words','పదాలు','2 अक्षर शब्द','3 अक्षर शब्द'].includes(module), isMissing=['Missing Letters','Missing Telugu Letters','खाली अक्षर'].includes(module), isSentence=['Jumbled Sentences','వాక్యాలు','वाक्य क्रम'].includes(module), isEVS=subject==='EVS', isTelugu=subject==='Telugu', isHindi=subject==='Hindi', isOrder=['Ascending Order','Descending Order'].includes(module), isSequence=module==='Missing Numbers', isShape=module==='Shape Patterns', isSymbols=module==='Symbols', isHindiSeq=['Missing Varnamala','Missing Vyanjan'].includes(module), isAlphabet=(isTelugu&&['అచ్చులు','హల్లులు','గుణింతాలు'].includes(module))||(isHindi&&['स्वर','व्यंजन'].includes(module));
 const data=useMemo(()=>makeActivityData(subject,module,setNo),[subject,module,setNo]);
 const total=isMath||isOrder||isSequence||isShape||isSymbols||isHindiSeq?10:(data?.length||0);
 const submit=()=>{let n=0;if(isMath||isSequence||isOrder||isShape||isSymbols) n=questions.reduce((x,q)=>x+(String(answers[q.id]??'').trim()===String(q.answer)?1:0),0);else if(isWords)n=data.reduce((x,w)=>x+(answers[w[1]]===w[1]?1:0),0);else if(isMissing)n=data.reduce((x,w)=>x+(answers[w[1]]===w[2]?1:0),0);else if(isSentence)n=data.reduce((x,w)=>x+(answers[w[0]]===w[2]?1:0),0);else if(isAlphabet)n=data.reduce((x,w)=>x+(answers[w]===w?1:0),0);else if(isHindiSeq)n=data.reduce((x,w)=>x+(answers[w.id]===w.answer?1:0),0);else n=data.reduce((x,q)=>x+(answers[q[1]]===q[3]?1:0),0);finish(n,total);};
 return <Shell onBack={onBack} onHome={onHome}><div className="activityHead"><div><span className="pill">{subject.toUpperCase()}</span><h1>{module}</h1><p>{isMath?'Fill all 10 results.':isSequence?'Find the missing number in each sequence.':isOrder?'Arrange the numbers in the requested order.':isShape?'Look at the pattern and choose the missing shape.':isSymbols?'Choose the correct greater than, less than or equals symbol.':isHindiSeq?'Choose the missing letter in the Hindi sequence.':isMissing?'Choose the missing letter.':isSentence?'Tap words in the correct sentence order.':isWords?'Look, read and choose the word that matches.':isAlphabet?'Choose the matching letter.':'Look at each picture and choose the best answer.'}</p></div><button className="generateBtn" onClick={onGenerate}><Shuffle size={17}/> Generate new set</button><div className="questionCount">{total}<small> questions</small></div></div>
 {isMath?<MathActivity questions={questions} answers={answers} setAnswers={setAnswers} module={module}/>:isSequence?<SequenceActivity questions={questions} answers={answers} setAnswers={setAnswers}/>:isOrder?<OrderActivity questions={questions} answers={answers} setAnswers={setAnswers} module={module}/>:isShape?<ShapeActivity questions={questions} answers={answers} setAnswers={setAnswers}/>:isSymbols?<SymbolActivity questions={questions} answers={answers} setAnswers={setAnswers}/>:isHindiSeq?<HindiSequenceActivity data={data} answers={answers} setAnswers={setAnswers}/>:isWords?<WordActivity data={data} answers={answers} setAnswers={setAnswers}/>:isAlphabet?<AlphabetActivity data={data} answers={answers} setAnswers={setAnswers}/>:isMissing?<MissingActivity data={data} answers={answers} setAnswers={setAnswers}/>:isSentence?<SentenceActivity data={data} answers={answers} setAnswers={setAnswers}/>:<EvsActivity data={data} answers={answers} setAnswers={setAnswers}/>}<div className="submitBar"><div><Star size={20}/><span>Check your answers before submitting.</span></div><button className="submit" onClick={submit}>Submit answers <Check size={19}/></button></div></Shell>
}

function MathActivity({questions,answers,setAnswers,module}){return <div className="mathList">{questions.map((q,i)=><div className="mathQ" key={q.id}><span className="num">{i+1}</span><div className="sum"><div>{q.a}</div><div>{module==='Subtraction'?'−':module==='Tables'?'×':'+'} {q.b}</div><div className="line">?</div></div><input inputMode="numeric" aria-label={'answer '+(i+1)} value={answers[q.id]??''} onChange={e=>setAnswers({...answers,[q.id]:e.target.value})}/></div>)}</div>}
function SequenceActivity({questions,answers,setAnswers}){return <div className="mathList">{questions.map((q,i)=><div className="mathQ sequenceQ" key={q.id}><span className="num">{i+1}</span><div className="sequence">{q.seq.map((n,j)=><span key={j} className={n==='?'?'missingBox':''}>{n}</span>)}</div><input inputMode="numeric" value={answers[q.id]??''} onChange={e=>setAnswers({...answers,[q.id]:e.target.value})}/></div>)}</div>}
function OrderActivity({questions,answers,setAnswers,module}){return <div className="orderGrid">{questions.map((q,i)=><div className="orderCard" key={q.id}><b>{i+1}. {module==='Ascending Order'?'Small → Big':'Big → Small'}</b><div className="numberChips">{q.nums.map(n=><span key={n}>{n}</span>)}</div><input placeholder="e.g. 3, 7, 12, 20" value={answers[q.id]??''} onChange={e=>setAnswers({...answers,[q.id]:e.target.value.replace(/\s/g,'')})}/></div>)}</div>}
function ShapeActivity({questions,answers,setAnswers}){return <div className="patternGrid">{questions.map((q,i)=><div className="patternCard" key={q.id}><b>{i+1}. What comes next?</b><div className="shapeRow">{q.pattern.map((s,j)=><span key={j} className={s==='?'?'shapeMissing':''}>{s}</span>)}</div><div className="wordOptions">{[q.answer,...['●','■','▲','◆','★'].filter(x=>x!==q.answer).slice(0,2)].map(o=><button className={answers[q.id]===o?'selected':''} key={o} onClick={()=>setAnswers({...answers,[q.id]:o})}>{o}</button>)}</div></div>)}</div>}
function SymbolActivity({questions,answers,setAnswers}){return <div className="mathList">{questions.map((q,i)=><div className="symbolQ" key={q.id}><span className="num">{i+1}</span><strong>{q.a}</strong><div className="symbolOptions">{['>','<','='].map(o=><button className={answers[q.id]===o?'selected':''} key={o} onClick={()=>setAnswers({...answers,[q.id]:o})}>{o}</button>)}</div><strong>{q.b}</strong></div>)}</div>}
function AlphabetActivity({data,answers,setAnswers}){return <div className="wordGrid">{data.map(letter=><div className="wordCard" key={letter}><div className="picture alphabetPicture">{letter}</div><div className="wordPrompt">Choose the same letter</div><div className="wordOptions">{shuffle([letter,...data.filter(x=>x!==letter).slice(0,2)]).map(o=><button className={answers[letter]===o?'selected':''} key={o} onClick={()=>setAnswers({...answers,[letter]:o})}>{o}</button>)}</div></div>)}</div>}
function WordActivity({data,answers,setAnswers}){return <div className="wordGrid">{data.map(([pic,word])=>{const opts=shuffle([word,...data.filter(x=>x[1]!==word).slice(0,2).map(x=>x[1])]);return <div className="wordCard" key={word}><div className="picture">{pic}</div><div className="wordPrompt">What is it?</div><div className="wordOptions">{opts.map(o=><button className={answers[word]===o?'selected':''} key={o} onClick={()=>setAnswers({...answers,[word]:o})}>{o}</button>)}</div></div>})}</div>}
function MissingActivity({data,answers,setAnswers}){return <div className="wordGrid">{data.map(([pic,pattern,answer],idx)=>{const choices=shuffle([answer,...data.filter((_,i)=>i!==idx).slice(0,2).map(x=>x[2])]);return <div className="wordCard" key={pattern}><div className="picture">{pic}</div><b className="pattern">{pattern}</b><div className="wordPrompt">Choose the missing letter</div><div className="wordOptions">{choices.map(o=><button className={answers[pattern]===o?'selected':''} key={o} onClick={()=>setAnswers({...answers,[pattern]:o})}>{o}</button>)}</div></div>})}</div>}
function HindiSequenceActivity({data,answers,setAnswers}){return <div className="wordGrid">{data.map(q=><div className="wordCard" key={q.id}><div className="sequence">{q.seq.map((x,i)=><span key={i} className={x==='?'?'missingBox':''}>{x}</span>)}</div><div className="wordPrompt">अगला अक्षर चुनें</div><div className="wordOptions">{q.options.map(o=><button className={answers[q.id]===o?'selected':''} key={o} onClick={()=>setAnswers({...answers,[q.id]:o})}>{o}</button>)}</div></div>)}</div>}
function SentenceActivity({data,answers,setAnswers}){const toggle=(id,w)=>{const cur=answers[id]?answers[id].split('|').filter(Boolean):[];const next=cur.includes(w)?cur.filter(x=>x!==w):[...cur,w];setAnswers({...answers,[id]:next.join('|')})};return <div className="sentenceList">{data.map(([pic,words])=><div className="sentenceCard" key={pic}><div className="picture">{pic}</div><p>Tap words in order:</p><div className="sentenceOptions">{shuffle(words).map(w=><button className={answers[pic]?.split('|').includes(w)?'selected':''} key={w} onClick={()=>toggle(pic,w)}>{w}</button>)}</div><div className="answerPreview">{(answers[pic]||'').split('|').filter(Boolean).join(' ')||'Your sentence appears here'}</div><button className="clear" onClick={()=>setAnswers({...answers,[pic]:''})}>Clear</button></div>)}</div>}
function EvsActivity({data,answers,setAnswers}){return <div className="evsGrid">{data.map(([pic,q,opts,answer])=><div className="evsCard" key={q}><div className="picture">{pic}</div><h3>{q}</h3><div className="choiceList">{shuffle(opts).map(o=><button className={answers[q]===o?'selected':''} key={o} onClick={()=>setAnswers({...answers,[q]:o})}>{o}</button>)}</div></div>)}</div>}
function makeHindiSequence(module){const bank=module==='Missing Varnamala'?hindiVowels:hindiConsonants;return Array.from({length:10},(_,id)=>{const start=Math.floor(Math.random()*(bank.length-4));const seq=bank.slice(start,start+4);const missingAt=2;const answer=seq[missingAt];const shown=seq.map((x,i)=>i===missingAt?'_':x);return {id,seq:shown,answer,options:shuffle([answer,bank[(start+4)%bank.length],bank[(start+1)%bank.length]])}})}
function Result({score,total,module,onRetry,onGenerate,onHome}){const pct=Math.round(score/total*100);return <main className="resultPage"><div className="resultEmoji">{pct===100?'🏆':pct>=70?'🌟':'💪'}</div><div className="eyebrow">{module.toUpperCase()}</div><h1>{pct===100?'Perfect score!':pct>=70?'Great work!':'Keep practicing!'}</h1><div className="scoreCircle"><strong>{score}</strong><span>/ {total}</span></div><p className="resultText">You got <b>{score}</b> correct. Every question you try makes your brain stronger.</p><div className="resultActions"><button className="secondary" onClick={onRetry}><RotateCcw size={18}/> Try again</button><button className="secondary" onClick={onGenerate}><Shuffle size={18}/> New set</button><button className="submit" onClick={onHome}>Home <ChevronRight size={18}/></button></div></main>}
